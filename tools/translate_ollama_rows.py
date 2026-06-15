from __future__ import annotations

import argparse
import json
import re
import sys
import time
from pathlib import Path

import requests


if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")
    sys.stderr.reconfigure(encoding="utf-8")


JSON_OBJECT_RE = re.compile(r"\{.*\}", re.DOTALL)


PROMPTS = {
    "pt_br": (
        "Voce e um tradutor tecnico de modpacks Minecraft, GregTech, AE2, KubeJS e FTB Quests. "
        "Traduza para portugues brasileiro natural. Responda somente JSON em uma linha com id e translation. "
        "Preserve codigos Minecraft como §a e &6, IDs como gtceu:machine, placeholders, numeros, EU/t, FE/t, "
        "tiers ULV/LV/MV/HV/EV/IV/LuV/ZPM/UV/UHV/UEV/UIV/UXV/OpV/MAX e nomes de mods."
    ),
    "en_us": (
        "You are a technical translator for Minecraft modpacks, GregTech, AE2, KubeJS, and FTB Quests. "
        "Translate to clear natural English. Respond only as one-line JSON with id and translation. "
        "Preserve Minecraft formatting codes such as §a and &6, IDs like gtceu:machine, placeholders, numbers, EU/t, FE/t, "
        "tiers ULV/LV/MV/HV/EV/IV/LuV/ZPM/UV/UHV/UEV/UIV/UXV/OpV/MAX, and mod names."
    ),
}


def read_jsonl(path: Path) -> list[dict]:
    if not path.exists():
        return []
    rows = []
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


def append_jsonl(path: Path, row: dict) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("a", encoding="utf-8", newline="\n") as handle:
        handle.write(json.dumps(row, ensure_ascii=False) + "\n")
        handle.flush()


def parse_response(text: str) -> str:
    text = text.strip()
    if text.startswith("```"):
        lines = text.splitlines()
        if lines and lines[0].startswith("```"):
            lines = lines[1:]
        if lines and lines[-1].startswith("```"):
            lines = lines[:-1]
        text = "\n".join(lines).strip()
    try:
        row = json.loads(text)
        if isinstance(row.get("translation"), str) and row["translation"].strip():
            return row["translation"].strip()
    except Exception:
        pass
    match = JSON_OBJECT_RE.search(text)
    if match:
        try:
            row = json.loads(match.group(0))
            if isinstance(row.get("translation"), str) and row["translation"].strip():
                return row["translation"].strip()
        except Exception:
            pass
    match = re.search(r'"translation"\s*:\s*"(.*)"\s*\}\s*$', text, re.DOTALL)
    if match:
        return match.group(1).replace('\\"', '"').replace("\\n", "\n").strip()
    raise ValueError(f"resposta sem translation JSON: {text[:260]!r}")


def call_ollama(session, host: str, model: str, prompt: str, row: dict, timeout: float) -> str:
    body = {
        "model": model,
        "stream": False,
        "options": {"temperature": 0.1, "num_ctx": 4096},
        "messages": [
            {"role": "system", "content": prompt},
            {
                "role": "user",
                "content": "Translate this entry:\n" + json.dumps({"id": row["id"], "source": row["source"], "translation": ""}, ensure_ascii=False),
            },
        ],
    }
    response = session.post(host.rstrip("/") + "/api/chat", json=body, timeout=timeout)
    response.raise_for_status()
    return parse_response(response.json()["message"]["content"])


def main():
    parser = argparse.ArgumentParser(description="Traduz linhas JSONL via Ollama, retomavel por id.")
    parser.add_argument("--manifest", required=True)
    parser.add_argument("--out", required=True)
    parser.add_argument("--target", choices=sorted(PROMPTS), required=True)
    parser.add_argument("--model", default="qwen2.5:7b")
    parser.add_argument("--host", default="http://localhost:11434")
    parser.add_argument("--timeout", type=float, default=120)
    parser.add_argument("--retries", type=int, default=2)
    parser.add_argument("--limit", type=int, default=0)
    args = parser.parse_args()

    manifest = read_jsonl(Path(args.manifest))
    done = {row["id"] for row in read_jsonl(Path(args.out)) if row.get("translation")}
    pending = [row for row in manifest if row["id"] not in done and not row.get("translation")]
    if args.limit:
        pending = pending[: args.limit]
    print(f"Pendentes nesta execucao: {len(pending)}")

    session = requests.Session()
    for index, row in enumerate(pending, 1):
        last_error = None
        for attempt in range(1, args.retries + 1):
            try:
                out_row = dict(row)
                out_row["translation"] = call_ollama(session, args.host, args.model, PROMPTS[args.target], row, args.timeout)
                append_jsonl(Path(args.out), out_row)
                print(f"[ok] {index}/{len(pending)} {row.get('relpath')}:{row.get('line')}")
                break
            except Exception as exc:
                last_error = exc
                print(f"[warn] {row['id']} tentativa {attempt}/{args.retries}: {exc}", file=sys.stderr)
                if attempt < args.retries:
                    time.sleep(2 * attempt)
        else:
            failed = dict(row)
            failed["error"] = str(last_error)
            append_jsonl(Path(str(args.out) + ".failed.jsonl"), failed)
            print(f"[fail] {row['id']}: {last_error}", file=sys.stderr)


if __name__ == "__main__":
    main()
