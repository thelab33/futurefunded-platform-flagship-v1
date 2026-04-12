<script lang="ts">
  import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
  export let id = 'revenue';
  export let eyebrow = '';
  export let title = '';
  export let lead = '';
  export let items: { title: string; body: string; pills?: string[]; featured?: boolean }[] = [];
</script>

<section {id} class="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
  <div class="mx-auto max-w-7xl">
    <SectionHeading {eyebrow} {title} {lead} />
    <div class="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {#each items as item}
        <article class={`rounded-[28px] border p-5 backdrop-blur ${
          item.featured
            ? 'border-orange-400/25 bg-orange-400/8'
            : 'border-white/10 bg-white/[0.03]'
        }`}>
          <div class="flex items-start justify-between gap-3">
            <h3 class="m-0 text-xl font-extrabold tracking-[-0.03em] text-white">{item.title}</h3>
            {#if item.featured}
              <span class="rounded-full border border-orange-300/25 bg-orange-300/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-100">
                Featured
              </span>
            {/if}
          </div>
          <p class="mt-3 text-sm leading-7 text-white/72">{item.body}</p>
          {#if item.pills?.length}
            <div class="mt-4 flex flex-wrap gap-2">
              {#each item.pills as pill}
                <span class="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-white/78">
                  {pill}
                </span>
              {/each}
            </div>
          {/if}
        </article>
      {/each}
    </div>
  </div>
</section>
