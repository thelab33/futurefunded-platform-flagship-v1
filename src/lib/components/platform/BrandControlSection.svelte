<script lang="ts">
  import SectionHeading from '$lib/components/ui/SectionHeading.svelte';

  type Item = { title: string; body: string };
  type Props = {
    id?: string;
    eyebrow?: string;
    title?: string;
    lead?: string;
    items?: Item[];
  };

  let {
    id = 'brand-control',
    eyebrow = '',
    title = '',
    lead = '',
    items = []
  }: Props = $props();
</script>

<section {id} class="px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
  <div class="mx-auto max-w-7xl">
    <div class="max-w-2xl">
      <SectionHeading {eyebrow} {title} {lead} />
    </div>

    <div class="mt-6 grid gap-3 md:grid-cols-3">
      {#each items as item}
        <article class="rounded-[22px] border border-white/8 bg-white/[0.025] p-4 backdrop-blur-xl">
          <h3 class="m-0 text-[1rem] font-bold tracking-[-0.02em] text-white">
            {item.title}
          </h3>
          <p class="mt-2 text-[13px] leading-6 text-white/68">
            {item.body}
          </p>
        </article>
      {/each}
    </div>
  </div>
</section>
