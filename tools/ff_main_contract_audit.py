#!/usr/bin/env python3
from __future__ import annotations

import json
import re
import sys
from collections import Counter, defaultdict, deque
from pathlib import Path

ROUTES = [
    "src/routes/c/[slug]/+page.svelte",
    "src/routes/(platform)/platform/+page.svelte",
    "src/routes/(platform)/platform/onboarding/+page.svelte",
    "src/routes/(platform)/platform/dashboard/+page.svelte",
]

CSS_FILE = "src/lib/styles/ff.css"

LOCAL_IMPORT_RE = re.compile(
    r"""import\s+(?:type\s+)?(?:[\w*\s{},]+\s+from\s+)?['"]([^'"]+)['"]""",
    re.MULTILINE,
)
TOKEN_RE = re.compile(r"\b(ff-[A-Za-z0-9_-]+)\b")
CSS_CLASS_RE = re.compile(r'(?<![A-Za-z0-9_-])\.(ff-[A-Za-z0-9_-]+)\b')
MARKER_RE = re.compile(r'/\*\s*(FF_[A-Z0-9_]+_(?:START|END))\s*\*/')

KEEP_PREFIXES = (
    "ff-page",
    "ff-shell",
    "ff-shellBg",
    "ff-container",
    "ff-main",
    "ff-section",
    "ff-grid",
    "ff-twoCol",
    "ff-threeCol",
    "ff-row",
    "ff-inline",
    "ff-stack",
    "ff-surface",
    "ff-card",
    "ff-pad",
    "ff-kicker",
    "ff-display",
    "ff-h1",
    "ff-h2",
    "ff-h3",
    "ff-copy",
    "ff-lead",
    "ff-help",
    "ff-pill",
    "ff-btn",
    "ff-iconbtn",
    "ff-chip",
    "ff-input",
    "ff-divider",
    "ff-platformBrand",
    "ff-topbarBrand",
    "ff-brand",
    "ff-themeToggle",
    "ff-skip",
    "ff-sr",
    "ff-muted",
    "ff-mutedStrong",
    "ff-minw",
    "ff-nounderline",
    "ff-m-",
    "ff-mb-",
    "ff-mt-",
    "ff-gap-",
    "ff-ais",
    "ff-wrap",
    "ff-num",
    "ff-mobileOnly",
    "ff-desktopOnly",
    "ff-topbar__",
    "ff-drawer",
    "ff-alert",
    "ff-modal",
    "ff-label",
)

def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8", errors="ignore")

def normalize(path: Path, root: Path) -> str:
    return str(path.relative_to(root))

def resolve_import(from_file: Path, spec: str, root: Path) -> Path | None:
    if not spec.startswith(".") and not spec.startswith("$lib/"):
        return None

    if spec.startswith("$lib/"):
        base = root / "src/lib" / spec.removeprefix("$lib/")
    else:
        base = (from_file.parent / spec).resolve()

    candidates = []
    if base.suffix:
        candidates.append(base)
    else:
        candidates.extend([
            Path(str(base) + ".ts"),
            Path(str(base) + ".js"),
            Path(str(base) + ".svelte"),
            base / "index.ts",
            base / "index.js",
            base / "index.svelte",
        ])

    for candidate in candidates:
        if candidate.exists() and candidate.is_file():
            return candidate.resolve()

    return None

def walk_direct_deps(entry_files: list[Path], root: Path) -> list[Path]:
    seen: set[Path] = set()
    queue = deque(entry_files)

    while queue:
        path = queue.popleft()
        if path in seen or not path.exists():
            continue
        seen.add(path)

        if path.suffix not in {".svelte", ".ts", ".js"}:
            continue

        text = read_text(path)
        for spec in LOCAL_IMPORT_RE.findall(text):
            resolved = resolve_import(path, spec, root)
            if resolved and resolved not in seen:
                queue.append(resolved)

    return sorted(seen)

def extract_tokens(path: Path) -> dict[str, list[int]]:
    hits = defaultdict(list)
    for i, line in enumerate(read_text(path).splitlines(), start=1):
        for m in TOKEN_RE.finditer(line):
            hits[m.group(1)].append(i)
    return dict(hits)

def extract_css(path: Path):
    selector_hits = defaultdict(list)
    markers = []
    for i, line in enumerate(read_text(path).splitlines(), start=1):
        for m in CSS_CLASS_RE.finditer(line):
            selector_hits[m.group(1)].append(i)
        for m in MARKER_RE.finditer(line):
            markers.append((m.group(1), i))
    return dict(selector_hits), markers

def should_keep_dead_candidate(selector: str) -> bool:
    return selector.startswith(KEEP_PREFIXES)

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

def write_md(path: Path, lines: list[str]):
    path.write_text("\n".join(lines).rstrip() + "\n", encoding="utf-8")

def main():
    root = Path(".").resolve()
    out = root / "audit/ff-main-contract"
    out.mkdir(parents=True, exist_ok=True)

    route_paths = [root / p for p in ROUTES]
    css_path = root / CSS_FILE

    missing_routes = [str(p) for p in route_paths if not p.exists()]
    if missing_routes:
        print(json.dumps({"error": "missing routes", "paths": missing_routes}, indent=2))
        return 2

    if not css_path.exists():
        print(json.dumps({"error": "missing css", "path": CSS_FILE}, indent=2))
        return 2

    dep_files = walk_direct_deps(route_paths, root)
    scanned_files = [p for p in dep_files if p != css_path]

    used_by = defaultdict(list)
    for path in scanned_files:
        tokens = extract_tokens(path)
        for selector, lines in tokens.items():
            for line in lines:
                used_by[selector].append((normalize(path, root), line))

    used = set(used_by.keys())
    css_selectors, markers = extract_css(css_path)
    defined = set(css_selectors.keys())

    missing = sorted(used - defined)
    dead = sorted(s for s in (defined - used) if not should_keep_dead_candidate(s))

    marker_counts = Counter(name for name, _ in markers)
    dup_markers = {k: v for k, v in marker_counts.items() if v > 1}

    summary = {
        "css_file": CSS_FILE,
        "route_files": [normalize(p, root) for p in route_paths],
        "dependency_files_scanned": [normalize(p, root) for p in scanned_files if p not in route_paths],
        "used_selector_count": len(used),
        "defined_selector_count": len(defined),
        "missing_in_css_count": len(missing),
        "dead_candidate_count": len(dead),
        "duplicate_marker_count": len(dup_markers),
        "missing_by_family": dict(sorted(Counter(family(s) for s in missing).items())),
        "dead_by_family": dict(sorted(Counter(family(s) for s in dead).items())),
        "exit_nonzero": bool(missing or dup_markers),
    }
    (out / "summary.json").write_text(json.dumps(summary, indent=2), encoding="utf-8")

    missing_md = ["# Missing selectors in ff.css (main files only)", ""]
    if missing:
        for selector in missing:
            missing_md.append(f"## {selector} [{family(selector)}]")
            for file_name, line in used_by[selector]:
                missing_md.append(f"- {file_name}:{line}")
            missing_md.append("")
    else:
        missing_md.append("No missing selectors found.")
    write_md(out / "missing_in_css.md", missing_md)

    dead_md = ["# Dead selector candidates in ff.css (main files only)", "", "> Review before deletion.", ""]
    if dead:
        for selector in dead:
            lines = ", ".join(f"{CSS_FILE}:{n}" for n in css_selectors[selector][:8])
            dead_md.append(f"- {selector} [{family(selector)}] -> {lines}")
    else:
        dead_md.append("No dead candidates found.")
    write_md(out / "dead_selector_candidates.md", dead_md)

    marker_md = ["# Duplicate prestige markers in ff.css", ""]
    if dup_markers:
        marker_lines = defaultdict(list)
        for name, line in markers:
            marker_lines[name].append(line)
        for name in sorted(dup_markers):
            joined = ", ".join(str(n) for n in marker_lines[name])
            marker_md.append(f"- {name}: {dup_markers[name]} occurrences (lines {joined})")
    else:
        marker_md.append("No duplicate markers found.")
    write_md(out / "duplicate_markers.md", marker_md)

    print(json.dumps(summary, indent=2))
    return 1 if (missing or dup_markers) else 0

if __name__ == "__main__":
    raise SystemExit(main())
