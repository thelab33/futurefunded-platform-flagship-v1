#!/usr/bin/env python3
from __future__ import annotations

from pathlib import Path
from datetime import datetime
import json
import re
import shutil

ROOT = Path(".").resolve()
CSS = ROOT / "src/lib/styles/ff.css"
OUT = ROOT / "audit/ff-phase17"
OUT.mkdir(parents=True, exist_ok=True)

# Wave B:
# 1) remove remaining platform-drift selectors even inside compound selectors
# 2) remove safe standalone shared dead selectors
TARGETS = {
    # residual platform drift
    "ff-platformControlActions",
    "ff-platformIncludeTitle",
    "ff-platformLaneTags",
    "ff-platformLead",
    "ff-platformMetric",
    "ff-platformMetric__label",
    "ff-platformMetric__value",
    "ff-platformMiniCard",
    "ff-platformMiniGrid",
    "ff-platformMiniList",
    "ff-platformMiniTitle",
    "ff-platformProofCard",
    "ff-platformRouteCard--wide",
    "ff-platformSectionCard",
    "ff-platformSectionPills",
    "ff-platformStatsCard",
    "ff-platformTierName",

    # safe standalone shared leftovers
    "ff-badgeRow",
    "ff-skeleton",
    "ff-tableCard",
}

SELECTOR_CLASS_RE = re.compile(r'\.(ff-[A-Za-z0-9_-]+)\b')

def find_matching_brace(s: str, open_idx: int) -> int:
    depth = 0
    i = open_idx
    n = len(s)

    while i < n:
        ch = s[i]
        nxt = s[i + 1] if i + 1 < n else ""

        if ch == "/" and nxt == "*":
            end = s.find("*/", i + 2)
            if end == -1:
                return -1
            i = end + 2
            continue

        if ch in ("'", '"'):
            quote = ch
            i += 1
            while i < n:
                c = s[i]
                if c == "\\" and i + 1 < n:
                    i += 2
                    continue
                if c == quote:
                    i += 1
                    break
                i += 1
            continue

        if ch == "{":
            depth += 1
        elif ch == "}":
            depth -= 1
            if depth == 0:
                return i

        i += 1

    return -1

def split_selectors(prelude: str) -> list[str]:
    parts = []
    buf = []
    depth = 0
    for ch in prelude:
        if ch in "([":  # defensive
            depth += 1
        elif ch in ")]":
            depth = max(0, depth - 1)

        if ch == "," and depth == 0:
            parts.append("".join(buf).strip())
            buf = []
        else:
            buf.append(ch)

    tail = "".join(buf).strip()
    if tail:
        parts.append(tail)
    return parts

def selector_contains_target(selector: str) -> set[str]:
    hits = set()
    for m in SELECTOR_CLASS_RE.finditer(selector):
        name = m.group(1)
        if name in TARGETS:
            hits.add(name)
    return hits

def render_selectors(selectors: list[str], original_prelude: str) -> str:
    lines = original_prelude.splitlines()
    indent = ""
    for line in lines:
        if line.strip():
            indent = line[: len(line) - len(line.lstrip())]
            break

    if len(selectors) == 1:
        return f"{indent}{selectors[0]}"
    return ",\n".join(f"{indent}{s}" for s in selectors)

def process_css(s: str, report: dict) -> str:
    out = []
    i = 0
    n = len(s)

    while i < n:
        open_idx = s.find("{", i)
        if open_idx == -1:
            out.append(s[i:])
            break

        close_idx = find_matching_brace(s, open_idx)
        if close_idx == -1:
            out.append(s[i:])
            break

        prelude = s[i:open_idx]
        body = s[open_idx + 1 : close_idx]
        stripped = prelude.strip()

        if stripped.startswith("@"):
            processed_body = process_css(body, report)
            out.append(prelude + "{" + processed_body + "}")
            i = close_idx + 1
            continue

        selectors = split_selectors(prelude)
        kept = []
        removed_here = set()

        for sel in selectors:
            hits = selector_contains_target(sel)
            if hits:
                removed_here.update(hits)
            else:
                kept.append(sel)

        if removed_here:
            report["blocks_touched"] += 1
            for name in sorted(removed_here):
                report["removed_selector_counts"][name] = report["removed_selector_counts"].get(name, 0) + 1

            if kept:
                new_prelude = render_selectors(kept, prelude)
                out.append(new_prelude + "{" + body + "}")
            else:
                report["blocks_removed_entirely"] += 1
        else:
            out.append(prelude + "{" + body + "}")

        i = close_idx + 1

    return "".join(out)

def main() -> int:
    if not CSS.exists():
        raise SystemExit("[missing] src/lib/styles/ff.css")

    original = CSS.read_text(encoding="utf-8")
    backup = CSS.with_name(f"{CSS.name}.bak.{datetime.now():%Y%m%d%H%M%S}")
    shutil.copy2(CSS, backup)

    report = {
        "targets": sorted(TARGETS),
        "blocks_touched": 0,
        "blocks_removed_entirely": 0,
        "removed_selector_counts": {},
        "backup_file": backup.name,
    }

    updated = process_css(original, report)
    CSS.write_text(updated, encoding="utf-8")

    report_path = OUT / "wave-b-prune-report.json"
    report_path.write_text(json.dumps(report, indent=2), encoding="utf-8")

    print(json.dumps(report, indent=2))
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
