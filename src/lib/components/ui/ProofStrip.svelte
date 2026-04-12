<script lang="ts">
  export let title = '';
  export let items: { label: string }[] = [];
  export let id: string | undefined = undefined;
</script>

<div class="rounded-[28px] border border-white/10 bg-white/[0.03] p-5 backdrop-blur">
  <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
    <h2 id={id} class="m-0 max-w-2xl text-lg font-bold tracking-[-0.03em] text-white">
      {title}
    </h2>

    <div class="flex flex-wrap gap-2">
      {#each items as item}
        <span class="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-white/78">
          {item.label}
        </span>
      {/each}
    </div>
  </div>
</div>
