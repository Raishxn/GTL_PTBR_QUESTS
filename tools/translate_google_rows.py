from __future__ import annotations

import argparse
from concurrent.futures import ThreadPoolExecutor, as_completed
import json
import re
import sys
import threading
import time
from pathlib import Path

import requests


if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")
    sys.stderr.reconfigure(encoding="utf-8")


PROTECT_RE = re.compile(
    r"(?i)(?:\{@[^}]+\}|\{[A-Za-z0-9_.:-]+\}|&[0-9a-fk-or]|\u00a7[0-9a-fk-or]|\b[a-z0-9_.-]+:[a-z0-9_./-]+\b|\b(?:EU/t|FE/t|ULV|LV|MV|HV|EV|IV|LuV|ZPM|UV|UHV|UEV|UIV|UXV|OpV|MAX)\b)"
)


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


def append_jsonl(path: Path, row: dict, lock: threading.Lock) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with lock:
        with path.open("a", encoding="utf-8", newline="\n") as handle:
            handle.write(json.dumps(row, ensure_ascii=False) + "\n")
            handle.flush()


def mask(text: str) -> tuple[str, list[str]]:
    tokens = []

    def repl(match: re.Match) -> str:
        token = f"ZXQ{len(tokens)}QXZ"
        tokens.append(match.group(0))
        return f" {token} "

    return PROTECT_RE.sub(repl, text), tokens


def unmask(text: str, tokens: list[str]) -> str:
    for index, token in enumerate(tokens):
        marker = f"ZXQ{index}QXZ"
        replacement = token if re.fullmatch(r"(?i)(?:&[0-9a-fk-or]|\u00a7[0-9a-fk-or])", token) else f" {token} "
        text = text.replace(marker, replacement)
    text = re.sub(r"\s+([,.!?;:])", r"\1", text)
    text = re.sub(r"(?i)([\u00a7&][0-9a-fk-or])\s+", r"\1", text)
    text = re.sub(r"[ \t]{2,}", " ", text)
    return text.strip()


def translate(session: requests.Session, text: str, source: str, target: str, timeout: float) -> str:
    masked, tokens = mask(text)
    response = session.get(
        "https://translate.googleapis.com/translate_a/single",
        params={"client": "gtx", "sl": source, "tl": target, "dt": "t", "q": masked},
        timeout=timeout,
    )
    response.raise_for_status()
    data = response.json()
    translated = "".join(part[0] for part in data[0] if part and part[0])
    return unmask(translated, tokens)


def worker(row: dict, source: str, target: str, timeout: float, retries: int) -> dict:
    session = requests.Session()
    last_error = None
    for attempt in range(1, retries + 1):
        try:
            out = dict(row)
            out["translation"] = translate(session, row["source"], source, target, timeout)
            return out
        except Exception as exc:
            last_error = exc
            time.sleep(min(1.5 * attempt, 8))
    out = dict(row)
    out["error"] = str(last_error)
    return out


def main():
    parser = argparse.ArgumentParser(description="Traduz manifesto JSONL com Google Translate publico, retomavel.")
    parser.add_argument("--manifest", required=True)
    parser.add_argument("--out", required=True)
    parser.add_argument("--source", required=True)
    parser.add_argument("--target", required=True)
    parser.add_argument("--workers", type=int, default=8)
    parser.add_argument("--timeout", type=float, default=30)
    parser.add_argument("--retries", type=int, default=4)
    parser.add_argument("--limit", type=int, default=0)
    args = parser.parse_args()

    manifest = read_jsonl(Path(args.manifest))
    out_path = Path(args.out)
    done = {row["id"] for row in read_jsonl(out_path) if row.get("translation")}
    pending = [row for row in manifest if row["id"] not in done and not row.get("translation")]
    if args.limit:
        pending = pending[: args.limit]
    print(f"Pendentes nesta execucao: {len(pending)}")

    lock = threading.Lock()
    ok = 0
    failed = 0
    fail_path = Path(str(out_path) + ".failed.jsonl")
    with ThreadPoolExecutor(max_workers=args.workers) as executor:
        futures = {executor.submit(worker, row, args.source, args.target, args.timeout, args.retries): row for row in pending}
        for future in as_completed(futures):
            row = future.result()
            if row.get("translation"):
                append_jsonl(out_path, row, lock)
                ok += 1
            else:
                append_jsonl(fail_path, row, lock)
                failed += 1
            if (ok + failed) % 100 == 0 or ok + failed == len(pending):
                print(f"[progress] {ok + failed}/{len(pending)} ok={ok} failed={failed}")


if __name__ == "__main__":
    main()
