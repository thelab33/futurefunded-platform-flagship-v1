<script lang="ts">
  type ProofItem = { label: string };

  type Props = {
    title?: string;
    items?: ProofItem[];
    id?: string;
  };

  let {
    title = '',
    items = [],
    id
  }: Props = $props();
</script>

<div class="rounded-[22px] border border-white/8 bg-white/[0.02] px-4 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.14)] backdrop-blur-xl sm:px-5 sm:py-3.5">
  <div class="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
    <div class="min-w-0 max-w-2xl">
      <h2
        id={id}
        class="m-0 text-sm font-semibold tracking-[-0.02em] text-white/88 sm:text-[0.95rem]"
      >
        {title}
      </h2>
    </div>

    <div class="flex flex-wrap gap-2">
      {#each items as item}
        <span class="rounded-full border border-white/8 bg-black/10 px-2.5 py-1.5 text-[11px] font-medium text-white/72">
          {item.label}
        </span>
      {/each}
    </div>
  </div>
</div>
