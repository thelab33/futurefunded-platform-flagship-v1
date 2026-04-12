<script lang="ts">
  import SectionHeading from '$lib/components/ui/SectionHeading.svelte';

  type Item = {
    title: string;
    body: string;
    meta: string;
  };

  type Props = {
    id?: string;
    eyebrow?: string;
    title?: string;
    lead?: string;
    items?: Item[];
  };

  let {
    id = 'use-cases',
    eyebrow = '',
    title = '',
    lead = '',
    items = []
  }: Props = $props();
</script>

<section {id} class="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
  <div class="mx-auto max-w-7xl">
    <SectionHeading {eyebrow} {title} {lead} />

    <div class="mt-8 grid gap-4 md:grid-cols-2">
      {#each items as item, i}
        <article
          class={`group relative overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02))] p-5 shadow-[0_20px_56px_rgba(0,0,0,0.22)] backdrop-blur-2xl transition duration-200 hover:-translate-y-0.5 hover:border-white/14 ${i % 2 === 1 ? 'xl:-translate-y-1' : ''}`}
        >
          <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.04),transparent_38%)]"></div>

          <div class="relative">
            <div class="flex items-start justify-between gap-3">
              <p class="m-0 max-w-[80%] text-[11px] font-semibold uppercase tracking-[0.18em] text-white/46">
                {item.meta}
              </p>

              <span class="rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/42">
                Use case
              </span>
            </div>

            <h3 class="mt-4 mb-0 text-[1.55rem] font-extrabold leading-[1.02] tracking-[-0.045em] text-white">
              {item.title}
            </h3>

            <p class="mt-4 text-sm leading-7 text-white/72">
              {item.body}
            </p>

            <div class="mt-5 rounded-[24px] border border-white/8 bg-black/12 px-4 py-4">
              <div class="flex items-center justify-between gap-3">
                <p class="m-0 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/42">
                  Best fit
                </p>
                <span class="rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/42">
                  Qualified
                </span>
              </div>

              <p class="mt-3 mb-0 text-sm text-white/66">
                Strong for organizations that need clean branding, trusted fundraising, and sponsor-ready presentation.
              </p>
            </div>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>\n