#!/usr/bin/env python3
from __future__ import annotations

from pathlib import Path
from datetime import datetime
import re
import shutil

ROOT = Path(".").resolve()

TARGETS = [
    Path("src/routes/c/[slug]/+page.svelte"),
    Path("src/routes/(platform)/platform/+page.svelte"),
    Path("src/routes/(platform)/platform/onboarding/+page.svelte"),
    Path("src/routes/(platform)/platform/dashboard/+page.svelte"),
]

# Only mutate class="" attributes.
# Do NOT touch data-ff-* hooks in this pass.
CLASS_ATTR_RE = re.compile(r'class="([^"]+)"')

TOKEN_MAP = {
    # Campaign: remove alias drift / no-style class drift
    "ff-campaignHeader": None,
    "ff-donate-btn": None,
    "ff-campaignHeader__goal": None,   # ff-topbarGoal already present
    "ff-densityGoalbar": None,
    "ff-hero": None,
    "ff-campaignHero": None,
    "ff-hero__shell": None,            # ff-container already present
    "ff-campaignHero__story": None,
    "ff-heroCtas--flagship": None,
    "ff-heroPanel": "ff-stack",
    "ff-heroPanel--flagship": None,
    "ff-campaignTeamsGrid": None,
    "ff-campaignSponsorGrid": None,

    # Onboarding: strip density aliases / one-off spacing drift
    "ff-densityRail": None,
    "ff-densityMain": None,
    "ff-densityPreview": None,
    "ff-mt-5": None,
}

def normalize_class_tokens(raw: str) -> str:
    seen = []
    for token in raw.split():
        mapped = TOKEN_MAP.get(token, token)
        if mapped is None:
            continue
        for final_token in str(mapped).split():
            if final_token and final_token not in seen:
                seen.append(final_token)
    return " ".join(seen)

def rewrite_classes(text: str) -> tuple[str, int]:
    changed = 0

    def repl(match: re.Match[str]) -> str:
        nonlocal changed
        original = match.group(1)
        normalized = normalize_class_tokens(original)
        if normalized != original:
            changed += 1
        return f'class="{normalized}"'

    return CLASS_ATTR_RE.sub(repl, text), changed

def main() -> int:
    ts = datetime.now().strftime("%Y%m%d%H%M%S")
    report_lines = []

    for rel in TARGETS:
        path = ROOT / rel
        if not path.exists():
            report_lines.append(f"[missing] {rel}")
            continue

        backup = path.with_suffix(path.suffix + f".bak.{ts}")
        shutil.copy2(path, backup)

        original = path.read_text(encoding="utf-8")
        updated, class_attr_changes = rewrite_classes(original)

        if updated != original:
            path.write_text(updated, encoding="utf-8")
            report_lines.append(f"[patched] {rel} :: class attrs changed = {class_attr_changes} :: backup = {backup.name}")
        else:
            report_lines.append(f"[unchanged] {rel} :: backup = {backup.name}")

    out = ROOT / "audit/ff-phase1/route-cleanup-report.txt"
    out.write_text("\n".join(report_lines) + "\n", encoding="utf-8")
    print(out.read_text(encoding="utf-8"))
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
