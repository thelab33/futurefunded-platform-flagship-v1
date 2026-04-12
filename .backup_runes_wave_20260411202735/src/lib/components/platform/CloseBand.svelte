<script lang="ts">
  export let id = 'launch';
  export let eyebrow = '';
  export let title = '';
  export let body = '';
  export let primaryCta: { label: string; href: string };
  export let secondaryCta: { label: string; href: string };
</script>

<section {id} class="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
  <div class="mx-auto max-w-7xl rounded-[34px] border border-white/10 bg-white/[0.04] p-6 text-center backdrop-blur sm:p-8 lg:p-10">
    <p class="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-white/56">{eyebrow}</p>
    <h2 class="m-0 text-balance text-[clamp(2rem,4vw,3.5rem)] font-black tracking-[-0.05em] text-white">
      {title}
    </h2>
    <p class="mx-auto mt-4 max-w-3xl text-pretty text-base leading-7 text-white/72 sm:text-lg">
      {body}
    </p>
    <div class="mt-6 flex flex-wrap items-center justify-center gap-3">
      <a href={primaryCta.href} class="inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 no-underline transition hover:-translate-y-px">
        {primaryCta.label}
      </a>
      <a href={secondaryCta.href} class="inline-flex rounded-full border border-white/12 px-5 py-3 text-sm font-semibold text-white no-underline transition hover:border-white/20 hover:bg-white/[0.04]">
        {secondaryCta.label}
      </a>
    </div>
  </div>
</section>
