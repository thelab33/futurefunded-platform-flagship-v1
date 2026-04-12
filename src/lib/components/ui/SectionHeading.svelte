<script lang="ts">
  type Props = {
    eyebrow?: string;
    title?: string;
    lead?: string;
    align?: 'left' | 'center';
  };

  let {
    eyebrow = '',
    title = '',
    lead = '',
    align = 'left'
  }: Props = $props();
</script>

<div class={`mx-auto max-w-2xl ${align === 'center' ? 'text-center' : ''}`}>
  {#if eyebrow}
    <p class="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/48 sm:text-[11px]">
      {eyebrow}
    </p>
  {/if}

  <h2 class="m-0 text-balance text-[clamp(1.7rem,3.4vw,2.6rem)] font-black leading-[1.02] tracking-[-0.045em] text-white">
    {title}
  </h2>

  {#if lead}
    <p class="mt-3 text-pretty text-[14px] leading-6 text-white/66 sm:text-[15px]">
      {lead}
    </p>
  {/if}
</div>
