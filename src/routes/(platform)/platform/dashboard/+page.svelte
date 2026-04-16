<script lang="ts">
	import '$lib/styles/ff.css';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { mountFFPage, toggleFFTheme } from '$lib/utils/ff-theme';
	import { loadLaunchState, saveLaunchState, slugifyOrgName } from '$lib/config/ff-launch-state';

	type Metric = {
		label: string;
		value: string;
		note: string;
	};

	type ActionCard = {
		title: string;
		body: string;
		cta: string;
		action: () => void;
		primary?: boolean;
		accent?: boolean;
	};

	type Activity = {
		title: string;
		meta: string;
		body: string;
	};

	type DiagnosticTone = 'good' | 'warn' | 'muted';

	type Diagnostic = {
		label: string;
		value: string;
		tone?: DiagnosticTone;
		note?: string;
	};

	const launch = loadLaunchState();

	let drawerOpen = $state(false);
	let copyNotice = $state('');
	let theme = $state<'dark' | 'light'>('dark');

	let orgName = $state(launch.orgName);
	let fundraisingGoal = $state(launch.fundraisingGoal);
	let sponsorLane = $state(launch.sponsorLane);
	let recurringLane = $state(launch.recurringLane);
	let paymentsConnected = $state(launch.paymentsConnected);
	let dataMode = $state<'preview' | 'live'>(launch.dataMode);

	const raised = 5175;
	const donors = 73;
	const sponsorLeads = sponsorLane ? 6 : 0;

	const publicPath = $derived(`/c/${slugifyOrgName(orgName)}`);
	const publicUrl = $derived(
		browser ? `${window.location.origin}${publicPath}` : `https://getfuturefunded.com${publicPath}`
	);
	const goal = $derived(Number(fundraisingGoal || '0'));
	const progress = $derived(goal > 0 ? Math.min(100, Math.round((raised / goal) * 100)) : 0);
	const remaining = $derived(Math.max(0, goal - raised));
	const modeLabel = $derived(dataMode === 'preview' ? 'Preview mode' : 'Live mode');
	const readinessLabel = $derived(paymentsConnected ? 'Ready to launch' : 'Needs payment setup');

	const metrics = $derived<Metric[]>([
		{
			label: 'Raised',
			value: `$${raised.toLocaleString()}`,
			note: 'Momentum is already building.'
		},
		{
			label: 'Goal',
			value: `$${goal.toLocaleString()}`,
			note: 'Clear season target for launch.'
		},
		{
			label: 'Progress',
			value: `${progress}%`,
			note: remaining > 0 ? `$${remaining.toLocaleString()} still to raise.` : 'Goal reached.'
		},
		{
			label: 'Donors',
			value: `${donors}`,
			note: 'Community support is showing up.'
		}
	]);

	const actionCards = $derived<ActionCard[]>([
		{
			title: 'Open live preview',
			body: 'Open the public page and review exactly what supporters will see before you share it.',
			cta: 'View live fundraiser',
			action: () => goto(publicPath),
			primary: true,
			accent: true
		},
		{
			title: 'Return to setup',
			body: 'Tighten branding, story, payments, or sponsor setup before your first real push.',
			cta: 'Update setup',
			action: () => goto('/platform/onboarding')
		},
		{
			title: dataMode === 'preview' ? 'Publish setup' : 'Set back to preview',
			body:
				dataMode === 'preview'
					? 'Move from preview into live mode when the page and payments are fully ready.'
					: 'Drop back into preview mode when you need to refine the launch before sharing again.',
			cta: dataMode === 'preview' ? 'Go live' : 'Set preview',
			action: () => {
				dataMode = dataMode === 'preview' ? 'live' : 'preview';
			}
		}
	]);

	const diagnostics = $derived<Diagnostic[]>([
		{
			label: 'Workspace',
			value: dataMode === 'preview' ? 'Preview-ready' : 'Live workspace',
			tone: 'muted',
			note: 'Core layout, route, and launch copy are in place.'
		},
		{
			label: 'Launch mode',
			value: dataMode === 'preview' ? 'Preview-ready' : 'Live',
			tone: dataMode === 'preview' ? 'warn' : 'good',
			note: dataMode === 'preview' ? 'Still safe to refine before public promotion.' : 'Public mode is now active.'
		},
		{
			label: 'Payments',
			value: paymentsConnected ? 'Connected' : 'Setup needed',
			tone: paymentsConnected ? 'good' : 'warn',
			note: paymentsConnected ? 'Donation checkout is ready for supporters.' : 'Connect Stripe before broad sharing.'
		},
		{
			label: 'Readiness',
			value: readinessLabel,
			tone: paymentsConnected ? 'good' : 'muted',
			note: 'Treat this as the last operator review before launch.'
		},
		{
			label: 'Public route',
			value: publicPath,
			tone: 'muted',
			note: 'This is the live path supporters and sponsors will open.'
		}
	]);

	const activities: Activity[] = [
		{
			title: 'Fundraiser surface is live in preview mode',
			meta: 'Today • Public page',
			body: 'The campaign page is rendering, sponsor lanes are visible, and the donor path is ready for payment wiring.'
		},
		{
			title: 'Onboarding workspace was updated',
			meta: 'Today • Operator flow',
			body: 'Organization setup, campaign basics, brand controls, and preview routing now live in one launch path.'
		},
		{
			title: 'Platform landing page is aligned',
			meta: 'Today • Marketing surface',
			body: 'The platform page now supports the fundraiser with a cleaner software-first story.'
		}
	];

	const sponsorDiagnostics = $derived([
		{ label: 'Sponsor packages', value: sponsorLane ? 'Enabled' : 'Disabled' },
		{ label: 'Lead capture', value: sponsorLane ? 'UI ready' : 'Hidden' },
		{ label: 'Featured tier', value: sponsorLane ? '$500' : 'Off' },
		{ label: 'Recurring lane', value: recurringLane ? 'Enabled' : 'Off' }
	]);

	function badgeClass(tone?: DiagnosticTone) {
		if (tone === 'good') return 'ff-pill ff-pill--soft';
		if (tone === 'warn') return 'ff-pill ff-dashboardPill ff-dashboardPill--warn';
		return 'ff-pill ff-pill--ghost';
	}

	function toggleThemeMode() {
		theme = toggleFFTheme(theme, {
			page: 'dashboard',
			template: 'platform',
			brand: 'connect-atx-elite',
			themePreset: 'core',
			dataMode
		});
	}

	async function copyPublicLink() {
		if (!browser || !navigator.clipboard) {
			copyNotice = 'Clipboard not available in this environment.';
			return;
		}

		await navigator.clipboard.writeText(publicUrl);
		copyNotice = 'Fundraiser link copied.';
	}

	$effect(() => {
		saveLaunchState({
			...loadLaunchState(),
			orgName,
			fundraisingGoal,
			sponsorLane,
			recurringLane,
			paymentsConnected,
			dataMode,
			updatedAt: new Date().toISOString()
		});
	});

	onMount(() => {
		theme = mountFFPage('dashboard', {
			brand: 'connect-atx-elite',
			themePreset: 'core',
			dataMode
		});
	});
</script>

<svelte:head>
	<title>FutureFunded Dashboard</title>
	<meta
		name="description"
		content="Operator dashboard for launch status, campaign summary, sponsor readiness, and workspace controls."
	/>
</svelte:head>

<nav class="ff-skiplinks" aria-label="Skip links">
	<a href="#content" class="ff-skip">Skip to content</a>
	<a href="#diagnostics" class="ff-skip">Skip to diagnostics</a>
</nav>

<div class="ff-shell ff-dashboardPage">
	<div class="ff-shellBg" aria-hidden="true"></div>

	<header class="ff-appbar">
		<div class="ff-container">
			<div class="ff-appbar__inner ff-surface ff-dashboardAppbar">
				<div class="ff-dashboardTopbar">
					<div class="ff-brand ff-minw-0">
						<div class="ff-brand__mark" aria-hidden="true">FF</div>
						<div class="ff-minw-0">
							<p class="ff-brand__title">FutureFunded</p>
							<p class="ff-dashboardMeta">Operator dashboard</p>
						</div>
						<span class="ff-pill ff-pill--ghost ff-dashboardDesktopPill">Dashboard</span>
					</div>

					<nav class="ff-dashboardNav ff-desktopOnly" aria-label="Dashboard navigation">
						<button type="button" class="ff-btn ff-btn--secondary ff-btn--sm ff-btn--quiet" onclick={() => goto('/platform')}>
							Back to platform
						</button>
						<button type="button" class="ff-btn ff-btn--secondary ff-btn--sm ff-btn--quiet" onclick={() => goto('/platform/onboarding')}>
							Onboarding
						</button>
						<button type="button" class="ff-btn ff-btn--secondary ff-btn--sm ff-btn--quiet" onclick={() => goto(publicPath)}>
							Live fundraiser
						</button>
						<button
							type="button"
							class="ff-btn ff-btn--secondary ff-btn--sm ff-btn--quiet ff-themeToggle"
							aria-label="Toggle color theme"
							aria-pressed={theme === 'light'}
							onclick={toggleThemeMode}
						>
							<span class="ff-themeToggle__glyph" aria-hidden="true">◐</span>
							<span class="ff-themeToggle__label">Theme</span>
						</button>
						<button
							type="button"
							class="ff-btn ff-btn--primary ff-btn--sm"
							onclick={() => {
								dataMode = dataMode === 'preview' ? 'live' : 'preview';
							}}
						>
							{dataMode === 'preview' ? 'Publish setup' : 'Set preview'}
						</button>
					</nav>

					<div class="ff-dashboardMobileActions ff-mobileOnly">
						<button
							type="button"
							class="ff-btn ff-btn--secondary ff-btn--sm ff-btn--quiet ff-themeToggle"
							aria-label="Toggle color theme"
							aria-pressed={theme === 'light'}
							onclick={toggleThemeMode}
						>
							<span class="ff-themeToggle__glyph" aria-hidden="true">◐</span>
						</button>
						<button
							type="button"
							class="ff-btn ff-btn--primary ff-btn--sm"
							onclick={() => {
								dataMode = dataMode === 'preview' ? 'live' : 'preview';
							}}
						>
							{dataMode === 'preview' ? 'Publish' : 'Preview'}
						</button>
						<button
							type="button"
							class="ff-btn ff-btn--secondary ff-btn--sm"
							aria-label="Open menu"
							aria-controls="ffDashboardDrawerPanel"
							aria-expanded={drawerOpen}
							onclick={() => (drawerOpen = true)}
						>
							☰
						</button>
					</div>
				</div>
			</div>
		</div>
	</header>

	{#if drawerOpen}
		<aside class="ff-drawer ff-dashboardDrawer" aria-hidden="false">
			<div id="ffDashboardDrawerPanel" class="ff-drawer__panel" role="dialog" aria-modal="true" aria-labelledby="ffDashboardDrawerTitle" tabindex="-1">
				<div class="ff-drawer__head">
					<div class="ff-brand ff-minw-0">
						<div class="ff-brand__mark" aria-hidden="true">FF</div>
						<div class="ff-minw-0">
							<p class="ff-brand__title" id="ffDashboardDrawerTitle">FutureFunded</p>
							<p class="ff-dashboardDrawerLabel">Dashboard</p>
						</div>
					</div>
					<button type="button" class="ff-iconbtn ff-drawer__close" aria-label="Close menu" onclick={() => (drawerOpen = false)}>
						<span aria-hidden="true">✕</span>
					</button>
				</div>

				<div class="ff-drawer__body">
					<nav class="ff-drawer__block" aria-label="Drawer navigation">
						<button type="button" class="ff-drawer__link" onclick={() => { drawerOpen = false; goto('/platform'); }}>Back to platform</button>
						<button type="button" class="ff-drawer__link" onclick={() => { drawerOpen = false; goto('/platform/onboarding'); }}>Onboarding</button>
						<button type="button" class="ff-drawer__link" onclick={() => { drawerOpen = false; goto(publicPath); }}>Live fundraiser</button>
					</nav>

					<section class="ff-drawer__trust" role="note" aria-label="Drawer trust note">
						<p class="ff-drawer__trustTitle ff-m-0">Launch with clarity</p>
						<p class="ff-drawer__trustText ff-mt-1 ff-mb-0">One public route, one operator surface, and a clear next move before you go live.</p>
					</section>

					<div class="ff-stack">
						<button type="button" class="ff-btn ff-btn--secondary ff-btn--pill" onclick={() => { drawerOpen = false; toggleThemeMode(); }}>Toggle theme</button>
						<button type="button" class="ff-btn ff-btn--primary ff-btn--pill" onclick={() => { drawerOpen = false; dataMode = dataMode === 'preview' ? 'live' : 'preview'; }}>{dataMode === 'preview' ? 'Publish setup' : 'Set preview'}</button>
					</div>
				</div>
			</div>

			<button type="button" class="ff-drawer__backdrop" aria-label="Close menu" onclick={() => (drawerOpen = false)}></button>
		</aside>
	{/if}

	<main id="content" class="ff-main" tabindex="-1">
		<section class="ff-section ff-section--hero">
			<div class="ff-container">
				<div class="ff-dashboardShellGrid">
					<article class="ff-card ff-dashboardHeroDeck">
						<div class="ff-dashboardHeroHead">
							<div class="ff-dashboardHeroIntro">
								<p class="ff-kicker">Workspace status</p>
								<h1 class="ff-display ff-dashboardTitle">Run your fundraiser like a real launch.</h1>
								<p class="ff-lead ff-dashboardLead">See what is ready, what is blocked, and what to do next without jumping between tools.</p>
							</div>

							<div class="ff-dashboardHeroStatus">
								<span class={badgeClass(dataMode === 'preview' ? 'warn' : 'good')}>{modeLabel}</span>
								<div class="ff-dashboardStatusCard">
									<span class="ff-dashboardStatusCard__label">Readiness</span>
									<strong class="ff-dashboardStatusCard__value">{readinessLabel}</strong>
									<span class="ff-dashboardStatusCard__meta">{paymentsConnected ? 'Public donation path can go live.' : 'Wire payments before promotion.'}</span>
								</div>
							</div>
						</div>

						<div class="ff-dashboardMetricGrid">
							{#each metrics as item (item.label)}
								<div class="ff-dashboardMetricCard">
									<p class="ff-kicker">{item.label}</p>
									<p class="ff-dashboardMetricValue">{item.value}</p>
									<p class="ff-dashboardMetricNote">{item.note}</p>
								</div>
							{/each}
						</div>

						<div class="ff-dashboardActionGrid">
							{#each actionCards as item (item.title)}
								<article class={`ff-dashboardActionCard ${item.accent ? 'ff-dashboardActionCard--accent' : ''}`}>
									<div class="ff-dashboardActionCard__body">
										<h2 class="ff-h3">{item.title}</h2>
										<p class="ff-copy">{item.body}</p>
									</div>
									<div class="ff-dashboardActionCard__cta">
										<button type="button" class={item.primary ? 'ff-btn ff-btn--primary ff-btn--pill' : 'ff-btn ff-btn--secondary ff-btn--pill'} onclick={item.action}>{item.cta}</button>
									</div>
								</article>
							{/each}
						</div>

						{#if copyNotice}
							<div class="ff-alert ff-alert--info">{copyNotice}</div>
						{/if}
					</article>

					<aside id="diagnostics" class="ff-card ff-dashboardRailDeck">
						<div class="ff-dashboardRailHead">
							<p class="ff-kicker">Launch diagnostics</p>
							<h2 class="ff-h2">Know what is real before you publish.</h2>
							<p class="ff-copy">See what is ready, what still needs attention, and what to do next before this becomes a real public launch.</p>
						</div>

						<div class="ff-dashboardDiagList">
							{#each diagnostics as item (item.label)}
								<div class="ff-dashboardDiagRow">
									<div class="ff-dashboardDiagMain">
										<p class="ff-kicker">{item.label}</p>
										<p class="ff-dashboardDiagValue">{item.value}</p>
										{#if item.note}<p class="ff-dashboardDiagMeta">{item.note}</p>{/if}
									</div>
									<span class={badgeClass(item.tone)}>{item.tone === 'good' ? 'Ready' : item.tone === 'warn' ? 'Attention' : 'Info'}</span>
								</div>
							{/each}
						</div>

						<div class="ff-dashboardControlStack">
							<button type="button" class="ff-btn ff-btn--primary ff-btn--pill" onclick={copyPublicLink}>Copy fundraiser link</button>
							<button type="button" class="ff-btn ff-btn--secondary ff-btn--pill" onclick={() => goto(publicPath)}>View live fundraiser</button>
							<button type="button" class="ff-btn ff-btn--ghost ff-btn--pill">Start sharing fundraiser</button>
							<button type="button" class="ff-btn ff-btn--ghost ff-btn--pill" onclick={() => goto('/platform/onboarding')}>Update setup</button>
							<p class="ff-help">Connect Stripe to start accepting donations instantly.</p>
						</div>
					</aside>
				</div>
			</div>
		</section>

		<section class="ff-section ff-dashboardSectionWrap">
			<div class="ff-container">
				<div class="ff-dashboardLowerGrid">
					<article class="ff-card ff-dashboardSectionBlock">
						<div class="ff-dashboardSectionHead">
							<p class="ff-kicker">Recent activity</p>
							<h2 class="ff-h2">What changed across the launch flow.</h2>
							<span class="ff-pill ff-pill--ghost">Today</span>
						</div>

						<div class="ff-dashboardActivityList">
							{#each activities as item (item.title)}
								<article class="ff-dashboardActivityCard">
									<div class="ff-dashboardActivityCard__head">
										<h3 class="ff-h3">{item.title}</h3>
										<span class="ff-pill ff-pill--ghost">{item.meta}</span>
									</div>
									<p class="ff-copy">{item.body}</p>
								</article>
							{/each}
						</div>
					</article>

					<aside class="ff-card ff-dashboardSectionBlock ff-dashboardSectionBlock--side">
						<div class="ff-dashboardSectionHead">
							<p class="ff-kicker">Sponsor lane</p>
							<h2 class="ff-h2">Sponsor revenue at a glance.</h2>
						</div>
						<p class="ff-copy">Keep sponsor packages, visibility, and revenue lanes active while you prepare to launch.</p>

						<div class="ff-dashboardSponsorGrid">
							{#each sponsorDiagnostics as item (item.label)}
								<div class="ff-dashboardSponsorCard">
									<p class="ff-kicker">{item.label}</p>
									<p class="ff-dashboardMetricValue">{item.value}</p>
								</div>
							{/each}
						</div>

						<div class="ff-dashboardControlStack ff-dashboardControlStack--compact">
							<button type="button" class="ff-btn ff-btn--primary ff-btn--pill" onclick={() => goto(publicPath + '#sponsors')}>Manage sponsor offers</button>
							<button type="button" class="ff-btn ff-btn--secondary ff-btn--pill" onclick={() => goto('/platform/pricing')}>See pricing details</button>
						</div>

						<div class="ff-dashboardInlineStatRow">
							<div class="ff-dashboardInlineStat">
								<span class="ff-dashboardInlineStat__label">Sponsor leads</span>
								<strong class="ff-dashboardInlineStat__value">{sponsorLeads}</strong>
							</div>
							<div class="ff-dashboardInlineStat">
								<span class="ff-dashboardInlineStat__label">Recurring</span>
								<strong class="ff-dashboardInlineStat__value">{recurringLane ? 'Enabled' : 'Off'}</strong>
							</div>
						</div>
					</aside>
				</div>
			</div>
		</section>

		<footer class="ff-section ff-dashboardFooterWrap">
			<div class="ff-container">
				<div class="ff-card ff-dashboardFooterBar">
					<div class="ff-dashboardFooterBar__copy">
						<p class="ff-kicker">Operator close</p>
						<h2 class="ff-h2">Keep the launch flow sharp.</h2>
						<p class="ff-copy">Review the public surface, keep the workspace current, and move from preview to live when the fundraiser is ready.</p>
					</div>
					<div class="ff-dashboardFooterBar__actions">
						<button type="button" class="ff-btn ff-btn--primary ff-btn--pill" onclick={() => goto(publicPath)}>View live fundraiser</button>
						<button type="button" class="ff-btn ff-btn--secondary ff-btn--pill" onclick={() => goto('/platform/onboarding')}>Return to setup</button>
					</div>
				</div>
			</div>
		</footer>
	</main>
</div>

