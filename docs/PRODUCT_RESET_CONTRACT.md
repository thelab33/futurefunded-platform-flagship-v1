# FutureFunded Product Reset Contract

## Why this reset exists
The repo drifted toward a long platform page while the actual flagship fundraiser route was never brought over.

## Source of truth going forward

### Core surfaces
- `/platform` -> short platform sales page
- `/platform/onboarding` -> setup flow
- `/platform/dashboard` -> operator surface
- `/platform/pricing` -> pricing
- `/c/[slug]` -> live fundraiser (flagship conversion surface)

## Page-role rules

### `/platform`
Must stay shorter than the fundraiser.
Target: 5 to 6 sections max.

Recommended section order:
1. Top nav
2. Hero
3. How it works
4. What is included
5. Pricing
6. Sponsor revenue / final CTA

### `/c/[slug]`
This is the primary fundraising surface and may be longer than `/platform`.

Recommended section order:
1. Campaign top chrome
2. Hero + donate rail
3. What support covers
4. Team/program cards
5. Sponsor packages
6. FAQ / trust close

## Architecture rules

### Canonical page files
- `src/routes/(platform)/platform/+page.svelte`
- `src/routes/(platform)/platform/dashboard/+page.svelte`
- `src/routes/(platform)/platform/onboarding/+page.svelte`
- `src/routes/(platform)/platform/pricing/+page.svelte`
- `src/routes/c/[slug]/+page.svelte`

### Styling authority
- `src/lib/styles/tokens.css`
- `src/lib/styles/app.css`
- `src/lib/styles/ff.css`

### Page ownership rule
Major page content should live inside the page file itself.
Do not split evolving pages into many partials/components unless a piece is truly reusable.

### Allowed shared components
Keep shared components tiny and minimal:
- Button
- Card
- ThemeToggle
- maybe one shared input primitive

### Freeze / non-canonical lanes
Do not keep investing in:
- `src/lib/components/platform/*`
- `src/lib/content/platform-home.ts`

until the fundraiser route exists and is live.

## Build order
1. Build `src/routes/c/[slug]/+page.svelte`
2. Compress `src/routes/(platform)/platform/+page.svelte`
3. Polish pricing/onboarding/dashboard after that

## Product truth
- homepage sells the platform
- campaign sells the fundraiser
- homepage must be shorter than campaign
- campaign is the flagship money page
