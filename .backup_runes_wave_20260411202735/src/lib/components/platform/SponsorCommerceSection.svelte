<script lang="ts">
  import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
  export let id = 'sponsors';
  export let eyebrow = '';
  export let title = '';
  export let lead = '';
  export let featuredBand: { kicker: string; title: string; body: string };
  export let tiers: {
    label: string;
    priceLabel: string;
    body: string;
    perks: string[];
    tone?: string;
  }[] = [];
</script>

<section {id} class="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
  <div class="mx-auto max-w-7xl">
    <SectionHeading {eyebrow} {title} {lead} />

    <div class="mt-8 rounded-[30px] border border-orange-300/20 bg-orange-300/8 p-6">
      <p class="m-0 text-xs font-semibold uppercase tracking-[0.2em] text-orange-100/72">{featuredBand.kicker}</p>
      <h3 class="mt-3 mb-0 text-2xl font-extrabold tracking-[-0.03em] text-white">{featuredBand.title}</h3>
      <p class="mt-3 max-w-3xl text-sm leading-7 text-white/78">{featuredBand.body}</p>
    </div>

    <div class="mt-6 grid gap-4 xl:grid-cols-3">
      {#each tiers as tier}
        <article class="rounded-[28px] border border-white/10 bg-white/[0.03] p-5 backdrop-blur">
          <div class="flex items-center justify-between gap-3">
            <h3 class="m-0 text-xl font-extrabold tracking-[-0.03em] text-white">{tier.label}</h3>
            <span class="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-white/78">
              {tier.priceLabel}
            </span>
          </div>
          <p class="mt-3 text-sm leading-7 text-white/72">{tier.body}</p>
          <ul class="mt-4 space-y-2 p-0">
            {#each tier.perks as perk}
              <li class="list-none rounded-2xl border border-white/8 bg-black/10 px-4 py-3 text-sm text-white/76">
                {perk}
              </li>
            {/each}
          </ul>
        </article>
      {/each}
    </div>
  </div>
</section>
