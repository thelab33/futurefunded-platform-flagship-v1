<script lang="ts">
  import SectionHeading from '$lib/components/ui/SectionHeading.svelte';

  type Item = { q: string; a: string };
  type Props = {
    id?: string;
    eyebrow?: string;
    title?: string;
    lead?: string;
    items?: Item[];
  };

  let {
    id = 'faq',
    eyebrow = '',
    title = '',
    lead = '',
    items = []
  }: Props = $props();
</script>

<section {id} class="px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
  <div class="mx-auto max-w-3xl">
    <SectionHeading {eyebrow} {title} {lead} align="center" />

    <!-- 👇 tighter stack, less vertical fatigue -->
    <div class="mt-6 space-y-2">
      {#each items.slice(0, 5) as item}
        <details
          class="group rounded-[18px] border border-white/8 bg-white/[0.02] px-4 py-3 backdrop-blur-xl transition hover:border-white/14"
        >
          <summary class="flex cursor-pointer list-none items-center justify-between gap-3 text-[0.95rem] font-semibold tracking-[-0.01em] text-white">
            {item.q}

            <!-- subtle affordance -->
            <span class="text-white/40 transition group-open:rotate-45">
              +
            </span>
          </summary>

          <p class="mt-2 text-[13px] leading-6 text-white/68">
            {item.a}
          </p>
        </details>
      {/each}
    </div>

    <!-- 👇 soft cap to prevent scroll fatigue -->
    {#if items.length > 5}
      <p class="mt-4 text-center text-xs text-white/40">
        More answers available after launch setup.
      </p>
    {/if}
  </div>
</section>
