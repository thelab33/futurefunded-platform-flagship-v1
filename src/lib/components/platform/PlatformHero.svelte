<script lang="ts">
  export let eyebrow = '';
  export let title = '';
  export let body = '';
  export let primaryCta: { label: string; href: string };
  export let secondaryCta: { label: string; href: string };
  export let trustPills: string[] = [];
  export let railCards: { title: string; items: string[]; tone?: string }[] = [];
</script>

<section class="px-4 pb-10 pt-10 sm:px-6 sm:pt-14 lg:px-8 lg:pb-16">
  <div class="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,420px)] lg:gap-8">
    <div class="rounded-[32px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur sm:p-8 lg:p-10">
      <p class="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-white/60">{eyebrow}</p>
      <h1 class="m-0 max-w-4xl text-balance text-[clamp(2.5rem,6vw,5.5rem)] font-black leading-[0.96] tracking-[-0.065em] text-white">
        {title}
      </h1>
      <p class="mt-5 max-w-3xl text-pretty text-base leading-7 text-white/74 sm:text-lg">
        {body}
      </p>

      <div class="mt-6 flex flex-wrap gap-3">
        <a href={primaryCta.href} class="inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 no-underline transition hover:-translate-y-px">
          {primaryCta.label}
        </a>
        <a href={secondaryCta.href} class="inline-flex rounded-full border border-white/12 px-5 py-3 text-sm font-semibold text-white no-underline transition hover:border-white/20 hover:bg-white/[0.04]">
          {secondaryCta.label}
        </a>
      </div>

      <div class="mt-6 flex flex-wrap gap-2">
        {#each trustPills as pill}
          <span class="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-white/78">
            {pill}
          </span>
        {/each}
      </div>
    </div>

    <aside class="space-y-4">
      {#each railCards as card}
        <div class="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur">
          <p class="m-0 text-sm font-bold tracking-[-0.02em] text-white">{card.title}</p>
          <ul class="mt-4 space-y-3 p-0">
            {#each card.items as item}
              <li class="list-none rounded-2xl border border-white/8 bg-black/10 px-4 py-3 text-sm text-white/76">
                {item}
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </aside>
  </div>
</section>
