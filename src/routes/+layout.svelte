<script lang="ts">
  import '$lib/styles/tokens.css';
  import '$lib/styles/app.css';

  import { page } from '$app/state';

  let { children } = $props();
</script>

<svelte:head>
  <title>FutureFunded</title>
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <meta name="description" content="FutureFunded — premium fundraising platform for teams, schools, clubs, and nonprofits." />
  <meta name="theme-color" content="#031022" />
  <meta name="color-scheme" content="dark" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
</svelte:head>

<a class="ff-skiplink" href="#main">Skip to content</a>

<div
  class="ff-appShell"
  data-ff-app="futurefunded"
  data-ff-path={page.url.pathname}
>
  <div class="ff-appShell__content">
    {@render children()}
  </div>
</div>
