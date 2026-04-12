<script lang="ts">
  type CTA = { label: string; href: string };
  type RailCard = { title: string; items: string[]; tone?: string };

  type Props = {
    eyebrow?: string;
    title?: string;
    body?: string;
    primaryCta: CTA;
    secondaryCta: CTA;
    trustPills?: string[];
    railCards?: RailCard[];
  };

  let {
    eyebrow = '',
    title = '',
    body = '',
    primaryCta,
    secondaryCta,
    trustPills = [],
    railCards = []
  }: Props = $props();
</script>

<section class="px-4 pb-10 pt-8 sm:px-6 sm:pt-12 lg:px-8 lg:pb-16">
  <div class="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,410px)] lg:gap-8">
    <div class="relative overflow-hidden rounded-[36px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.025))] p-6 shadow-[0_32px_100px_rgba(0,0,0,0.30)] backdrop-blur-2xl sm:p-8 lg:p-10">
      <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,122,26,0.16),transparent_32%)]"></div>

      <div class="relative">
        <div class="mb-4 inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/62">
          {eyebrow}
        </div>

        <h1 class="m-0 max-w-4xl text-balance text-[clamp(2.8rem,6vw,5.8rem)] font-black leading-[0.93] tracking-[-0.072em] text-white">
          {title}
        </h1>

        <p class="mt-5 max-w-2xl text-pretty text-base leading-7 text-white/72 sm:text-lg">
          {body}
        </p>

        <div class="mt-7 flex flex-wrap gap-3">
          <a
            href={primaryCta.href}
            class="inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 no-underline shadow-[0_14px_34px_rgba(255,255,255,0.12)] transition duration-200 hover:-translate-y-px"
          >
            {primaryCta.label}
          </a>

          <a
            href={secondaryCta.href}
            class="inline-flex rounded-full border border-white/12 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white no-underline transition duration-200 hover:border-white/18 hover:bg-white/[0.06]"
          >
            {secondaryCta.label}
          </a>
        </div>

        <div class="mt-6 flex flex-wrap gap-2">
          {#each trustPills as pill}
            <span class="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-white/76">
              {pill}
            </span>
          {/each}
        </div>

        <div class="mt-8 grid gap-3 sm:grid-cols-3">
          <div class="rounded-2xl border border-white/8 bg-black/10 px-4 py-4">
            <p class="m-0 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/44">Launch</p>
            <p class="mt-2 mb-0 text-lg font-bold tracking-[-0.03em] text-white">Fast</p>
          </div>
          <div class="rounded-2xl border border-white/8 bg-black/10 px-4 py-4">
            <p class="m-0 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/44">Surface</p>
            <p class="mt-2 mb-0 text-lg font-bold tracking-[-0.03em] text-white">Premium</p>
          </div>
          <div class="rounded-2xl border border-white/8 bg-black/10 px-4 py-4">
            <p class="m-0 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/44">Trust</p>
            <p class="mt-2 mb-0 text-lg font-bold tracking-[-0.03em] text-white">Mobile-first</p>
          </div>
        </div>
      </div>
    </div>

    <aside class="space-y-4">
      {#each railCards as card}
        <div class="rounded-[28px] border border-white/10 bg-white/[0.045] p-5 shadow-[0_20px_52px_rgba(0,0,0,0.24)] backdrop-blur-2xl">
          <div class="flex items-center justify-between gap-3">
            <p class="m-0 text-sm font-bold tracking-[-0.02em] text-white">{card.title}</p>
            <span class="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/58">
              Live
            </span>
          </div>

          <ul class="mt-4 space-y-3 p-0">
            {#each card.items as item}
              <li class="flex items-center gap-3 list-none rounded-2xl border border-white/8 bg-black/10 px-4 py-3 text-sm text-white/76">
                <span class="h-2 w-2 rounded-full bg-white/70"></span>
                <span>{item}</span>
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </aside>
  </div>
</section>
