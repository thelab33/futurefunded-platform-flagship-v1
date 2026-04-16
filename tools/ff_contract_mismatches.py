#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import re
import sys
from collections import Counter, defaultdict
from pathlib import Path
from typing import DefaultDict

CSS_CLASS_RE = re.compile(r'(?<![A-Za-z0-9_-])\.(ff-[A-Za-z0-9_-]+)\b')
TOKEN_RE = re.compile(r'\b(ff-[A-Za-z0-9_-]+)\b')
MARKER_RE = re.compile(r'/\*\s*(FF_[A-Z0-9_]+_(?:START|END))\s*\*/')

SURFACE_CANDIDATES = {
    "campaign": [
        "src/routes/c/[slug]/+page.svelte",
        "src/routes/c/[slug]/page.svelte",
    ],
    "platform": [
        "src/routes/(platform)/platform/+page.svelte",
        "src/routes/platform/+page.svelte",
    ],
    "onboarding": [
        "src/routes/(platform)/platform/onboarding/+page.svelte",
        "src/routes/platform/onboarding/+page.svelte",
    ],
    "dashboard": [
        "src/routes/(platform)/platform/dashboard/+page.svelte",
        "src/routes/platform/dashboard/+page.svelte",
    ],
}

DEFAULT_CSS_CANDIDATES = [
    "src/lib/styles/ff.css",
]

DEFAULT_INCLUDE_GLOBS = [
    "src/lib/components/**/*.svelte",
]

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

CAMPAIGN_HINT_PREFIXES = (
    "ff-campaign",
    "ff-topbarGoal",
    "ff-hero",
    "ff-team",
    "ff-impact",
    "ff-leaderboard",
    "ff-checkout",
    "ff-countdown",
    "ff-success",
    "ff-proofMini",
    "ff-meter",
    "ff-announcement",
)

def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8", errors="ignore")

def resolve_first_existing(repo_root: Path, candidates: list[str]) -> Path | None:
    for rel in candidates:
        p = repo_root / rel
        if p.exists():
            return p
    return None

def normalize(path: Path, repo_root: Path) -> str:
    try:
        return str(path.relative_to(repo_root))
    except ValueError:
        return str(path)

def classify_family(selector: str) -> str:
    if selector.startswith("ff-platform"):
        return "platform"
    if selector.startswith("ff-onboarding"):
        return "onboarding"
    if selector.startswith("ff-dashboard"):
        return "dashboard"
    if selector.startswith(CAMPAIGN_HINT_PREFIXES):
        return "campaign"
    return "shared"

def should_keep_dead_candidate(selector: str) -> bool:
    return selector.startswith(KEEP_PREFIXES)

def extract_template_tokens(path: Path) -> dict[str, list[int]]:
    hits: DefaultDict[str, list[int]] = defaultdict(list)
    for lineno, line in enumerate(read_text(path).splitlines(), start=1):
        for match in TOKEN_RE.finditer(line):
            hits[match.group(1)].append(lineno)
    return dict(hits)

def extract_css_selectors_and_markers(path: Path) -> tuple[dict[str, list[int]], list[tuple[str, int]]]:
    selector_hits: DefaultDict[str, list[int]] = defaultdict(list)
    markers: list[tuple[str, int]] = []

    for lineno, line in enumerate(read_text(path).splitlines(), start=1):
        for match in CSS_CLASS_RE.finditer(line):
            selector_hits[match.group(1)].append(lineno)
        for match in MARKER_RE.finditer(line):
            markers.append((match.group(1), lineno))

    return dict(selector_hits), markers

def expand_include_globs(repo_root: Path, globs: list[str], surface_paths: set[Path], css_path: Path) -> list[Path]:
    files: list[Path] = []
    seen: set[Path] = set()

    for pattern in globs:
        for path in repo_root.glob(pattern):
            if not path.is_file():
                continue
            if path == css_path or path in surface_paths:
                continue
            if path in seen:
                continue
            seen.add(path)
            files.append(path)

    return sorted(files)

def write_lines(path: Path, lines: list[str]) -> None:
    path.write_text("\n".join(lines).rstrip() + "\n", encoding="utf-8")

def main() -> int:
    parser = argparse.ArgumentParser(description="Audit FutureFunded ff.css contract mismatches.")
    parser.add_argument("--repo-root", default=".", help="Repo root")
    parser.add_argument("--out-dir", default="audit/ff-contract", help="Output directory")
    parser.add_argument("--css", default="", help="Explicit CSS path. Defaults to first known ff.css candidate.")
    parser.add_argument(
        "--include-glob",
        action="append",
        default=[],
        help="Additional glob(s) to include in usage scan, e.g. src/lib/components/**/*.svelte",
    )
    args = parser.parse_args()

    repo_root = Path(args.repo_root).resolve()
    out_dir = (repo_root / args.out_dir).resolve()
    out_dir.mkdir(parents=True, exist_ok=True)

    css_path = Path(args.css).resolve() if args.css else None
    if css_path and not css_path.exists():
        print(f"[error] CSS file not found: {css_path}", file=sys.stderr)
        return 2
    if not css_path:
        css_path = resolve_first_existing(repo_root, DEFAULT_CSS_CANDIDATES)
        if not css_path:
            print("[error] Could not find ff.css in known locations.", file=sys.stderr)
            return 2

    resolved_surfaces: dict[str, Path] = {}
    missing_surfaces: dict[str, list[str]] = {}

    for surface, candidates in SURFACE_CANDIDATES.items():
        found = resolve_first_existing(repo_root, candidates)
        if found:
            resolved_surfaces[surface] = found
        else:
            missing_surfaces[surface] = candidates

    include_globs = args.include_glob[:] if args.include_glob else DEFAULT_INCLUDE_GLOBS[:]
    include_files = expand_include_globs(repo_root, include_globs, set(resolved_surfaces.values()), css_path)

    css_selectors, markers = extract_css_selectors_and_markers(css_path)

    used_by_selector: DefaultDict[str, list[tuple[str, int]]] = defaultdict(list)
    used_by_surface: DefaultDict[str, set[str]] = defaultdict(set)

    for surface, path in resolved_surfaces.items():
        tokens = extract_template_tokens(path)
        for selector, lines in tokens.items():
            for line in lines:
                used_by_selector[selector].append((normalize(path, repo_root), line))
            used_by_surface[surface].add(selector)

    for path in include_files:
        tokens = extract_template_tokens(path)
        for selector, lines in tokens.items():
            for line in lines:
                used_by_selector[selector].append((normalize(path, repo_root), line))

    used_selectors = set(used_by_selector.keys())
    css_selector_set = set(css_selectors.keys())

    missing_in_css = sorted(used_selectors - css_selector_set)
    dead_candidates = sorted(
        selector
        for selector in (css_selector_set - used_selectors)
        if not should_keep_dead_candidate(selector)
    )

    marker_counts = Counter(name for name, _ in markers)
    duplicate_markers = {name: count for name, count in marker_counts.items() if count > 1}

    marker_lines: DefaultDict[str, list[int]] = defaultdict(list)
    for name, line in markers:
        marker_lines[name].append(line)

    missing_lines = ["# Missing selectors used in surfaces/components but not defined in ff.css", ""]
    if missing_in_css:
        for selector in missing_in_css:
            family = classify_family(selector)
            missing_lines.append(f"## {selector}  [{family}]")
            for file_name, line in used_by_selector[selector]:
                missing_lines.append(f"- {file_name}:{line}")
            missing_lines.append("")
    else:
        missing_lines.append("No missing ff-* selectors found.")
    write_lines(out_dir / "missing_in_css.md", missing_lines)

    dead_lines = ["# Dead selector candidates defined in ff.css but not referenced by scanned surfaces/components", ""]
    dead_lines.append("> These are candidates only. Review before deletion.")
    dead_lines.append("")
    if dead_candidates:
        for selector in dead_candidates:
            family = classify_family(selector)
            defined_at = ", ".join(f"{normalize(css_path, repo_root)}:{line}" for line in css_selectors[selector][:8])
            dead_lines.append(f"- {selector}  [{family}]  -> {defined_at}")
    else:
        dead_lines.append("No dead selector candidates found.")
    write_lines(out_dir / "dead_selector_candidates.md", dead_lines)

    marker_report = ["# Duplicate / repeated prestige markers in ff.css", ""]
    if duplicate_markers:
        for name in sorted(duplicate_markers):
            lines = ", ".join(str(n) for n in marker_lines[name])
            marker_report.append(f"- {name}: {duplicate_markers[name]} occurrences (lines {lines})")
    else:
        marker_report.append("No duplicate prestige markers found.")
    write_lines(out_dir / "duplicate_markers.md", marker_report)

    family_summary: DefaultDict[str, int] = defaultdict(int)
    for selector in used_selectors:
        family_summary[classify_family(selector)] += 1

    missing_family_summary: DefaultDict[str, int] = defaultdict(int)
    for selector in missing_in_css:
        missing_family_summary[classify_family(selector)] += 1

    summary = {
        "css_file": normalize(css_path, repo_root),
        "resolved_surfaces": {k: normalize(v, repo_root) for k, v in resolved_surfaces.items()},
        "missing_surfaces": missing_surfaces,
        "include_globs": include_globs,
        "include_files_scanned": [normalize(p, repo_root) for p in include_files],
        "used_selector_count": len(used_selectors),
        "defined_selector_count": len(css_selector_set),
        "missing_in_css_count": len(missing_in_css),
        "dead_candidate_count": len(dead_candidates),
        "duplicate_marker_count": len(duplicate_markers),
        "used_selector_family_breakdown": dict(sorted(family_summary.items())),
        "missing_selector_family_breakdown": dict(sorted(missing_family_summary.items())),
        "exit_nonzero": bool(missing_in_css or duplicate_markers),
    }
    (out_dir / "summary.json").write_text(json.dumps(summary, indent=2), encoding="utf-8")

    print(json.dumps(summary, indent=2))

    return 1 if (missing_in_css or duplicate_markers) else 0

if __name__ == "__main__":
    raise SystemExit(main())
