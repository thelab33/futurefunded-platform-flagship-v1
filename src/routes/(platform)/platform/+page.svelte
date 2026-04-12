<script lang="ts">
  import PlatformTopBar from '$lib/components/platform/PlatformTopBar.svelte';
  import PlatformHero from '$lib/components/platform/PlatformHero.svelte';
  import HowItWorksSection from '$lib/components/platform/HowItWorksSection.svelte';
  import RevenueLanesSection from '$lib/components/platform/RevenueLanesSection.svelte';
  import UseCasesSection from '$lib/components/platform/UseCasesSection.svelte';
  import ProductPreviewSection from '$lib/components/platform/ProductPreviewSection.svelte';
  import SponsorCommerceSection from '$lib/components/platform/SponsorCommerceSection.svelte';
  import BrandControlSection from '$lib/components/platform/BrandControlSection.svelte';
  import FaqSection from '$lib/components/platform/FaqSection.svelte';
  import CloseBand from '$lib/components/platform/CloseBand.svelte';
  import PlatformFooter from '$lib/components/platform/PlatformFooter.svelte';
  import ProofStrip from '$lib/components/ui/ProofStrip.svelte';

  import {
    platformSeo,
    platformTopBar,
    platformHero,
    platformProofStrip,
    platformHowItWorks,
    platformRevenueLanes,
    platformUseCases,
    platformProductPreview,
    platformSponsorCommerce,
    platformBrandControl,
    platformFaq,
    platformCloseBand,
    platformFooter
  } from '$lib/content/platform-home';
</script>

<svelte:head>
  <title>{platformSeo.title}</title>
  <meta name="description" content={platformSeo.description} />
</svelte:head>

<main
  id="main"
  class="min-h-screen bg-[radial-gradient(circle_at_top,rgba(255,122,26,0.14),transparent_28%),linear-gradient(180deg,#031022_0%,#061a31_100%)] text-white"
  data-ff-template="platform"
  data-ff-page="home"
>
  <PlatformTopBar
    brand={platformTopBar.brand}
    nav={platformTopBar.nav}
    secondaryCta={platformTopBar.ctas.secondary}
    primaryCta={platformTopBar.ctas.primary}
  />

  <PlatformHero
    eyebrow={platformHero.eyebrow}
    title={platformHero.title}
    body={platformHero.body}
    primaryCta={platformHero.primaryCta}
    secondaryCta={platformHero.secondaryCta}
    trustPills={platformHero.trustPills}
    railCards={platformHero.railCards}
  />

  <section class="px-4 py-4 sm:px-6 lg:px-8" id="proof" aria-labelledby="platformProofTitle">
    <div class="mx-auto max-w-7xl">
      <ProofStrip id="platformProofTitle" title={platformProofStrip.title} items={platformProofStrip.items} />
    </div>
  </section>

  <HowItWorksSection
    id="how-it-works"
    eyebrow={platformHowItWorks.eyebrow}
    title={platformHowItWorks.title}
    lead={platformHowItWorks.lead}
    steps={platformHowItWorks.steps}
  />

  <RevenueLanesSection
    id="revenue"
    eyebrow={platformRevenueLanes.eyebrow}
    title={platformRevenueLanes.title}
    lead={platformRevenueLanes.lead}
    items={platformRevenueLanes.items}
  />

  <UseCasesSection
    id="use-cases"
    eyebrow={platformUseCases.eyebrow}
    title={platformUseCases.title}
    lead={platformUseCases.lead}
    items={platformUseCases.items}
  />

  <ProductPreviewSection
    id="product-preview"
    eyebrow={platformProductPreview.eyebrow}
    title={platformProductPreview.title}
    lead={platformProductPreview.lead}
    items={platformProductPreview.items}
  />

  <SponsorCommerceSection
    id="sponsors"
    eyebrow={platformSponsorCommerce.eyebrow}
    title={platformSponsorCommerce.title}
    lead={platformSponsorCommerce.lead}
    featuredBand={platformSponsorCommerce.featuredBand}
    tiers={platformSponsorCommerce.tiers}
  />

  <BrandControlSection
    id="brand-control"
    eyebrow={platformBrandControl.eyebrow}
    title={platformBrandControl.title}
    lead={platformBrandControl.lead}
    items={platformBrandControl.items}
  />

  <FaqSection
    id="faq"
    eyebrow={platformFaq.eyebrow}
    title={platformFaq.title}
    lead={platformFaq.lead}
    items={platformFaq.items}
  />

  <CloseBand
    id="launch"
    eyebrow={platformCloseBand.eyebrow}
    title={platformCloseBand.title}
    body={platformCloseBand.body}
    primaryCta={platformCloseBand.primaryCta}
    secondaryCta={platformCloseBand.secondaryCta}
  />

  <PlatformFooter brand={platformFooter.brand} links={platformFooter.links} />
</main>
