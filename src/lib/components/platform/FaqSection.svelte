<script lang="ts">
  import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
  export let id = 'faq';
  export let eyebrow = '';
  export let title = '';
  export let lead = '';
  export let items: { q: string; a: string }[] = [];
</script>

<section {id} class="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
  <div class="mx-auto max-w-5xl">
    <SectionHeading {eyebrow} {title} {lead} align="center" />
    <div class="mt-8 space-y-3">
      {#each items as item}
        <details class="rounded-[24px] border border-white/10 bg-white/[0.03] p-5 backdrop-blur">
          <summary class="cursor-pointer list-none text-lg font-semibold tracking-[-0.02em] text-white">
            {item.q}
          </summary>
          <p class="mt-3 text-sm leading-7 text-white/72">{item.a}</p>
        </details>
      {/each}
    </div>
  </div>
</section>
