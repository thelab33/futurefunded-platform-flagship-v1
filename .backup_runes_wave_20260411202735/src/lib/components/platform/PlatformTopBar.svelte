<script lang="ts">
  export let brand: { name: string; subline?: string };
  export let nav: { label: string; href: string }[] = [];
  export let secondaryCta: { label: string; href: string };
  export let primaryCta: { label: string; href: string };
</script>

<header class="sticky top-0 z-40 border-b border-white/8 bg-[#04111f]/78 backdrop-blur">
  <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
    <a href="/platform" class="min-w-0 no-underline">
      <div class="flex items-center gap-3">
        <div class="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/[0.06] text-sm font-black tracking-[0.18em] text-white">
          FF
        </div>
        <div class="min-w-0">
          <p class="m-0 truncate text-sm font-bold text-white">{brand.name}</p>
          {#if brand.subline}
            <p class="m-0 truncate text-xs text-white/56">{brand.subline}</p>
          {/if}
        </div>
      </div>
    </a>

    <nav class="hidden items-center gap-6 lg:flex" aria-label="Platform">
      {#each nav as item}
        <a href={item.href} class="text-sm font-medium text-white/72 no-underline transition hover:text-white">
          {item.label}
        </a>
      {/each}
    </nav>

    <div class="flex items-center gap-2">
      <a
        href={secondaryCta.href}
        class="hidden rounded-full border border-white/12 px-4 py-2 text-sm font-semibold text-white/82 no-underline transition hover:border-white/18 hover:bg-white/[0.04] sm:inline-flex"
      >
        {secondaryCta.label}
      </a>
      <a
        href={primaryCta.href}
        class="inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 no-underline transition hover:-translate-y-px"
      >
        {primaryCta.label}
      </a>
    </div>
  </div>
</header>
