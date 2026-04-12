<script lang="ts">
  import SectionHeading from '$lib/components/ui/SectionHeading.svelte';

  type FeaturedBand = {
    kicker: string;
    title: string;
    body: string;
  };

  type Tier = {
    label: string;
    priceLabel: string;
    body: string;
    perks: string[];
    tone?: string;
  };

  type Props = {
    id?: string;
    eyebrow?: string;
    title?: string;
    lead?: string;
    featuredBand: FeaturedBand;
    tiers?: Tier[];
  };

  let {
    id = 'sponsors',
    eyebrow = '',
    title = '',
    lead = '',
    featuredBand,
    tiers = []
  }: Props = $props();

  const toneClasses = (tone?: string) => {
    if (tone === 'featured') {
      return 'border-orange-300/22 bg-[linear-gradient(180deg,rgba(255,122,26,0.12),rgba(255,122,26,0.05))]';
    }
    if (tone === 'vip') {
      return 'border-white/14 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))]';
    }
    return 'border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02))]';
  };

  const toneBadge = (tone?: string) => {
    if (tone === 'featured') return 'Most popular';
    if (tone === 'vip') return 'Top tier';
    return 'Entry tier';
  };
</script>

<section {id} class="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
  <div class="mx-auto max-w-7xl">
    <SectionHeading {eyebrow} {title} {lead} />

    <div class="mt-8 overflow-hidden rounded-[34px] border border-orange-300/18 bg-[linear-gradient(180deg,rgba(255,122,26,0.12),rgba(255,122,26,0.04))] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:p-7">
      <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div class="max-w-3xl">
          <p class="m-0 text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-50/70">
            {featuredBand.kicker}
          </p>
          <h3 class="mt-3 mb-0 text-balance text-[clamp(1.9rem,3vw,3rem)] font-black leading-[0.98] tracking-[-0.05em] text-white">
            {featuredBand.title}
          </h3>
          <p class="mt-3 text-pretty text-sm leading-7 text-white/80 sm:text-base">
            {featuredBand.body}
          </p>
        </div>

        <div class="grid gap-3 sm:grid-cols-3 lg:min-w-[360px]">
          <div class="rounded-2xl border border-white/10 bg-black/10 px-4 py-3">
            <p class="m-0 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/42">Merchandising</p>
            <p class="mt-2 mb-0 text-base font-bold tracking-[-0.03em] text-white">Tiered</p>
          </div>
          <div class="rounded-2xl border border-white/10 bg-black/10 px-4 py-3">
            <p class="m-0 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/42">Visibility</p>
            <p class="mt-2 mb-0 text-base font-bold tracking-[-0.03em] text-white">Premium</p>
          </div>
          <div class="rounded-2xl border border-white/10 bg-black/10 px-4 py-3">
            <p class="m-0 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/42">Pitch fit</p>
            <p class="mt-2 mb-0 text-base font-bold tracking-[-0.03em] text-white">Business-ready</p>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 grid gap-4 xl:grid-cols-3">
      {#each tiers as tier, i}
        <article
          class={`group relative overflow-hidden rounded-[30px] border p-5 shadow-[0_20px_56px_rgba(0,0,0,0.22)] backdrop-blur-2xl transition duration-200 hover:-translate-y-0.5 ${toneClasses(tier.tone)} ${tier.tone === 'featured' ? 'xl:-translate-y-1' : ''}`}
        >
          <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.04),transparent_38%)]"></div>

          <div class="relative">
            <div class="flex items-start justify-between gap-3">
              <div>
                <p class="m-0 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/44">
                  {toneBadge(tier.tone)}
                </p>
                <h3 class="mt-3 mb-0 text-[1.35rem] font-extrabold tracking-[-0.035em] text-white">
                  {tier.label}
                </h3>
              </div>

              <span class="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-semibold text-white/82">
                {tier.priceLabel}
              </span>
            </div>

            <p class="mt-4 text-sm leading-7 text-white/74">
              {tier.body}
            </p>

            <div class="mt-5 rounded-[24px] border border-white/8 bg-black/12 p-4">
              <div class="flex items-center justify-between gap-3 border-b border-white/8 pb-3">
                <p class="m-0 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/44">
                  Included perks
                </p>
                <span class="rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/44">
                  Sponsor lane
                </span>
              </div>

              <ul class="mt-4 space-y-3 p-0">
                {#each tier.perks as perk}
                  <li class="flex items-center gap-3 list-none rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-white/78">
                    <span class="h-2 w-2 rounded-full bg-white/70"></span>
                    <span>{perk}</span>
                  </li>
                {/each}
              </ul>
            </div>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>\n