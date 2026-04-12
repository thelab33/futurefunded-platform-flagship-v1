<script lang="ts">
  import PlatformChrome from '$lib/components/platform/PlatformChrome.svelte';

  let { data, children } = $props();
</script>

<div
  class="ff-body ff-ui ff-theme"
  data-ff-app="futurefunded"
  data-ff-surface="platform"
>
  <a class="ff-skiplink" href="#main">Skip to content</a>
  <div class="ff-appShell">
    <PlatformChrome
      appName={data.platform.appName}
      subline="Flagship fundraising system"
      currentPath={data.platform.currentPath}
    />
    {@render children()}
  </div>
</div>
