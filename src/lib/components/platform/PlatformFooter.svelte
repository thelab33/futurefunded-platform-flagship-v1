<script lang="ts">
  type Brand = { name: string; subline?: string };
  type Link = { label: string; href: string };

  type Props = {
    brand: Brand;
    links?: Link[];
  };

  let {
    brand,
    links = []
  }: Props = $props();
</script>

<footer class="px-4 pb-8 pt-6 sm:px-6 lg:px-8">
  <div class="mx-auto max-w-7xl border-t border-white/8 pt-6">
    <div class="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

      <!-- brand -->
      <div class="max-w-xl">
        <p class="m-0 text-sm font-bold tracking-[-0.02em] text-white">
          {brand.name}
        </p>

        {#if brand.subline}
          <p class="mt-2 mb-0 text-[13px] leading-6 text-white/48">
            {brand.subline}
          </p>
        {/if}
      </div>

      <!-- links -->
      <nav class="flex flex-wrap gap-x-4 gap-y-2" aria-label="Footer">
        {#each links as link}
          <a
            href={link.href}
            class="text-[13px] font-medium text-white/56 no-underline transition hover:text-white"
          >
            {link.label}
          </a>
        {/each}
      </nav>
    </div>
  </div>
</footer>
