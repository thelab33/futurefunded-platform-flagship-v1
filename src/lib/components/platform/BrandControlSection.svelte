<script lang="ts">
  import SectionHeading from '$lib/components/ui/SectionHeading.svelte';
  export let id = 'brand-control';
  export let eyebrow = '';
  export let title = '';
  export let lead = '';
  export let items: { title: string; body: string }[] = [];
</script>

<section {id} class="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
  <div class="mx-auto max-w-7xl">
    <SectionHeading {eyebrow} {title} {lead} />
    <div class="mt-8 grid gap-4 md:grid-cols-3">
      {#each items as item}
        <article class="rounded-[28px] border border-white/10 bg-white/[0.03] p-5 backdrop-blur">
          <h3 class="m-0 text-xl font-extrabold tracking-[-0.03em] text-white">{item.title}</h3>
          <p class="mt-3 text-sm leading-7 text-white/72">{item.body}</p>
        </article>
      {/each}
    </div>
  </div>
</section>
