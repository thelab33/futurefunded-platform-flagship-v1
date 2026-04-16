#!/usr/bin/env python3
from __future__ import annotations

import json
import re
from collections import Counter, defaultdict
from pathlib import Path

ROOT = Path(".").resolve()

ROUTES = [
    ROOT / "src/routes/c/[slug]/+page.svelte",
    ROOT / "src/routes/(platform)/platform/+page.svelte",
    ROOT / "src/routes/(platform)/platform/onboarding/+page.svelte",
    ROOT / "src/routes/(platform)/platform/dashboard/+page.svelte",
]

DEPS = [
    ROOT / "src/lib/components/campaign/StripeCheckoutPanel.svelte",
]

CSS = ROOT / "src/lib/styles/ff.css"
OUT = ROOT / "audit/ff-phase15"
OUT.mkdir(parents=True, exist_ok=True)

CLASS_ATTR_RE = re.compile(r'class="([^"]+)"')
CSS_CLASS_RE = re.compile(r'(?<![A-Za-z0-9_-])\.(ff-[A-Za-z0-9_-]+)\b')

def read(path: Path) -> str:
    return path.read_text(encoding="utf-8", errors="ignore")

def extract_template_classes(path: Path):
    hits = defaultdict(list)
    for lineno, line in enumerate(read(path).splitlines(), start=1):
        for match in CLASS_ATTR_RE.finditer(line):
            for token in match.group(1).split():
                if token.startswith("ff-"):
                    hits[token].append(lineno)
    return dict(hits)

def extract_css_classes(path: Path):
    hits = defaultdict(list)
    for lineno, line in enumerate(read(path).splitlines(), start=1):
        for match in CSS_CLASS_RE.finditer(line):
            hits[match.group(1)].append(lineno)
    return dict(hits)

def family(selector: str) -> str:
    if selector.startswith("ff-platform"):
        return "platform"
    if selector.startswith("ff-onboarding"):
        return "onboarding"
    if selector.startswith("ff-dashboard"):
        return "dashboard"
    if selector.startswith(("ff-campaign", "ff-topbarGoal", "ff-hero", "ff-team", "ff-impact", "ff-leaderboard", "ff-checkout", "ff-countdown", "ff-success", "ff-proofMini", "ff-meter", "ff-announcement")):
        return "campaign"
    return "shared"

used_by = defaultdict(list)
for path in [*ROUTES, *DEPS]:
    if not path.exists():
        continue
    for selector, lines in extract_template_classes(path).items():
        for line in lines:
            used_by[selector].append((str(path.relative_to(ROOT)), line))

used = set(used_by.keys())
defined_map = extract_css_classes(CSS)
defined = set(defined_map.keys())

missing = sorted(used - defined)
dead = sorted(defined - used)

summary = {
    "strict_used_selector_count": len(used),
    "strict_defined_selector_count": len(defined),
    "strict_missing_count": len(missing),
    "strict_dead_count": len(dead),
    "strict_missing_by_family": dict(sorted(Counter(family(s) for s in missing).items())),
}

(OUT / "strict-summary.json").write_text(json.dumps(summary, indent=2), encoding="utf-8")

lines = ["# Strict class-only missing selectors", ""]
if missing:
    for sel in missing:
        lines.append(f"## {sel} [{family(sel)}]")
        for file_name, line in used_by[sel]:
            lines.append(f"- {file_name}:{line}")
        lines.append("")
else:
    lines.append("No missing selectors found.")
(OUT / "strict-missing.md").write_text("\n".join(lines).rstrip() + "\n", encoding="utf-8")

print(json.dumps(summary, indent=2))
