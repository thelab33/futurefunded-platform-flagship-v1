<script lang="ts">
  import SectionHeading from '$lib/components/ui/SectionHeading.svelte';

  type Item = {
    title: string;
    body: string;
    pills?: string[];
    featured?: boolean;
  };

  type Props = {
    id?: string;
    eyebrow?: string;
    title?: string;
    lead?: string;
    items?: Item[];
  };

  let {
    id = 'revenue',
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

    <!-- grid -->
    <div class="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {#each items as item}
        <article
          class={`relative overflow-hidden rounded-[22px] border p-4 backdrop-blur-xl transition duration-200 hover:border-white/14 ${
            item.featured
              ? 'border-orange-300/20 bg-[linear-gradient(180deg,rgba(255,122,26,0.10),rgba(255,122,26,0.04))] xl:col-span-2'
              : 'border-white/8 bg-white/[0.025]'
          }`}
        >
          <div class="relative">

            <!-- header -->
            <div class="flex items-start justify-between gap-2">
              <h3 class="m-0 text-[1rem] font-bold tracking-[-0.02em] text-white">
                {item.title}
              </h3>

              {#if item.featured}
                <span class="rounded-full border border-orange-200/20 bg-orange-200/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-orange-100">
                  Featured
                </span>
              {/if}
            </div>

            <!-- body -->
            <p class="mt-2 text-[13px] leading-6 text-white/68">
              {item.body}
            </p>

            <!-- pills -->
            {#if item.pills?.length}
              <div class="mt-3 flex flex-wrap gap-1.5">
                {#each item.pills as pill}
                  <span class="rounded-full border border-white/8 bg-black/10 px-2.5 py-1 text-[11px] text-white/70">
                    {pill}
                  </span>
                {/each}
              </div>
            {/if}

          </div>
        </article>
      {/each}
    </div>
  </div>
</section>
