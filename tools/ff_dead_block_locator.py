#!/usr/bin/env python3
from __future__ import annotations

from pathlib import Path
import re

ROOT = Path(".").resolve()
CSS = ROOT / "src/lib/styles/ff.css"
DEAD_LIST = ROOT / "audit/ff-main-contract/05-dead-prune.txt"
OUT = ROOT / "audit/ff-phase16/dead-selector-map.md"

if not CSS.exists():
    raise SystemExit("[missing] src/lib/styles/ff.css")
if not DEAD_LIST.exists():
    raise SystemExit("[missing] audit/ff-main-contract/05-dead-prune.txt")

text = CSS.read_text(encoding="utf-8", errors="ignore").splitlines()
dead = [line.strip() for line in DEAD_LIST.read_text(encoding="utf-8").splitlines() if line.strip()]

out = ["# Dead selector map", ""]
for selector in dead:
    rx = re.compile(rf'(?<![A-Za-z0-9_-])\.{re.escape(selector)}\b')
    lines = [i for i, line in enumerate(text, start=1) if rx.search(line)]
    out.append(f"## {selector}")
    if lines:
        out.append(f"- occurrences: {', '.join(map(str, lines))}")
        first = max(1, lines[0] - 3)
        last = min(len(text), lines[0] + 12)
        out.append("")
        out.append("```css")
        for n in range(first, last + 1):
            out.append(f"{n:>5}: {text[n-1]}")
        out.append("```")
    else:
        out.append("- occurrences: none found")
    out.append("")

OUT.write_text("\n".join(out), encoding="utf-8")
print(f"[wrote] {OUT}")
