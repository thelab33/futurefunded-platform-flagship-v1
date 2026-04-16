#!/usr/bin/env python3
from __future__ import annotations

from pathlib import Path
from datetime import datetime
import json
import shutil

ROOT = Path(".").resolve()
CSS = ROOT / "src/lib/styles/ff.css"
OUT = ROOT / "audit/ff-phase16"
OUT.mkdir(parents=True, exist_ok=True)

# Wave A only: safest platform-only legacy drift
TARGETS = {
    "ff-platformPage",
    "ff-platformPage__inner",
    "ff-platformTopbar__actions",
    "ff-platformProofCard",
    "ff-platformSectionCard",
    "ff-platformStatsCard",
    "ff-platformMiniCard",
    "ff-platformMiniGrid",
    "ff-platformMiniList",
    "ff-platformMiniTitle",
    "ff-platformMetric",
    "ff-platformMetric__label",
    "ff-platformMetric__value",
    "ff-platformSectionPills",
    "ff-platformSystemGrid",
    "ff-platformRouteCard--wide",
    "ff-platformTierName",
    "ff-platformControlActions",
    "ff-platformHeaderActions",
    "ff-platformLaneTags",
    "ff-platformIncludeTitle",
    "ff-platformLead",
}

def strip_comments_strings(s: str) -> str:
    out = []
    i = 0
    n = len(s)
    while i < n:
        ch = s[i]
        nxt = s[i + 1] if i + 1 < n else ""

        if ch == "/" and nxt == "*":
            end = s.find("*/", i + 2)
            if end == -1:
                break
            out.append(" " * (end + 2 - i))
            i = end + 2
            continue

        if ch in ("'", '"'):
            quote = ch
            out.append(ch)
            i += 1
            while i < n:
                c = s[i]
                out.append(" " if c != "\n" else "\n")
                if c == "\\" and i + 1 < n:
                    i += 2
                    continue
                if c == quote:
                    i += 1
                    break
                i += 1
            continue

        out.append(ch)
        i += 1

    return "".join(out)

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
        if ch in "([":  # defensive, not expected much here
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

def selector_name(selector: str) -> str | None:
    selector = selector.strip()
    if not selector.startswith(".ff-"):
        return None

    # normalize direct class selectors only
    name = selector[1:].strip()
    if any(c in name for c in " :>+~#["):
        return None
    return name

def render_selectors(selectors: list[str], original_prelude: str) -> str:
    # preserve indentation roughly from original prelude
    lines = original_prelude.splitlines()
    indent = ""
    for line in lines:
        if line.strip():
            indent = line[: len(line) - len(line.lstrip())]
            break

    if len(selectors) == 1:
        return f"{indent}{selectors[0]}"
    return (",\n").join(f"{indent}{s}" for s in selectors)

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

        # recurse inside at-rules
        if stripped.startswith("@"):
            processed_body = process_css(body, report)
            out.append(prelude + "{" + processed_body + "}")
            i = close_idx + 1
            continue

        selectors = split_selectors(prelude)
        kept = []
        removed_here = []

        for sel in selectors:
            name = selector_name(sel)
            if name and name in TARGETS:
                removed_here.append(name)
            else:
                kept.append(sel)

        if removed_here:
            report["removed_selectors"].extend(removed_here)
            report["blocks_touched"] += 1
            if kept:
                new_prelude = render_selectors(kept, prelude)
                out.append(new_prelude + "{" + body + "}")
            else:
                report["blocks_removed_entirely"] += 1
                # drop full block
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
        "removed_selectors": [],
    }

    updated = process_css(original, report)
    CSS.write_text(updated, encoding="utf-8")

    counts = {}
    for name in report["removed_selectors"]:
        counts[name] = counts.get(name, 0) + 1
    report["removed_selector_counts"] = dict(sorted(counts.items()))
    report["backup_file"] = backup.name

    report_path = OUT / "wave-a-prune-report.json"
    report_path.write_text(json.dumps(report, indent=2), encoding="utf-8")

    print(json.dumps(report, indent=2))
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
