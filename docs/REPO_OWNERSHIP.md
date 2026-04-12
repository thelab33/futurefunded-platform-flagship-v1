# Repo Ownership Map

Generated: 20260411_235918

## Source-of-truth rule
Edit live files only. Do not edit `.bak`, `.orig`, or scratch copies inside `src/`.

## Route owners
These files own page assembly and route-level surface behavior:

- `src/routes/+layout.svelte`
- `src/routes/+page.server.ts`
- `src/routes/(platform)/+layout.svelte`
- `src/routes/(platform)/platform/dashboard/+page.svelte`
- `src/routes/(platform)/platform/demo/+page.svelte`
- `src/routes/(platform)/platform/onboarding/+page.svelte`
- `src/routes/(platform)/platform/+page.svelte`
- `src/routes/(platform)/platform/pricing/+page.svelte`

## Platform section owners
These files own reusable platform sections:

- `src/lib/components/platform/BrandControlSection.svelte`
- `src/lib/components/platform/CloseBand.svelte`
- `src/lib/components/platform/FaqSection.svelte`
- `src/lib/components/platform/HowItWorksSection.svelte`
- `src/lib/components/platform/PlatformChrome.svelte`
- `src/lib/components/platform/PlatformFooter.svelte`
- `src/lib/components/platform/PlatformHero.svelte`
- `src/lib/components/platform/PlatformTopBar.svelte`
- `src/lib/components/platform/ProductPreviewSection.svelte`
- `src/lib/components/platform/RevenueLanesSection.svelte`
- `src/lib/components/platform/SponsorCommerceSection.svelte`
- `src/lib/components/platform/UseCasesSection.svelte`

## UI primitive owners
These files own shared buttons, cards, headings, and other base UI pieces:

- `src/lib/components/ui/Button.svelte`
- `src/lib/components/ui/Card.svelte`
- `src/lib/components/ui/ProofStrip.svelte`
- `src/lib/components/ui/SectionHeading.svelte`

## Content owners
These files own structured page copy and content data:

- `src/lib/content/platform-home.ts`
- `src/lib/content/platform-home.ts.bak.20260411203821`
- `src/lib/content/platform-home.ts.bak.20260411204042`
- `src/lib/content/platform-home.ts.bak.20260411211309`
- `src/lib/content/platform-home.ts.bak.fixdup.20260411234633`

## Style owners
Use this lane to avoid styling drift:

- `src/lib/styles/app.css`
- `src/lib/styles/flagship.css`
- `src/lib/styles/flagship.css.bak.20260411234248`
- `src/lib/styles/tokens.css`

## Editing rules

### When changing a page
Start in the matching route owner under `src/routes/...`.

### When changing a reusable section
Edit the matching file in `src/lib/components/platform/`.

### When changing a reusable primitive
Edit the matching file in `src/lib/components/ui/`.

### When changing text/content/stats
Edit `src/lib/content/...`.

### When changing styling
Prefer this order:
1. `src/lib/styles/tokens.css` for tokens
2. `src/lib/styles/app.css` for shared system/base styles
3. `src/lib/styles/flagship.css` for flagship surface styling

## Drift risks currently present
- Backup files exist inside `src/` and increase the chance of editing the wrong file.
- Recommended: move backup files into `artifacts/backups/` or rely on Git instead of inline backup siblings.
- No obvious CLI/log paste corruption markers were detected.

## Current audit artifacts
- Summary: `artifacts/repo_audit/20260411_235918/summary.md`
- JSON snapshot: `artifacts/repo_audit/20260411_235918/ownership_snapshot.json`

## Recommended hygiene rule
Never create backup copies inside `src/`. Put them under `artifacts/backups/` if you need them.
