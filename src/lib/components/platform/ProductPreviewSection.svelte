<script lang="ts">
  import SectionHeading from '$lib/components/ui/SectionHeading.svelte';

  type Stat = { label: string; value: string };
  type Item = { label: string; title: string; body: string; stats?: Stat[] };

  type Props = {
    id?: string;
    eyebrow?: string;
    title?: string;
    lead?: string;
    items?: Item[];
  };

  let {
    id = 'product-preview',
    eyebrow = '',
    title = '',
    lead = '',
    items = []
  }: Props = $props();
</script>

<section {id} class="px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
  <div class="mx-auto max-w-7xl">

    <!-- tighter heading -->
    <div class="max-w-2xl">
      <SectionHeading {eyebrow} {title} {lead} />
    </div>

    <!-- tighter preview grid -->
    <div class="mt-6 grid gap-3 xl:grid-cols-3">
      {#each items as item, i}
        <article
          class={`group relative overflow-hidden rounded-[24px] border border-white/8 bg-white/[0.025] p-4 backdrop-blur-xl transition duration-200 hover:border-white/14 ${
            i === 1 ? 'xl:-translate-y-0.5' : ''
          }`}
        >
          <div class="relative">
            <!-- compact header -->
            <div class="flex items-center justify-between gap-2">
              <span class="rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/50">
                {item.label}
              </span>

              <span class="rounded-full border border-white/8 bg-black/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/40">
                Preview
              </span>
            </div>

            <!-- title -->
            <h3 class="mt-3 text-[1.1rem] font-bold leading-tight tracking-[-0.02em] text-white">
              {item.title}
            </h3>

            <!-- body -->
            <p class="mt-2 text-[13px] leading-6 text-white/68">
              {item.body}
            </p>

            <!-- preview surface -->
            <div class="mt-4 rounded-[18px] border border-white/8 bg-black/12 p-3">
              <div class="flex items-center justify-between gap-2 border-b border-white/8 pb-2.5">
                <div class="flex items-center gap-1.5">
                  <span class="h-2 w-2 rounded-full bg-white/40"></span>
                  <span class="h-2 w-2 rounded-full bg-white/18"></span>
                  <span class="h-2 w-2 rounded-full bg-white/18"></span>
                </div>

                <span class="rounded-full border border-white/8 bg-white/[0.03] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/42">
                  Surface
                </span>
              </div>

              {#if item.stats?.length}
                <div class="mt-3 space-y-2">
                  {#each item.stats as stat}
                    <div class="rounded-[14px] border border-white/8 bg-white/[0.02] px-3 py-2.5">
                      <p class="m-0 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/40">
                        {stat.label}
                      </p>
                      <p class="mt-1.5 mb-0 text-sm font-bold tracking-[-0.02em] text-white">
                        {stat.value}
                      </p>
                    </div>
                  {/each}
                </div>
              {/if}
            </div>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>
