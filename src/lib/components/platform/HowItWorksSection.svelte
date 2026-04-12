<script lang="ts">
  import SectionHeading from '$lib/components/ui/SectionHeading.svelte';

  type Step = {
    step: string;
    title: string;
    body: string;
  };

  type Props = {
    id?: string;
    eyebrow?: string;
    title?: string;
    lead?: string;
    steps?: Step[];
  };

  let {
    id = 'how-it-works',
    eyebrow = '',
    title = '',
    lead = '',
    steps = []
  }: Props = $props();
</script>

<section {id} class="px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
  <div class="mx-auto max-w-7xl">

    <!-- tighter heading -->
    <div class="max-w-2xl">
      <SectionHeading {eyebrow} {title} {lead} />
    </div>

    <!-- unified shell (NOT 4 separate cards) -->
    <div class="mt-6 rounded-[26px] border border-white/10 bg-white/[0.035] p-3 sm:p-4 backdrop-blur-xl">

      <div class="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {#each steps as item, i}
          <div class="rounded-[20px] border border-white/8 bg-black/15 px-4 py-4 transition duration-200 hover:border-white/14">

            <!-- step label -->
            <div class="flex items-center justify-between">
              <span class="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45">
                Step {item.step}
              </span>
            </div>

            <!-- title -->
            <h3 class="mt-2 text-[1rem] font-bold tracking-[-0.02em] text-white">
              {item.title}
            </h3>

            <!-- body -->
            <p class="mt-2 text-[13px] leading-6 text-white/68">
              {item.body}
            </p>

          </div>
        {/each}
      </div>

    </div>
  </div>
</section>
