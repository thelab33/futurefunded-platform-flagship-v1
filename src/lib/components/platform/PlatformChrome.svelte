<script lang="ts">
  import Button from '$lib/components/ui/Button.svelte';

  let {
    appName = 'FutureFunded',
    subline = 'Flagship fundraising system',
    currentPath = '/platform'
  }: {
    appName?: string;
    subline?: string;
    currentPath?: string;
  } = $props();

  function isHome() {
    return currentPath === '/platform';
  }

  function isDashboard() {
    return currentPath.startsWith('/platform/dashboard');
  }
</script>

<header class="ff-platformChrome">
  <div class="ff-container">
    <div class="ff-platformChrome__bar">
      <a class="ff-platformBrand" href="/platform" aria-label="FutureFunded home">
        <span class="ff-platformBrand__disc">FF</span>
        <span class="ff-platformBrand__wordmark">
          <strong>{appName}</strong>
          <span>{subline}</span>
        </span>
      </a>

      <div class="ff-platformChrome__actions">
        <Button href="/platform/dashboard" variant={isDashboard() ? 'secondary' : 'ghost'} size="md">
          {#snippet children()}Dashboard{/snippet}
        </Button>
        <Button href="/c/spring-fundraiser" variant="secondary" size="md">
          {#snippet children()}Live page{/snippet}
        </Button>
        <Button href="/platform" variant="primary" size="md">
          {#snippet children()}Launch{/snippet}
        </Button>
      </div>
    </div>

    <nav class="ff-platformSegment" aria-label="Platform sections">
      <a class:is-active={isHome()} href="/platform">Platform</a>
      <a class:is-active={isDashboard()} href="/platform/dashboard">Operator</a>
    </nav>
  </div>
</header>
