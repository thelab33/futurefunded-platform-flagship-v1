<script lang="ts">
  export let brand: { name: string; subline?: string };
  export let links: { label: string; href: string }[] = [];
</script>

<footer class="border-t border-white/8 px-4 py-8 sm:px-6 lg:px-8">
  <div class="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
    <div>
      <p class="m-0 text-sm font-bold text-white">{brand.name}</p>
      {#if brand.subline}
        <p class="mt-2 mb-0 max-w-xl text-sm leading-6 text-white/56">{brand.subline}</p>
      {/if}
    </div>

    <nav class="flex flex-wrap gap-4" aria-label="Footer">
      {#each links as link}
        <a href={link.href} class="text-sm font-medium text-white/68 no-underline transition hover:text-white">
          {link.label}
        </a>
      {/each}
    </nav>
  </div>
</footer>
