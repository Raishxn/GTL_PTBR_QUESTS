from __future__ import annotations

import re
import shutil
from dataclasses import dataclass
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
TEXT_KEYS = {"title", "subtitle", "description", "lock_message"}


PACKS = [
    {
        "name": "GregTech-Leisure-3.7",
        "public": Path(r"C:\Users\erick\Downloads\gtl") / "GregTech Leisure-私货版 3.7" / "overrides/config/ftbquests",
        "private": Path.home() / "AppData/Roaming/PrismLauncher/instances/GregTech Leisure-私货版 3.7/minecraft/config/ftbquests",
        "fallbacks": [Path.home() / "AppData/Roaming/PrismLauncher/instances/GTL 7TH/minecraft/config/ftbquests"],
        "merge": True,
    },
    {
        "name": "GregTech-Leisure-1.4.5.0",
        "public": Path(r"C:\Users\erick\Downloads\gtl\GregTech-Leisure-1.4.5.0\.minecraft\config\ftbquests"),
        "private": Path.home() / "AppData/Roaming/PrismLauncher/instances/GregTech-Leisure-1.4.5.0/minecraft/config/ftbquests",
        "fallbacks": [Path.home() / "AppData/Roaming/PrismLauncher/instances/GTL 7TH/minecraft/config/ftbquests"],
        "merge": True,
    },
    {
        "name": "GTL-7TH",
        "public": Path.home() / "AppData/Roaming/PrismLauncher/instances/GTL 7TH/minecraft/config/ftbquests",
        "private": None,
        "fallbacks": [],
        "merge": False,
    },
]


@dataclass
class Token:
    kind: str
    value: str


@dataclass
class Scalar:
    value: str
    quoted: bool = False


class Parser:
    def __init__(self, text: str) -> None:
        self.tokens = self._tokenize(text)
        self.i = 0

    def _tokenize(self, text: str) -> list[Token]:
        tokens: list[Token] = []
        i = 0
        while i < len(text):
            c = text[i]
            if c.isspace():
                i += 1
            elif c in "{}[]:,":
                tokens.append(Token(c, c))
                i += 1
            elif c == '"':
                j = i + 1
                escaped = False
                value = ""
                while j < len(text):
                    ch = text[j]
                    if escaped:
                        value += "\\" + ch
                        escaped = False
                    elif ch == "\\":
                        escaped = True
                    elif ch == '"':
                        break
                    else:
                        value += ch
                    j += 1
                tokens.append(Token("string", value))
                i = j + 1
            else:
                j = i
                while j < len(text) and not text[j].isspace() and text[j] not in "{}[]:,":
                    j += 1
                tokens.append(Token("bare", text[i:j]))
                i = j
        return tokens

    def peek(self) -> Token:
        return self.tokens[self.i]

    def take(self, kind: str | None = None) -> Token:
        token = self.tokens[self.i]
        if kind is not None and token.kind != kind:
            raise ValueError(f"Expected {kind}, got {token.kind}")
        self.i += 1
        return token

    def parse(self):
        return self.parse_value()

    def parse_value(self):
        token = self.peek()
        if token.kind == "{":
            return self.parse_object()
        if token.kind == "[":
            return self.parse_list()
        if token.kind == "string":
            return Scalar(self.take("string").value, quoted=True)
        return Scalar(self.take("bare").value, quoted=False)

    def parse_object(self):
        items = []
        self.take("{")
        while self.peek().kind != "}":
            key = self.take().value
            self.take(":")
            items.append([key, self.parse_value()])
            if self.peek().kind == ",":
                self.take(",")
        self.take("}")
        return {"type": "object", "items": items}

    def parse_list(self):
        values = []
        self.take("[")
        while self.peek().kind != "]":
            values.append(self.parse_value())
            if self.peek().kind == ",":
                self.take(",")
        self.take("]")
        return {"type": "list", "values": values}


def scalar_text(value) -> str | None:
    if isinstance(value, Scalar):
        return value.value
    return None


def object_id(obj) -> str | None:
    if not isinstance(obj, dict) or obj.get("type") != "object":
        return None
    for key, value in obj["items"]:
        if key == "id":
            return scalar_text(value)
    return None


def has_cjk(value) -> bool:
    if isinstance(value, Scalar):
        return bool(re.search(r"[\u3400-\u9fff\U00020000-\U0002EBEF]", value.value))
    if isinstance(value, dict) and value.get("type") == "list":
        return any(has_cjk(v) for v in value["values"])
    if isinstance(value, dict) and value.get("type") == "object":
        return any(has_cjk(v) for _, v in value["items"])
    return False


def text_score(obj) -> int:
    score = 0
    for key, value in obj["items"]:
        if key in TEXT_KEYS and has_cjk(value):
            score += 1
    return score


def walk(value):
    if isinstance(value, dict) and value.get("type") == "object":
        yield value
        for _, child in value["items"]:
            yield from walk(child)
    elif isinstance(value, dict) and value.get("type") == "list":
        for child in value["values"]:
            yield from walk(child)


def collect_by_id(root) -> dict[str, object]:
    by_id = {}
    for obj in walk(root):
        oid = object_id(obj)
        if oid:
            by_id.setdefault(oid, obj)
    return by_id


def merge_id_maps(base: dict[str, object], incoming: dict[str, object]) -> None:
    for oid, obj in incoming.items():
        if oid not in base or text_score(obj) < text_score(base[oid]):
            base[oid] = obj


def prepare_text(text: str) -> tuple[str, dict[str, str]]:
    commands: dict[str, str] = {}

    def replace(match: re.Match) -> str:
        placeholder = f"__FTBQ_COMMAND_{len(commands)}__"
        commands[placeholder] = match.group(2)
        return f'{match.group(1)}"{placeholder}"'

    return re.sub(r'(?m)^(\s*command:\s*)(".*")$', replace, text), commands


def restore_commands(text: str, commands: dict[str, str]) -> str:
    for placeholder, original in commands.items():
        text = text.replace(quote(placeholder), original)
    return text


def copy_text_fields(dst, src) -> int:
    src_fields = {key: value for key, value in src["items"] if key in TEXT_KEYS}
    changed = 0
    for item in dst["items"]:
        key, old_value = item
        if key in src_fields:
            item[1] = src_fields[key]
            changed += 1
    return changed


def merge_texts(public_root, private_root, fallback_roots) -> tuple[int, int]:
    private_ids = {}
    private_roots_by_rel = {}
    source_roots = [private_root, *fallback_roots]
    for source_root in source_roots:
        for path in source_root.rglob("*.snbt"):
            if "quests_backup" in path.parts:
                continue
            try:
                prepared, _ = prepare_text(path.read_text(encoding="utf-8"))
                ast = Parser(prepared).parse()
                merge_id_maps(private_ids, collect_by_id(ast))
                rel = path.relative_to(source_root)
                if rel not in private_roots_by_rel or text_score(ast) < text_score(private_roots_by_rel[rel]):
                    private_roots_by_rel[rel] = ast
            except Exception as exc:
                print(f"AVISO: nao consegui ler fonte {path}: {exc}")

    files_changed = 0
    fields_changed = 0
    for path in public_root.rglob("*.snbt"):
        try:
            prepared, commands = prepare_text(path.read_text(encoding="utf-8"))
            ast = Parser(prepared).parse()
        except Exception as exc:
            print(f"AVISO: nao consegui ler publico {path}: {exc}")
            continue
        changed_here = 0
        rel = path.relative_to(public_root)
        if rel in private_roots_by_rel:
            changed_here += copy_text_fields(ast, private_roots_by_rel[rel])
        for obj in walk(ast):
            oid = object_id(obj)
            if oid and oid in private_ids:
                changed_here += copy_text_fields(obj, private_ids[oid])
        if changed_here:
            path.write_text(restore_commands(dump(ast), commands) + "\n", encoding="utf-8", newline="\n")
            files_changed += 1
            fields_changed += changed_here
    return files_changed, fields_changed


def quote(value: str) -> str:
    value = value.replace("\\", "\\\\").replace('"', '\\"')
    return f'"{value}"'


def dump(value, level: int = 0) -> str:
    tab = "\t"
    if isinstance(value, Scalar):
        return quote(value.value) if value.quoted else value.value
    if isinstance(value, dict) and value.get("type") == "list":
        values = value["values"]
        if not values:
            return "[ ]"
        if all(isinstance(v, Scalar) for v in values) and len(values) <= 2:
            return "[" + ", ".join(dump(v, level) for v in values) + "]"
        inner = "\n".join(f"{tab * (level + 1)}{dump(v, level + 1)}" for v in values)
        return f"[\n{inner}\n{tab * level}]"
    if isinstance(value, dict) and value.get("type") == "object":
        if not value["items"]:
            return "{ }"
        lines = [f"{tab * (level + 1)}{key}: {dump(child, level + 1)}" for key, child in value["items"]]
        return "{\n" + "\n".join(lines) + f"\n{tab * level}" + "}"
    raise TypeError(value)


def strip_build_noise(path: Path) -> None:
    for noisy in path.rglob("*.bak"):
        noisy.unlink()


def main() -> None:
    for pack in PACKS:
        target = ROOT / pack["name"] / "config" / "ftbquests"
        if target.exists():
            shutil.rmtree(target.parent.parent)
        shutil.copytree(pack["public"], target)
        strip_build_noise(target)
        if pack["merge"]:
            files, fields = merge_texts(target, pack["private"], pack["fallbacks"])
            print(f"{pack['name']}: {files} arquivos atualizados, {fields} campos de texto substituidos.")
        else:
            print(f"{pack['name']}: copiado como base PT-BR existente.")


if __name__ == "__main__":
    main()
