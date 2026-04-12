<script lang="ts">
  export let eyebrow = '';
  export let title = '';
  export let lead = '';
  export let align: 'left' | 'center' = 'left';
</script>

<div class={`mx-auto max-w-3xl ${align === 'center' ? 'text-center' : ''}`}>
  {#if eyebrow}
    <p class="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-white/60">{eyebrow}</p>
  {/if}
  <h2 class="m-0 text-balance text-[clamp(2rem,4vw,3.5rem)] font-black tracking-[-0.05em] text-white">
    {title}
  </h2>
  {#if lead}
    <p class="mt-4 text-pretty text-base leading-7 text-white/72 sm:text-lg">
      {lead}
    </p>
  {/if}
</div>
