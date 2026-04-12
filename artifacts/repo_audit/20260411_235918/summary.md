# FutureFunded Surface Map

Generated: 20260411_235918

## Counts
- Route files: 8
- Platform components: 12
- UI components: 4
- Content files: 5
- Style files: 4
- Backup/drift files: 19
- Possible corruption hits: 0

## Key takeaways
- Route owners live under `src/routes/`
- Platform sections live under `src/lib/components/platform/`
- UI primitives live under `src/lib/components/ui/`
- Content ownership lives under `src/lib/content/`
- Style ownership lives under `src/lib/styles/`
- Backup siblings inside `src/` are drift risk and should be moved out of live paths

## Primary route owners
- src/routes/+layout.svelte
- src/routes/+page.server.ts
- src/routes/(platform)/+layout.svelte
- src/routes/(platform)/platform/dashboard/+page.svelte
- src/routes/(platform)/platform/demo/+page.svelte
- src/routes/(platform)/platform/onboarding/+page.svelte
- src/routes/(platform)/platform/+page.svelte
- src/routes/(platform)/platform/pricing/+page.svelte

## Primary platform section owners
- src/lib/components/platform/BrandControlSection.svelte
- src/lib/components/platform/CloseBand.svelte
- src/lib/components/platform/FaqSection.svelte
- src/lib/components/platform/HowItWorksSection.svelte
- src/lib/components/platform/PlatformChrome.svelte
- src/lib/components/platform/PlatformFooter.svelte
- src/lib/components/platform/PlatformHero.svelte
- src/lib/components/platform/PlatformTopBar.svelte
- src/lib/components/platform/ProductPreviewSection.svelte
- src/lib/components/platform/RevenueLanesSection.svelte
- src/lib/components/platform/SponsorCommerceSection.svelte
- src/lib/components/platform/UseCasesSection.svelte

## Primary UI primitive owners
- src/lib/components/ui/Button.svelte
- src/lib/components/ui/Card.svelte
- src/lib/components/ui/ProofStrip.svelte
- src/lib/components/ui/SectionHeading.svelte

## Content owners
- src/lib/content/platform-home.ts
- src/lib/content/platform-home.ts.bak.20260411203821
- src/lib/content/platform-home.ts.bak.20260411204042
- src/lib/content/platform-home.ts.bak.20260411211309
- src/lib/content/platform-home.ts.bak.fixdup.20260411234633

## Style owners
- src/lib/styles/app.css
- src/lib/styles/flagship.css
- src/lib/styles/flagship.css.bak.20260411234248
- src/lib/styles/tokens.css

## Backup / drift files
- src/lib/components/platform/HowItWorksSection.svelte.bak.20260411204525
- src/lib/components/platform/PlatformHero.svelte.bak.20260411203821
- src/lib/components/platform/PlatformTopBar.svelte.bak.20260411203821
- src/lib/components/platform/ProductPreviewSection.svelte.bak.20260411211309
- src/lib/components/platform/RevenueLanesSection.svelte.bak.20260411204525
- src/lib/components/platform/SponsorCommerceSection.svelte.bak.20260411211918
- src/lib/components/platform/UseCasesSection.svelte.bak.20260411211918
- src/lib/components/ui/ProofStrip.svelte.bak.20260411204525
- src/lib/components/ui/SectionHeading.svelte.bak.20260411234248
- src/lib/content/platform-home.ts.bak.20260411203821
- src/lib/content/platform-home.ts.bak.20260411204042
- src/lib/content/platform-home.ts.bak.20260411211309
- src/lib/content/platform-home.ts.bak.fixdup.20260411234633
- src/lib/styles/flagship.css.bak.20260411234248
- src/routes/+layout.svelte.bak.20260411203242
- src/routes/+layout.svelte.bak.20260411205845
- src/routes/(platform)/+layout.svelte.bak.20260411203242
- src/routes/(platform)/platform/+page.svelte.bak.20260411213226
- src/routes/(platform)/platform/+page.svelte.bak.20260411234248

## Route import graph
=== src/routes/(platform)/platform/+page.svelte ===
2:  import PlatformTopBar from '$lib/components/platform/PlatformTopBar.svelte';
3:  import PlatformHero from '$lib/components/platform/PlatformHero.svelte';
4:  import HowItWorksSection from '$lib/components/platform/HowItWorksSection.svelte';
5:  import RevenueLanesSection from '$lib/components/platform/RevenueLanesSection.svelte';
6:  import UseCasesSection from '$lib/components/platform/UseCasesSection.svelte';
7:  import ProductPreviewSection from '$lib/components/platform/ProductPreviewSection.svelte';
8:  import SponsorCommerceSection from '$lib/components/platform/SponsorCommerceSection.svelte';
9:  import BrandControlSection from '$lib/components/platform/BrandControlSection.svelte';
10:  import FaqSection from '$lib/components/platform/FaqSection.svelte';
11:  import CloseBand from '$lib/components/platform/CloseBand.svelte';
12:  import PlatformFooter from '$lib/components/platform/PlatformFooter.svelte';
13:  import ProofStrip from '$lib/components/ui/ProofStrip.svelte';
29:  } from '$lib/content/platform-home';

=== src/routes/(platform)/platform/dashboard/+page.svelte ===

=== src/routes/(platform)/platform/demo/+page.svelte ===

=== src/routes/(platform)/platform/onboarding/+page.svelte ===

=== src/routes/(platform)/platform/pricing/+page.svelte ===


## Content references
src/routes/(platform)/platform/+page.svelte:29:  } from '$lib/content/platform-home';
src/routes/(platform)/platform/+page.svelte.bak.20260411234248:29:  } from '$lib/content/platform-home';

## Style references
src/routes/+layout.svelte:2:  import '$lib/styles/flagship.css';
src/routes/+layout.svelte.bak.20260411203242:2:  import '$lib/styles/tokens.css';
src/routes/+layout.svelte.bak.20260411203242:3:  import '$lib/styles/app.css';
src/routes/+layout.svelte.bak.20260411205845:2:  import '$lib/styles/tokens.css';
src/routes/+layout.svelte.bak.20260411205845:3:  import '$lib/styles/app.css';
src/lib/styles/app.css:1:@import './tokens.css';

## Possible live-file corruption markers
none
