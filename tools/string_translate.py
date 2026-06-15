from __future__ import annotations

import argparse
import ast
import json
import re
import shutil
import sys
from hashlib import sha1
from pathlib import Path


if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")
    sys.stderr.reconfigure(encoding="utf-8")


CJK_RE = re.compile(r"[\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]")
LATIN_TEXT_RE = re.compile(r"[A-Za-zÀ-ÿ]{3,}")
DOUBLE_STRING_RE = re.compile(r'"(?:\\.|[^"\\])*"', re.DOTALL)
SINGLE_STRING_RE = re.compile(r"'(?:\\.|[^'\\])*'", re.DOTALL)
FORMAT_RE = re.compile(r"(?i)(?:&[0-9a-fk-or]|\u00a7[0-9a-fk-or])")
RESOURCE_RE = re.compile(r"\b[a-z0-9_.-]+:[a-z0-9_./-]+\b", re.I)
PLACEHOLDER_RE = re.compile(r"(%\d*\$?[sdfox]|%\{[^}]+\}|\{[A-Za-z0-9_.:-]+\}|\{@[^}]+\})")
TEXT_EXTS = {".snbt", ".js", ".json", ".json5", ".lang", ".properties", ".txt", ".md"}
SKIP_PARTS = {"node_modules", ".git", "logs", "crash-reports", "screenshots", "saves"}


def has_source_text(text: str, source_lang: str) -> bool:
    if source_lang in {"zh", "zh_cn"}:
        return bool(CJK_RE.search(text))
    return bool(LATIN_TEXT_RE.search(text)) and not looks_like_identifier(text)


def looks_like_identifier(text: str) -> bool:
    stripped = text.strip()
    if not stripped or len(stripped) > 5000:
        return True
    if re.fullmatch(r"[a-z0-9_.:-]+", stripped, re.I):
        return True
    if RESOURCE_RE.fullmatch(stripped):
        return True
    if re.fullmatch(r"[A-Fa-f0-9]{8,}", stripped):
        return True
    if stripped.startswith(("#", "http://", "https://")):
        return True
    return False


def protected_tokens(text: str) -> dict[str, list[str]]:
    return {
        "format": sorted(FORMAT_RE.findall(text)),
        "resources": sorted(RESOURCE_RE.findall(text)),
        "placeholders": sorted(PLACEHOLDER_RE.findall(text)),
    }


def stable_id(relpath: str, start: int, source: str, quote: str) -> str:
    key = f"{relpath}\0{start}\0{quote}\0{source}"
    return sha1(key.encode("utf-8")).hexdigest()[:16]


def decode_double(token: str) -> str:
    return json.loads(token)


def encode_double(value: str) -> str:
    return json.dumps(value, ensure_ascii=False)


def decode_single(token: str) -> str:
    return ast.literal_eval(token)


def encode_single(value: str) -> str:
    return "'" + value.replace("\\", "\\\\").replace("'", "\\'").replace("\n", "\\n") + "'"


def iter_files(root: Path):
    for path in sorted(root.rglob("*")):
        if not path.is_file() or path.suffix.lower() not in TEXT_EXTS:
            continue
        if any(part in SKIP_PARTS for part in path.parts):
            continue
        yield path


def extract_file(path: Path, root: Path, source_lang: str):
    text = path.read_text(encoding="utf-8")
    relpath = str(path.relative_to(root)).replace("\\", "/")
    seen_spans: set[tuple[int, int]] = set()
    double_spans = [(match.start(), match.end()) for match in DOUBLE_STRING_RE.finditer(text)]

    def inside_double(span: tuple[int, int]) -> bool:
        start, end = span
        return any(start > d_start and end < d_end for d_start, d_end in double_spans)

    for regex, quote, decoder in ((DOUBLE_STRING_RE, "double", decode_double),):
        for match in regex.finditer(text):
            span = (match.start(), match.end())
            if quote == "single" and inside_double(span):
                continue
            if span in seen_spans:
                continue
            try:
                source = decoder(match.group(0))
            except Exception:
                continue
            if not isinstance(source, str) or not has_source_text(source, source_lang):
                continue
            if looks_like_identifier(source):
                continue
            seen_spans.add(span)
            yield {
                "id": stable_id(relpath, match.start(), source, quote),
                "relpath": relpath,
                "line": text.count("\n", 0, match.start()) + 1,
                "span_start": match.start(),
                "span_end": match.end(),
                "quote": quote,
                "source": source,
                "translation": "",
                "protected": protected_tokens(source),
            }


def read_jsonl(path: Path) -> list[dict]:
    rows = []
    if not path.exists():
        return rows
    with path.open("r", encoding="utf-8") as handle:
        for number, line in enumerate(handle, 1):
            line = line.strip()
            if not line:
                continue
            try:
                rows.append(json.loads(line))
            except json.JSONDecodeError as exc:
                raise SystemExit(f"JSON invalido em {path}:{number}: {exc}") from exc
    return rows


def write_jsonl(path: Path, rows: list[dict]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8", newline="\n") as handle:
        for row in rows:
            handle.write(json.dumps(row, ensure_ascii=False) + "\n")


def cmd_extract(args):
    root = Path(args.root)
    rows = []
    for path in iter_files(root):
        rows.extend(extract_file(path, root, args.source_lang))
    write_jsonl(Path(args.out), rows)
    print(f"Extraidas {len(rows)} strings de {len({row['relpath'] for row in rows})} arquivos.")
    print(f"Arquivo: {args.out}")


def cmd_apply(args):
    source_root = Path(args.root)
    out_root = Path(args.out)
    rows = [row for row in read_jsonl(Path(args.translations)) if row.get("translation")]
    if out_root.exists():
        if not args.force:
            raise SystemExit(f"Saida ja existe: {out_root}. Use --force.")
        shutil.rmtree(out_root)
    shutil.copytree(source_root, out_root)

    by_file: dict[str, list[dict]] = {}
    for row in rows:
        by_file.setdefault(row["relpath"], []).append(row)

    changed_files = 0
    applied = 0
    for relpath, file_rows in by_file.items():
        path = out_root / relpath
        text = path.read_text(encoding="utf-8")
        for row in sorted(file_rows, key=lambda item: item["span_start"], reverse=True):
            original = text[row["span_start"] : row["span_end"]]
            try:
                current = decode_double(original) if row["quote"] == "double" else decode_single(original)
            except Exception as exc:
                raise SystemExit(f"Falha lendo string atual em {relpath}:{row['line']}: {exc}") from exc
            if current != row["source"]:
                raise SystemExit(f"Fonte mudou em {relpath}:{row['line']}: {current!r} != {row['source']!r}")
            replacement = encode_double(row["translation"]) if row["quote"] == "double" else encode_single(row["translation"])
            text = text[: row["span_start"]] + replacement + text[row["span_end"] :]
            applied += 1
        path.write_text(text, encoding="utf-8", newline="")
        changed_files += 1
    print(f"Aplicadas {applied} traducoes em {changed_files} arquivos.")
    print(f"Saida: {out_root}")


def cmd_merge(args):
    rows = read_jsonl(Path(args.base))
    updates = {}
    for input_text in args.inputs:
        paths = sorted(Path().glob(input_text)) if any(char in input_text for char in "*?[") else [Path(input_text)]
        for path in paths:
            for row in read_jsonl(path):
                if row.get("translation"):
                    updates[row["id"]] = row["translation"]
    changed = 0
    for row in rows:
        if row["id"] in updates:
            row["translation"] = updates[row["id"]]
            changed += 1
    write_jsonl(Path(args.out), rows)
    print(f"Mescladas {changed} traducoes.")
    print(f"Arquivo: {args.out}")


def cmd_check(args):
    rows = read_jsonl(Path(args.translations))
    done = [row for row in rows if row.get("translation")]
    cjk = sum(1 for row in done if CJK_RE.search(row["translation"]))
    warnings = []
    for row in done:
        before = row.get("protected") or protected_tokens(row["source"])
        after = protected_tokens(row["translation"])
        for key in ("format", "resources", "placeholders"):
            if before.get(key, []) != after.get(key, []):
                warnings.append((row["id"], row["relpath"], row.get("line", 0), key, before.get(key, []), after.get(key, [])))
    print(f"Entradas: {len(rows)}")
    print(f"Traduzidas: {len(done)}")
    print(f"Pendentes: {len(rows) - len(done)}")
    print(f"Traducoes ainda com chines: {cjk}")
    print(f"Avisos de tokens protegidos: {len(warnings)}")
    for warning in warnings[:40]:
        print("!", *warning)


def main():
    parser = argparse.ArgumentParser(description="Extrai, mescla, checa e aplica strings traduziveis.")
    sub = parser.add_subparsers(required=True)

    extract = sub.add_parser("extract")
    extract.add_argument("--root", required=True)
    extract.add_argument("--out", required=True)
    extract.add_argument("--source-lang", choices=["zh", "zh_cn", "pt", "en"], default="zh")
    extract.set_defaults(func=cmd_extract)

    merge = sub.add_parser("merge")
    merge.add_argument("--base", required=True)
    merge.add_argument("--inputs", nargs="+", required=True)
    merge.add_argument("--out", required=True)
    merge.set_defaults(func=cmd_merge)

    check = sub.add_parser("check")
    check.add_argument("--translations", required=True)
    check.set_defaults(func=cmd_check)

    apply = sub.add_parser("apply")
    apply.add_argument("--root", required=True)
    apply.add_argument("--translations", required=True)
    apply.add_argument("--out", required=True)
    apply.add_argument("--force", action="store_true")
    apply.set_defaults(func=cmd_apply)

    args = parser.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()
