#!/usr/bin/env python3
from __future__ import annotations

import json
from pathlib import Path

MISSING_FILE = Path("audit/ff-main-contract/missing_in_css.md")
DEAD_FILE = Path("audit/ff-main-contract/dead_selector_candidates.md")
OUT_DIR = Path("audit/ff-main-contract")

KEEP_ADD = {
    "ff-actions",
    "ff-brand__meta",
    "ff-btn--topCtaMuted",
    "ff-label",
    "ff-body",
    "ff-checkoutPanel",
    "ff-checkoutStatus",
    "ff-checkoutError",
    "ff-checkoutActions",
    "ff-checkoutPrimaryCta",
    "ff-checkoutReassurance",
    "ff-checkoutSummary__row",
    "ff-dashboardDrawer",
    "ff-dashboardFooterWrap",
    "ff-dashboardPill",
    "ff-dashboardSectionWrap",
    "ff-dashboardSectionBlock--side",
    "ff-onboardingTopbar",
    "ff-onboardingPage__inner",
    "ff-onboardingDrawerLabel",
}

RENAME_REMOVE = {
    "ff-campaignHeader",
    "ff-campaignHeader__goal",
    "ff-campaignHero",
    "ff-campaignHero__story",
    "ff-campaignSponsorGrid",
    "ff-campaignTeamsGrid",
    "ff-hero",
    "ff-hero-panel",
    "ff-heroPanel",
    "ff-heroPanel--flagship",
    "ff-hero__shell",
    "ff-heroCtas--flagship",
    "ff-goal",
    "ff-goalbar",
    "ff-meter",
    "ff-densityGoalbar",
    "ff-densityMain",
    "ff-densityPreview",
    "ff-densityRail",
    "ff-mt-5",
    "ff-amount",
    "ff-amount-input",
    "ff-donor-name",
    "ff-email",
    "ff-message",
}

IGNORE_HOOKS = {
    "ff-home",
    "ff-donate",
    "ff-donate-btn",
    "ff-open-checkout",
    "ff-open-drawer",
    "ff-open-sponsor",
    "ff-close-drawer",
    "ff-close-sponsor",
    "ff-live-sponsor-spotlight",
    "ff-embedded-checkout",
    "ff-launch-state",
}

def parse_missing(path: Path):
    sels = []
    if not path.exists():
        return sels
    for line in path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if line.startswith("## "):
            selector = line[3:].split(" [", 1)[0].strip()
            sels.append(selector)
    return sels

def parse_dead(path: Path):
    sels = []
    if not path.exists():
        return sels
    for line in path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if line.startswith("- "):
            selector = line[2:].split(" [", 1)[0].strip()
            sels.append(selector)
    return sels

missing = parse_missing(MISSING_FILE)
dead = parse_dead(DEAD_FILE)

bucket_keep = sorted([s for s in missing if s in KEEP_ADD])
bucket_rename = sorted([s for s in missing if s in RENAME_REMOVE])
bucket_ignore = sorted([s for s in missing if s in IGNORE_HOOKS])
bucket_review = sorted([s for s in missing if s not in KEEP_ADD | RENAME_REMOVE | IGNORE_HOOKS])

dead_prune = sorted(dead)

summary = {
    "keep_add_count": len(bucket_keep),
    "rename_remove_count": len(bucket_rename),
    "ignore_hook_count": len(bucket_ignore),
    "needs_manual_review_count": len(bucket_review),
    "dead_prune_count": len(dead_prune),
}

(OUT_DIR / "triage-summary.json").write_text(json.dumps(summary, indent=2), encoding="utf-8")
(OUT_DIR / "01-keep-add.txt").write_text("\n".join(bucket_keep) + "\n", encoding="utf-8")
(OUT_DIR / "02-rename-remove.txt").write_text("\n".join(bucket_rename) + "\n", encoding="utf-8")
(OUT_DIR / "03-ignore-hooks.txt").write_text("\n".join(bucket_ignore) + "\n", encoding="utf-8")
(OUT_DIR / "04-manual-review.txt").write_text("\n".join(bucket_review) + "\n", encoding="utf-8")
(OUT_DIR / "05-dead-prune.txt").write_text("\n".join(dead_prune) + "\n", encoding="utf-8")

print(json.dumps(summary, indent=2))
