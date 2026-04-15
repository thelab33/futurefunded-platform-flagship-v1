<script lang="ts">
  import { marketingHero, pricingCards, sponsorCards } from '$lib/content/offer-presenters';
</script>

<svelte:head>
  <title>FutureFunded Pricing</title>
</svelte:head>

<main class="min-h-screen bg-[#061425] px-6 py-16 text-white">
  <div class="mx-auto max-w-6xl space-y-8">
    <section class="rounded-[28px] border border-white/10 bg-white/[0.03] p-8">
      <p class="text-xs font-semibold uppercase tracking-[0.24em] text-white/56">Pricing</p>
      <h1 class="mt-3 text-4xl font-black tracking-[-0.05em]">{marketingHero.title}</h1>
      <p class="mt-4 max-w-3xl text-white/72">{marketingHero.subtitle}</p>
    </section>

    <section class="grid gap-6 lg:grid-cols-2">
      {#each pricingCards as card}
        <article class="rounded-[28px] border border-white/10 bg-white/[0.03] p-8">
          <p class="text-xs font-semibold uppercase tracking-[0.24em] text-white/56">{card.kicker}</p>
          <div class="mt-4 flex items-end justify-between gap-4">
            <div>
              <h2 class="text-2xl font-black tracking-[-0.04em]">{card.name}</h2>
              <p class="mt-2 text-3xl font-black">{card.price}</p>
            </div>
          </div>
          <p class="mt-4 text-white/72">{card.summary}</p>
          <ul class="mt-5 space-y-2 text-sm text-white/72">
            {#each card.bullets as bullet}
              <li>• {bullet}</li>
            {/each}
          </ul>
          <button type="button" class="mt-6 inline-flex rounded-full border border-white/12 bg-white/10 px-5 py-3 text-sm font-semibold text-white">
            {card.cta}
          </button>
        </article>
      {/each}
    </section>

    <section class="rounded-[28px] border border-white/10 bg-white/[0.03] p-8">
      <p class="text-xs font-semibold uppercase tracking-[0.24em] text-white/56">Sponsor ladder</p>
      <div class="mt-6 grid gap-4 lg:grid-cols-3">
        {#each sponsorCards as tier}
          <article class="rounded-[24px] border border-white/10 bg-black/10 p-6">
            <p class="text-xs font-semibold uppercase tracking-[0.22em] text-white/50">{tier.badge}</p>
            <h3 class="mt-3 text-xl font-black">{tier.name}</h3>
            <p class="mt-2 text-2xl font-black">{tier.amount}</p>
            <p class="mt-3 text-sm text-white/72">{tier.summary}</p>
          </article>
        {/each}
      </div>
    </section>
  </div>
</main>
