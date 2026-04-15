<script lang="ts">
  import { demoJourney, marketingHero, marketingLinks, pricingCards, sponsorCards } from '$lib/content/offer-presenters';
</script>

<svelte:head>
  <title>FutureFunded Demo</title>
</svelte:head>

<main class="min-h-screen bg-[#061425] px-6 py-16 text-white">
  <div class="mx-auto max-w-6xl space-y-8">
    <section class="rounded-[28px] border border-white/10 bg-white/[0.03] p-8">
      <p class="text-xs font-semibold uppercase tracking-[0.24em] text-white/56">Demo</p>
      <h1 class="mt-3 text-4xl font-black tracking-[-0.05em]">{marketingHero.title}</h1>
      <p class="mt-4 max-w-3xl text-white/72">{marketingHero.subtitle}</p>
      <div class="mt-6 flex flex-wrap gap-3">
        <a href={marketingLinks.fundraiser} class="inline-flex rounded-full border border-white/12 bg-white/10 px-5 py-3 text-sm font-semibold text-white">
          View live fundraiser
        </a>
        <a href={marketingLinks.onboarding} class="inline-flex rounded-full border border-white/12 bg-transparent px-5 py-3 text-sm font-semibold text-white/80">
          Start guided launch
        </a>
      </div>
    </section>

    <section class="grid gap-4 lg:grid-cols-4">
      {#each demoJourney as step}
        <article class="rounded-[24px] border border-white/10 bg-white/[0.03] p-6">
          <p class="text-xs font-semibold uppercase tracking-[0.24em] text-white/50">{step.step}</p>
          <h2 class="mt-3 text-xl font-black">{step.title}</h2>
          <p class="mt-3 text-sm text-white/72">{step.body}</p>
        </article>
      {/each}
    </section>

    <section class="grid gap-6 lg:grid-cols-2">
      <article class="rounded-[28px] border border-white/10 bg-white/[0.03] p-8">
        <p class="text-xs font-semibold uppercase tracking-[0.24em] text-white/56">Plans</p>
        <div class="mt-6 space-y-4">
          {#each pricingCards as card}
            <div class="rounded-[22px] border border-white/10 bg-black/10 p-5">
              <div class="flex items-end justify-between gap-4">
                <h3 class="text-xl font-black">{card.name}</h3>
                <p class="text-xl font-black">{card.price}</p>
              </div>
              <p class="mt-3 text-sm text-white/72">{card.summary}</p>
            </div>
          {/each}
        </div>
      </article>

      <article class="rounded-[28px] border border-white/10 bg-white/[0.03] p-8">
        <p class="text-xs font-semibold uppercase tracking-[0.24em] text-white/56">Sponsor offers</p>
        <div class="mt-6 space-y-4">
          {#each sponsorCards as tier}
            <div class="rounded-[22px] border border-white/10 bg-black/10 p-5">
              <div class="flex items-end justify-between gap-4">
                <h3 class="text-xl font-black">{tier.name}</h3>
                <p class="text-xl font-black">{tier.amount}</p>
              </div>
              <p class="mt-3 text-sm text-white/72">{tier.summary}</p>
            </div>
          {/each}
        </div>
      </article>
    </section>
  </div>
</main>
