<script lang="ts">
  type CTA = { label: string; href: string };

  type Props = {
    id?: string;
    eyebrow?: string;
    title?: string;
    body?: string;
    primaryCta: CTA;
    secondaryCta: CTA;
  };

  let {
    id = 'launch',
    eyebrow = '',
    title = '',
    body = '',
    primaryCta,
    secondaryCta
  }: Props = $props();
</script>

<section {id} class="px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
  <div class="mx-auto max-w-5xl">
    <div class="relative overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.025))] p-6 text-center shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur-2xl sm:p-8">

      <!-- subtle glow -->
      <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,122,26,0.18),transparent_40%)]"></div>

      <div class="relative">
        <p class="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/46">
          {eyebrow}
        </p>

        <h2 class="m-0 text-[clamp(1.9rem,3.5vw,2.6rem)] font-black tracking-[-0.04em] text-white">
          {title}
        </h2>

        <p class="mx-auto mt-3 max-w-xl text-[14px] leading-6 text-white/68 sm:text-[15px]">
          {body}
        </p>

        <!-- CTAs -->
        <div class="mt-5 flex flex-wrap items-center justify-center gap-2.5">
          <a
            href={primaryCta.href}
            class="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-[13px] font-semibold text-slate-950 no-underline transition hover:-translate-y-[1px] hover:shadow-[0_10px_28px_rgba(255,255,255,0.18)]"
          >
            {primaryCta.label}
          </a>

          <a
            href={secondaryCta.href}
            class="inline-flex items-center justify-center rounded-full border border-white/12 px-5 py-2.5 text-[13px] font-semibold text-white no-underline transition hover:border-white/20 hover:bg-white/[0.04]"
          >
            {secondaryCta.label}
          </a>
        </div>

        <!-- trust micro-line -->
        <p class="mt-4 text-[11px] text-white/38">
          No setup friction • Launch in minutes • Sponsor-ready out of the box
        </p>
      </div>
    </div>
  </div>
</section>
