<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { mountFFPage, toggleFFTheme } from '$lib/utils/ff-theme';

	type HeroSignal = {
		label: string;
		value: string;
		body: string;
	};

	type LaunchStep = {
		id: string;
		title: string;
		body: string;
	};

	type IncludedItem = {
		title: string;
		body: string;
	};

	type PricingTier = {
		key: string;
		name: string;
		price: string;
		badge?: string;
		body: string;
		bullets: string[];
		featured?: boolean;
		cta: string;
	};

	type SponsorLane = {
		name: string;
		amount: string;
		tag: string;
		body: string;
	};

	const nav = [
		{ label: 'Home', action: () => scrollToId('home') },
		{ label: 'Pricing', action: () => scrollToId('pricing') },
		{ label: 'Live fundraiser', action: () => goto('/c/connect-atx-elite') }
	];

	const heroSignals: HeroSignal[] = [
		{
			label: 'Donor confidence',
			value: 'Credible',
			body: 'Clear branding, clear actions, and a first impression that feels legitimate.'
		},
		{
			label: 'Sponsor readiness',
			value: 'Monetizable',
			body: 'Clear sponsor packages and visibility instead of a vague business ask.'
		},
		{
			label: 'Operator control',
			value: 'Calmer',
			body: 'One place to launch, monitor, and tighten the fundraiser.'
		}
	];

	const launchSteps: LaunchStep[] = [
		{
			id: '01',
			title: 'Brand it',
			body: 'Add logo, colors, story, and launch context without rebuilding anything.'
		},
		{
			id: '02',
			title: 'Monetize it',
			body: 'Turn on donations, sponsors, and recurring support in one clean flow.'
		},
		{
			id: '03',
			title: 'Run it',
			body: 'Run the fundraiser from one operator view.'
		}
	];

	const included: IncludedItem[] = [
		{
			title: 'Public fundraiser',
			body: 'A premium public-facing page that feels legitimate the first time someone opens it.'
		},
		{
			title: 'Sponsor packages',
			body: 'A clearer business-support offer with visible recognition, not a generic ask.'
		},
		{
			title: 'Recurring support',
			body: 'Recurring support from the start, without needing a second system later.'
		},
		{
			title: 'Operator dashboard',
			body: 'One control center for launch, updates, and next actions.'
		},
		{
			title: 'Looks credible on mobile',
			body: 'The product reads well in texts, shares, and donor handoffs where trust is decided fast.'
		},
		{
			title: 'Explains the model clearly',
			body: 'People quickly understand donations, sponsors, and recurring support.'
		}
	];

	const tiers: PricingTier[] = [
		{
			key: 'starter',
			name: 'Starter',
			price: '$49 setup',
			badge: 'Fastest way live',
			body: 'Best for teams and organizations that want a polished launch, a credible public page, and one clean setup path.',
			bullets: [
				'Branded fundraiser page',
				'Clean launch workflow',
				'Donor-ready public surface',
				'Core operator access',
				'Fastest way live with one clear setup path'
			],
			cta: 'Choose Starter'
		},
		{
			key: 'growth',
			name: 'Growth',
			price: '$79/mo',
			badge: 'Best for revenue',
			body: 'Best for teams and organizations that want sponsors, recurring support, and a stronger fundraising model from day one.',
			bullets: [
				'Everything in Starter',
				'Sponsor package positioning',
				'Built to monetize beyond one-time donations',
				'Recurring support',
				'Stronger sponsor revenue model'
			],
			featured: true,
			cta: 'Choose Growth'
		}
	];

	const sponsorLanes: (SponsorLane & { bullets: string[] })[] = [
		{
			name: 'Community sponsor',
			amount: '$250',
			tag: 'Visible to every donor',
			body: 'Entry visibility for families, alumni, and local businesses that want donor-facing presence.',
			bullets: [
				'Logo or name on fundraiser',
				'Supporter-facing visibility',
				'Clean recognition without a heavy lift'
			]
		},
		{
			name: 'Featured partner',
			amount: '$500',
			tag: 'Featured on launch',
			body: 'Recommended tier for businesses that want stronger placement and clearer sponsor value.',
			bullets: [
				'Featured placement on fundraiser',
				'Stronger business visibility',
				'More attention during launch'
			]
		},
		{
			name: 'Founding sponsor',
			amount: '$1,000',
			tag: 'Shown across donor shares',
			body: 'Top-visibility tier for businesses that want premium placement and stronger brand association.',
			bullets: [
				'Priority sponsor placement',
				'Premium brand association',
				'Recognition across donor shares'
			]
		}
	];

	let theme = $state<'dark' | 'light'>('dark');
	let drawerOpen = $state(false);

	function scrollToId(id: string) {
		if (!browser) return;
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	function toggleTheme() {
		theme = toggleFFTheme(theme, {
			page: 'platform',
			template: 'platform',
			brand: 'connect-atx-elite',
			themePreset: 'core',
			dataMode: 'preview'
		});
	}

	onMount(() => {
		theme = mountFFPage('platform', {
			brand: 'connect-atx-elite',
			themePreset: 'core',
			dataMode: 'preview'
		});
	});
</script>

<svelte:head>
	<title>FutureFunded Platform</title>
	<meta
		name="description"
		content="Launch a premium fundraiser with sponsor packages, recurring support, and operator control from one calmer platform."
	/>
</svelte:head>

<div class="ff-platformPage">
	<div class="ff-platformPage__inner">
		<a
			href="#content"
			class="ff-skip"
		>
			Skip to content
		</a>

		<header class="ff-appbar">
			<div class="ff-container">
				<div class="ff-appbar__inner">
					<div class="ff-platformTopbar">
						<div class="flex min-w-0 items-center gap-3">
							<div
								class="ff-brand__mark"
							>
								FF
							</div>

							<div class="min-w-0">
								<p class="truncate text-sm font-semibold">FutureFunded</p>
								<p class="ff-platformMeta">
									Launch-ready fundraising
								</p>
							</div>

							<span class="ff-pill">Platform</span>
						</div>

						<nav class="hidden items-center gap-2 md:flex">
							{#each nav as item (item.label)}
								<button type="button" class="ff-btn ff-btn--secondary ff-btn--sm ff-btn--quiet" onclick={item.action}>
									{item.label}
								</button>
							{/each}

							<button type="button" class="ff-btn ff-btn--secondary ff-btn--sm ff-btn--quiet" onclick={toggleTheme}>
								Theme
							</button>

							<button
								type="button"
								class="ff-btn ff-btn--secondary ff-btn--sm ff-btn--quiet"
								onclick={() => goto('/platform/dashboard')}
							>
								Dashboard
							</button>

							<button
								type="button"
								class="ff-btn ff-btn--primary ff-btn--sm ff-btn--topCta"
								onclick={() => goto('/platform/onboarding')}
							>
								Launch your fundraiser
							</button>
						</nav>

						<div class="flex items-center gap-2 md:hidden">
							<button type="button" class="ff-btn ff-btn--secondary ff-btn--sm ff-btn--quiet" onclick={toggleTheme}>◐</button
							>

							<button
								type="button"
								class="ff-btn ff-btn--primary ff-btn--sm ff-btn--topCta"
								onclick={() => goto('/platform/onboarding')}
							>
								Launch
							</button>

							<button
								type="button"
								class="ff-btn ff-btn--secondary"
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
			<button
				type="button"
				class="fixed inset-0 z-[90] bg-slate-950/55 backdrop-blur-sm md:hidden"
				aria-label="Close menu"
				onclick={() => (drawerOpen = false)}
			></button>

			<aside
				class="ff-drawer__panel ff-platformDrawer"
			>
				<div class="flex items-center justify-between">
					<div>
						<p class="text-sm font-semibold">FutureFunded</p>
						<p class="ff-platformDrawerLabel">Platform</p>
					</div>

					<button
						type="button"
						class="ff-btn ff-btn--secondary"
						onclick={() => (drawerOpen = false)}
					>
						✕
					</button>
				</div>

				<nav class="mt-6 grid gap-2">
					{#each nav as item (item.label)}
						<button
							type="button"
							class="ff-btn ff-btn--secondary"
							onclick={() => {
								drawerOpen = false;
								item.action();
							}}
						>
							{item.label}
						</button>
					{/each}

					<button
						type="button"
						class="ff-btn ff-btn--secondary"
						onclick={() => {
							drawerOpen = false;
							goto('/platform/dashboard');
						}}
					>
						Dashboard
					</button>

					<button
						type="button"
						class="ff-btn ff-btn--primary"
						onclick={() => {
							drawerOpen = false;
							goto('/platform/onboarding');
						}}
					>
						Launch your fundraiser
					</button>
				</nav>
			</aside>
		{/if}

		<main id="content" class="ff-main">
			<div class="ff-container">
			<section id="home" class="ff-section">
				<div class="ff-heroGrid">
				<article class="ff-card ff-platformHero">
					<p
						class="ff-kicker"
					>
						FutureFunded platform
					</p>

					<h1
						class="ff-display ff-mt-4"
					>
						Launch premium fundraising without the sprawl.
					</h1>

					<p class="ff-lead ff-mt-4">
						One branded fundraiser plus one calm dashboard for launch, sponsors, and recurring support.
					</p>

					<!-- FF_CTA_HIERARCHY_VERIFIED_V2 -->
					<div class="mt-5 flex flex-wrap gap-3 ff-coreCtaRow">
						<button
							type="button"
							class="ff-btn ff-btn--primary ff-btn--lg ff-btn--heroPrimary"
							onclick={() => goto('/platform/onboarding')}
						>
							Launch your fundraiser
						</button>

						<button
							type="button"
							class="ff-btn ff-btn--secondary ff-btn--lg ff-btn--heroSecondary"
							onclick={() => goto('/c/connect-atx-elite')}
						>
							Preview live page
						</button>
					</div>

					<div class="mt-5 flex flex-wrap gap-2">
						<span class="ff-pill ff-pill--soft">Branded fundraiser</span>
						<span class="ff-pill ff-pill--ghost">Sponsor packages</span>
						<span class="ff-pill ff-pill--ghost">Recurring support</span>
					</div>

					<div class="mt-6 grid gap-3 sm:grid-cols-3">
						{#each heroSignals as item (item.label)}
							<div class="ff-card ff-card--soft">
								<p
									class="ff-kicker"
								>
									{item.label}
								</p>
								<p class="mt-2 text-lg font-black tracking-[-0.03em]">{item.value}</p>
								<p class="ff-platformBody ff-platformBody--sm ff-mt-2">{item.body}</p>
							</div>
						{/each}
					</div>
				</article>

				<aside class="ff-card ff-platformSnapshot">
					<p
						class="ff-kicker"
					>
						Platform snapshot
					</p>

					<h2 class="mt-4 max-w-[13ch] text-4xl leading-[1.02] font-black tracking-[-0.045em]">
						Built to launch like a real product.
					</h2>

					<p class="ff-copy ff-mt-4">
						Instead of stitching together donations, sponsors, and updates across scattered tools,
						FutureFunded puts the public experience and operator control into one calmer system.
					</p>

					<div class="mt-5 grid gap-3 sm:grid-cols-2">
						<div class="ff-card ff-card--soft">
							<p
								class="ff-kicker"
							>
								Fundraiser
							</p>
							<p class="mt-2 text-lg font-black">Launch-ready</p>
							<p class="ff-platformBody ff-platformBody--sm ff-mt-2">
								Branded public page prepared for donor traffic.
							</p>
						</div>

						<div class="ff-card ff-card--soft">
							<p
								class="ff-kicker"
							>
								Sponsors
							</p>
							<p class="mt-2 text-lg font-black">Monetizable</p>
							<p class="ff-platformBody ff-platformBody--sm ff-mt-2">
								Package-based revenue lane built in.
							</p>
						</div>

						<div class="ff-card ff-card--soft sm:col-span-2">
							<p
								class="ff-kicker"
							>
								Dashboard
							</p>
							<p class="mt-2 text-lg font-black">Operator-first</p>
							<p class="ff-platformBody ff-platformBody--sm ff-mt-2">
								Clear launch and management flow for the team.
							</p>
						</div>
					</div>

					<div class="ff-card ff-card--soft mt-5">
						<p
							class="ff-kicker"
						>
							Why this matters
						</p>
						<ul class="ff-stack ff-mt-3 ff-platformBody ff-platformBody--sm">
							<li>• One public fundraiser instead of scattered links and tools.</li>
							<li>• Sponsor packages and recurring support built into the same product story.</li>
							<li>
								• Mobile-first design that still feels credible in demos, texts, and donor shares.
							</li>
						</ul>
					</div>

					<div class="mt-5">
						<button
							type="button"
							class="ff-btn ff-btn--secondary"
							onclick={() => goto('/platform/dashboard')}
						>
							Open operator dashboard
						</button>
					</div>
				</aside>
				</div>
			</section>

			<section id="how" class="ff-section ff-platformSection">
				<div class="max-w-3xl">
					<p
						class="ff-kicker"
					>
						How it works
					</p>

					<h2 class="mt-3 max-w-[12ch] text-4xl leading-[1.02] font-black tracking-[-0.045em]">
						A shorter path from setup to real support.
					</h2>

					<p class="ff-copy ff-mt-3">
						The product story stays simple: brand the campaign, open better revenue lanes, and run
						it from one operator view.
					</p>
				</div>

				<div class="mt-5 grid gap-4 lg:grid-cols-3">
					{#each launchSteps as step (step.id)}
						<article class="ff-card ff-card--shell p-5 md:p-6">
							<div
								class="ff-platformStepBadge"
							>
								{step.id}
							</div>

							<h3 class="mt-5 text-2xl font-black tracking-[-0.03em]">{step.title}</h3>
							<p class="ff-copy ff-mt-3">{step.body}</p>
						</article>
					{/each}
				</div>
			</section>

			<section id="included" class="ff-section ff-platformSection">
				<div class="max-w-3xl">
					<p
						class="ff-kicker"
					>
						What’s included
					</p>

					<h2 class="mt-3 max-w-[13ch] text-4xl leading-[1.02] font-black tracking-[-0.045em]">
						The launch system, not just the donate page.
					</h2>

					<p class="ff-copy ff-mt-3">
						Every lane is there to help the organization feel more credible and raise in a more
						structured way.
					</p>
				</div>

				<div class="mt-5 grid gap-4 lg:grid-cols-2">
					{#each included as item (item.title)}
						<article class="ff-card ff-card--shell p-5 md:p-6">
							<p
								class="ff-kicker"
							>
								{item.title}
							</p>
							<p class="ff-copy ff-mt-3">{item.body}</p>
						</article>
					{/each}
				</div>
			</section>

			<section id="pricing" class="ff-section ff-platformSection">
				<div class="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
					<div class="max-w-3xl">
						<p
							class="ff-kicker"
						>
							Pricing
						</p>

						<h2 class="mt-3 max-w-[12ch] text-4xl leading-[1.02] font-black tracking-[-0.045em]">
							Start clean. Add sponsor revenue when it fits.
						</h2>
					</div>

					<button
						type="button"
						class="ff-btn ff-btn--secondary"
						onclick={() => goto('/platform/pricing')}
					>
						Compare plans
					</button>
				</div>

				<div class="mt-5 grid gap-4 lg:grid-cols-2">
					{#each tiers as tier (tier.key)}
						<article
							class={`ff-card ff-card--shell p-5 md:p-6 ${tier.featured ? 'ring-1 ring-orange-400/30' : ''}`}
						>
							<div class="flex flex-wrap items-center justify-between gap-3">
								<div>
									<p
										class="ff-kicker"
									>
										{tier.name}
									</p>
									<p class="mt-2 text-4xl font-black tracking-[-0.05em]">{tier.price}</p>
								</div>

								{#if tier.badge}
									<span class={`ff-pill ${tier.featured ? 'ff-platformTag ff-platformTag--soft' : 'ff-platformTag'}`}>
										{tier.badge}
									</span>
								{/if}
							</div>

							<p class="ff-copy ff-mt-4">{tier.body}</p>

							<ul class="ff-stack ff-mt-5 ff-platformBody ff-platformBody--sm">
								{#each tier.bullets as bullet, i (i)}
									<li>• {bullet}</li>
								{/each}
							</ul>

							<div class="mt-5">
								<button
									type="button"
									class={tier.featured ? 'ff-btn ff-btn--primary' : 'ff-btn ff-btn--secondary'}
									onclick={() => goto('/platform/onboarding')}
								>
									{tier.cta}
								</button>
							</div>
						</article>
					{/each}
				</div>
			</section>

			<section id="sponsor-revenue" class="ff-section ff-platformSection">
				<article class="ff-card ff-card--shell p-5 md:p-7">
					<p
						class="ff-kicker"
					>
						Sponsor revenue lane
					</p>

					<h2 class="mt-3 max-w-[13ch] text-4xl leading-[1.02] font-black tracking-[-0.045em]">
						Turn attention into sponsor revenue.
					</h2>

					<p class="ff-copy ff-mt-4">
						FutureFunded helps organizations sell visibility and recognition more clearly. That
						makes sponsor outreach feel more professional, more business-friendly, and more valuable
						than a generic donation ask.
					</p>

					<div class="mt-5">
						<button
							type="button"
							class="ff-btn ff-btn--primary ff-btn--lg ff-btn--heroPrimary"
							onclick={() => goto('/platform/onboarding')}
						>
							Start sponsor outreach
						</button>
					</div>

					<div class="mt-5 grid gap-4 lg:grid-cols-3">
						{#each sponsorLanes as lane (lane.name)}
							<article class="ff-card ff-card--soft">
								<div class="flex flex-wrap items-center justify-between gap-2">
									<p
										class="ff-kicker"
									>
										{lane.name}
									</p>
									<span class="ff-pill ff-pill--ghost">{lane.amount}</span>
								</div>

								<p class="ff-copy ff-mt-3">{lane.body}</p>

								<ul class="ff-stack ff-mt-3 ff-platformBody ff-platformBody--sm">
								{#each lane.bullets as bullet, i (i)}
									<li>• {bullet}</li>
								{/each}
							</ul>

							<div class="mt-4">
									<span class="ff-pill ff-pill--soft">{lane.tag}</span>
								</div>
							</article>
						{/each}
					</div>
				</article>
			</section>

			<footer class="pt-5">
				<div class="ff-card ff-card--shell p-5 md:p-7">
					<div class="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
						<div>
							<p
								class="ff-kicker"
							>
								Next move
							</p>

							<h2 class="mt-3 max-w-[10ch] text-4xl leading-[1.02] font-black tracking-[-0.045em]">
								Launch one polished fundraiser.
							</h2>

							<p class="ff-copy ff-mt-4">
								Start with a premium public page, then add sponsors and recurring support when it
								makes sense.
							</p>
						</div>

						<div class="grid gap-3">
							<button
								type="button"
								class="ff-btn ff-btn--primary ff-btn--sm ff-btn--topCta"
								onclick={() => goto('/platform/onboarding')}
							>
								Launch your fundraiser
							</button>

							<button
								type="button"
								class="ff-btn ff-btn--secondary ff-btn--sm ff-btn--quiet"
								onclick={() => goto('/platform/dashboard')}
							>
								Open operator dashboard
							</button>
						</div>
					</div>
				</div>
			</footer>
			</div>
		</main>
	</div>
</div>
