<script lang="ts">
	import '$lib/styles/ff.css';
	import { pricingCards, sponsorCards } from '$lib/content/offer-presenters';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { onMount, tick } from 'svelte';
	import { mountFFPage, toggleFFTheme } from '$lib/utils/ff-theme';

	type NavItem = {
		label: string;
		id?: string;
		href?: string;
	};

	type HeroSignal = {
		label: string;
		value: string;
		body: string;
	};

	type PromiseItem = {
		title: string;
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

	type SegmentItem = {
		title: string;
		kicker: string;
		body: string;
	};

	type PreviewCard = {
		kicker: string;
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
		bullets: string[];
	};

	type FAQItem = {
		q: string;
		a: string;
	};

	const nav: NavItem[] = [
		{ label: 'Home', id: 'home' },
		{ label: 'How it works', id: 'how' },
		{ label: 'Revenue', id: 'revenue' },
		{ label: 'Pricing', id: 'pricing' },
		{ label: 'Live fundraiser', href: '/c/connect-atx-elite' }
	];

	const heroSignals: HeroSignal[] = [
		{
			label: 'Donor confidence',
			value: 'Credible',
			body: 'Branded pages, cleaner hierarchy, and a first impression that reads like a real product.'
		},
		{
			label: 'Sponsor readiness',
			value: 'Monetizable',
			body: 'Sponsor packages and recognition lanes that feel clearer than a vague business ask.'
		},
		{
			label: 'Operator control',
			value: 'Calmer',
			body: 'One place to launch, preview, refine, and publish without juggling scattered tools.'
		}
	];

	const launchPromises: PromiseItem[] = [
		{
			title: 'Launch with your own brand',
			body: 'Logo, colors, and a public page that feels credible immediately.'
		},
		{
			title: 'Turn attention into revenue',
			body: 'Donations, sponsor packages, and recurring support live in the same launch motion.'
		},
		{
			title: 'Stay calm after publish',
			body: 'Preview, dashboard, and operator controls stay in the same product family after go-live.'
		}
	];

	const launchSteps: LaunchStep[] = [
		{
			id: '01',
			title: 'Brand it',
			body: 'Add logo, colors, organization context, and launch story without rebuilding the product every time.'
		},
		{
			id: '02',
			title: 'Connect revenue',
			body: 'Turn on donations, sponsor packages, and recurring support in one cleaner launch path.'
		},
		{
			id: '03',
			title: 'Preview it',
			body: 'Review the public fundraiser and operator flow before you start sharing it publicly.'
		},
		{
			id: '04',
			title: 'Run it',
			body: 'Manage launch progress, sponsor readiness, and next actions from one calmer dashboard.'
		}
	];

	const included: IncludedItem[] = [
		{
			title: 'Public fundraiser',
			body: 'A premium donor-facing page that feels credible the first time someone opens it.'
		},
		{
			title: 'Sponsor packages',
			body: 'A clearer business-support offer with visible recognition, not a generic ask.'
		},
		{
			title: 'Recurring support',
			body: 'Optional recurring support from the start, without bolting on a second system later.'
		},
		{
			title: 'Operator dashboard',
			body: 'One control center for launch status, updates, next actions, and a cleaner operating rhythm.'
		},
		{
			title: 'Mobile credibility',
			body: 'The product still reads cleanly in texts, shares, and donor handoffs where trust gets decided fast.'
		},
		{
			title: 'Launch structure',
			body: 'A clearer setup path for branding, fundraising goals, sponsor offers, and publish readiness.'
		}
	];

	const segments: SegmentItem[] = [
		{
			kicker: 'Youth teams',
			title: 'Travel, training, fees, and local sponsor support.',
			body: 'Built for programs that need fundraising to look serious enough for families, coaches, and business supporters.'
		},
		{
			kicker: 'Schools',
			title: 'Booster-style campaigns with cleaner community trust.',
			body: 'Launch a branded public page with a clearer path for donations, sponsor visibility, and event-season support.'
		},
		{
			kicker: 'Nonprofits',
			title: 'A cleaner fundraising surface for mission-led support.',
			body: 'Present the story, revenue lanes, and donor path in a way that feels more polished and easier to trust.'
		},
		{
			kicker: 'Clubs + organizations',
			title: 'Launch quickly without looking pieced together.',
			body: 'Use one structured setup flow to create a public page, sponsor offer, and operator-ready workspace.'
		}
	];

	const previewCards: PreviewCard[] = [
		{
			kicker: 'Onboarding',
			title: 'Brand, story, and revenue setup in one launch flow.',
			body: 'Define the organization, apply the brand, set the goal, choose sponsor lanes, and preview before publish.'
		},
		{
			kicker: 'Live fundraiser',
			title: 'A public page built to look credible on first open.',
			body: 'The donor surface is branded, mobile-first, sponsor-capable, and easier to trust in real shares.'
		},
		{
			kicker: 'Dashboard',
			title: 'A calmer operator view for launch and follow-through.',
			body: 'Keep preview mode, payments, sponsor readiness, and launch actions in one place instead of scattered tools.'
		}
	];

	const previewOutcomes: PromiseItem[] = [
		{
			title: 'Setup stays structured',
			body: 'Onboarding keeps logo, colors, campaign story, goal, and revenue lanes in one guided flow.'
		},
		{
			title: 'The public page feels buyable',
			body: 'Donors and sponsors see a cleaner story, better hierarchy, and more premium support options.'
		},
		{
			title: 'Operators keep control',
			body: 'Dashboard actions, preview mode, and launch management stay calmer after the first push.'
		}
	];

	const pricingReasons: PromiseItem[] = [
		{
			title: 'Start lean',
			body: 'Get a polished public page live fast without dragging in extra setup overhead.'
		},
		{
			title: 'Power up later',
			body: 'Move into sponsor revenue and recurring support when the organization is ready.'
		},
		{
			title: 'Stay in one system',
			body: 'You do not need one tool for setup, one for sponsors, and another for launch ops.'
		}
	];

	const tiers: PricingTier[] = [
		{
			key: 'starter',
			name: 'Starter',
			price: pricingCards?.[0]?.price ?? '$49 setup',
			badge: 'Fastest way live',
			body: 'Best for teams and organizations that want a polished launch, a credible public page, and one clean setup path.',
			bullets: [
				'Branded fundraiser page',
				'Clean launch workflow',
				'Donor-ready public surface',
				'Core operator access',
				'Fastest way live with one clear setup path'
			],
			cta: 'Start Starter'
		},
		{
			key: 'growth',
			name: 'Growth',
			price: pricingCards?.[1]?.price ?? '$79/mo',
			badge: 'Best for revenue',
			body: 'Best for organizations that want sponsors, recurring support, and a stronger fundraising model from day one.',
			bullets: [
				'Everything in Starter',
				'Sponsor package positioning',
				'Built to monetize beyond one-time donations',
				'Recurring support',
				'Stronger sponsor revenue model'
			],
			featured: true,
			cta: 'Start Growth'
		}
	];

	const sponsorLanes: SponsorLane[] = [
		{
			name: 'Community Sponsor',
			amount: sponsorCards?.[0]?.amount ?? '$250',
			tag: 'Visible to every donor',
			body: 'Entry visibility for families, alumni, and local businesses that want donor-facing presence.',
			bullets: [
				'Logo or name on fundraiser',
				'Supporter-facing visibility',
				'Clean recognition without a heavy lift'
			]
		},
		{
			name: 'Featured Partner',
			amount: sponsorCards?.[1]?.amount ?? '$500',
			tag: 'Featured on launch',
			body: 'Recommended tier for businesses that want stronger placement and clearer sponsor value.',
			bullets: [
				'Featured placement on fundraiser',
				'Stronger business visibility',
				'More attention during launch'
			]
		},
		{
			name: 'Founding Sponsor',
			amount: sponsorCards?.[2]?.amount ?? '$1,000',
			tag: 'Shown across donor shares',
			body: 'Top-visibility tier for businesses that want premium placement and stronger brand association.',
			bullets: [
				'Priority sponsor placement',
				'Premium brand association',
				'Recognition across donor shares'
			]
		}
	];

	const operatorChecks = [
		'One premium public page instead of scattered links and tools.',
		'Sponsor packages and recurring support built into the same product story.',
		'Mobile-first design that still reads credibly in demos, texts, and donor shares.'
	];

	const controlMetrics = [
		{ label: 'Surface', value: 'Preview ready' },
		{ label: 'Revenue', value: 'Sponsors + support' },
		{ label: 'Operator', value: 'Dashboard included' }
	];

	const controlProof: PromiseItem[] = [
		{
			title: 'Provider ready',
			body: 'Launch with a credible public page that feels intentional from the first open.'
		},
		{
			title: 'Sponsors + support',
			body: 'Monetize beyond one-time giving with clearer sponsor and recurring lanes.'
		},
		{
			title: 'Dashboard included',
			body: 'Keep preview mode, launch actions, and operator control inside the same product.'
		}
	];

	const routeCards = [
		{
			kicker: 'Fundraiser',
			title: 'Launch-ready',
			body: 'Branded public page prepared for donor traffic and sponsor visibility.'
		},
		{
			kicker: 'Sponsors',
			title: 'Monetizable',
			body: 'Package-based revenue lane built in from the start.'
		},
		{
			kicker: 'Dashboard',
			title: 'Operator-first',
			body: 'Clear launch and management flow for the team.'
		}
	];

	const faqs: FAQItem[] = [
		{
			q: 'Who is FutureFunded built for?',
			a: 'Youth teams, nonprofits, schools, clubs, and community organizations that want a branded fundraiser with cleaner sponsor and operator support.'
		},
		{
			q: 'Can we launch with our own brand?',
			a: 'Yes. The setup flow is designed around logo, colors, campaign story, fundraising goal, and launch context.'
		},
		{
			q: 'Does this support more than one-time donations?',
			a: 'Yes. FutureFunded is built to support sponsor packages and optional recurring support alongside standard donations.'
		},
		{
			q: 'Why does the public page matter so much?',
			a: 'Because trust gets decided fast. A cleaner public page improves donor confidence, sponsor credibility, and share quality.'
		}
	];

	let theme = $state<'dark' | 'light'>('dark');
	let drawerOpen = $state(false);
	let drawerPanelEl = $state<HTMLElement | null>(null);
	let lastDrawerTrigger = $state<HTMLButtonElement | null>(null);

	function scrollToId(id: string) {
		if (!browser) return;
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	function closeDrawer({ restoreFocus = true }: { restoreFocus?: boolean } = {}) {
		drawerOpen = false;

		if (restoreFocus && browser && lastDrawerTrigger) {
			queueMicrotask(() => lastDrawerTrigger?.focus());
		}
	}

	async function openDrawer(event?: Event) {
		if (event?.currentTarget instanceof HTMLButtonElement) {
			lastDrawerTrigger = event.currentTarget;
		}

		drawerOpen = true;
		await tick();
		drawerPanelEl?.focus();
	}

	function runNav(item: NavItem) {
		closeDrawer();

		if (item.href) {
			goto(item.href);
			return;
		}

		if (item.id) {
			scrollToId(item.id);
		}
	}

	function toggleThemeMode() {
		theme = toggleFFTheme(theme, {
			page: 'platform',
			template: 'platform',
			brand: 'connect-atx-elite',
			themePreset: 'core',
			dataMode: 'preview'
		});
	}

	function handleWindowKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && drawerOpen) {
			closeDrawer();
		}
	}

	$effect(() => {
		if (!browser) return;

		const previous = document.body.style.overflow;
		document.body.style.overflow = drawerOpen ? 'hidden' : previous;

		return () => {
			document.body.style.overflow = previous;
		};
	});

	onMount(() => {
		theme = mountFFPage('platform', {
			brand: 'connect-atx-elite',
			themePreset: 'core',
			dataMode: 'preview'
		});
	});
</script>

<svelte:window onkeydown={handleWindowKeydown} />

<svelte:head>
	<title>FutureFunded Platform</title>
	<meta
		name="description"
		content="Launch a premium fundraiser with sponsor packages, recurring support, and operator control from one calmer platform."
	/>
</svelte:head>

<nav class="ff-skiplinks" aria-label="Skip links">
	<a href="#content" class="ff-skip">Skip to content</a>
	<a href="#pricing" class="ff-skip">Skip to pricing</a>
	<a href="#faq" class="ff-skip">Skip to FAQ</a>
</nav>

<div class="ff-shell ff-platformSurface">
	<div class="ff-shellBg" aria-hidden="true"></div>

	<header class="ff-appbar">
		<div class="ff-container">
			<div class="ff-appbar__inner ff-surface ff-platformAppbar">
				<div class="ff-platformTopbar">
					<div class="ff-platformTopbar__brand">
						<div class="ff-brand__mark" aria-hidden="true">FF</div>
						<div class="ff-platformTopbar__copy ff-minw-0">
							<p class="ff-brand__title">FutureFunded</p>
							<p class="ff-platformMeta">Fundraising platform for teams, schools, nonprofits, and clubs</p>
						</div>
						<span class="ff-pill ff-pill--ghost">Platform</span>
					</div>

					<nav class="ff-platformNav" aria-label="Platform navigation">
						{#each nav as item (item.label)}
							<button
								type="button"
								class="ff-btn ff-btn--secondary ff-btn--sm ff-btn--quiet"
								onclick={() => runNav(item)}
							>
								{item.label}
							</button>
						{/each}

						<button
							type="button"
							class="ff-btn ff-btn--secondary ff-btn--sm ff-btn--quiet"
							aria-label="Toggle color theme"
							aria-pressed={theme === 'light'}
							onclick={toggleThemeMode}
						>
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
							class="ff-btn ff-btn--primary ff-btn--sm"
							onclick={() => goto('/platform/onboarding')}
						>
							Start guided launch
						</button>
					</nav>

					<div class="ff-platformTopbar__mobile">
						<button
							type="button"
							class="ff-btn ff-btn--secondary ff-btn--sm ff-btn--quiet"
							aria-label="Toggle color theme"
							aria-pressed={theme === 'light'}
							onclick={toggleThemeMode}
						>
							◐
						</button>

						<button
							type="button"
							class="ff-btn ff-btn--primary ff-btn--sm"
							onclick={() => goto('/platform/onboarding')}
						>
							Launch
						</button>

						<button
							type="button"
							class="ff-btn ff-btn--secondary ff-btn--sm"
							aria-label="Open menu"
							aria-controls="ffPlatformDrawerPanel"
							aria-expanded={drawerOpen}
							onclick={openDrawer}
						>
							☰
						</button>
					</div>
				</div>
			</div>
		</div>
	</header>

	{#if drawerOpen}
		<aside class="ff-platformDrawer" aria-hidden="false">
			<div
				id="ffPlatformDrawerPanel"
				class="ff-drawer__panel"
				role="dialog"
				aria-modal="true"
				aria-labelledby="ffPlatformDrawerTitle"
				tabindex="-1"
				bind:this={drawerPanelEl}
			>
				<div class="ff-platformDrawer__head">
					<div class="ff-platformDrawer__brand">
						<div class="ff-brand__mark" aria-hidden="true">FF</div>
						<div class="ff-platformDrawer__copy ff-minw-0">
							<p class="ff-brand__title" id="ffPlatformDrawerTitle">FutureFunded</p>
							<p class="ff-platformDrawerLabel">Platform</p>
						</div>
					</div>

					<button
						type="button"
						class="ff-iconbtn ff-drawer__close"
						aria-label="Close menu"
						onclick={() => closeDrawer()}
					>
						<span aria-hidden="true">✕</span>
					</button>
				</div>

				<div class="ff-drawer__body">
					<nav class="ff-platformDrawer__nav" aria-label="Drawer navigation">
						{#each nav as item (item.label)}
							<button type="button" class="ff-drawer__link" onclick={() => runNav(item)}>
								{item.label}
							</button>
						{/each}

						<button
							type="button"
							class="ff-drawer__link"
							onclick={() => {
								closeDrawer();
								goto('/platform/dashboard');
							}}
						>
							Dashboard
						</button>
					</nav>

					<section class="ff-drawer__trust" role="note" aria-label="Drawer trust note">
						<p class="ff-drawer__trustTitle ff-m-0">Launch with clarity</p>
						<p class="ff-drawer__trustText ff-mt-1 ff-mb-0">
							A premium public page, sponsor revenue lane, and calmer operator controls in one system.
						</p>
					</section>

					<div class="ff-platformDrawer__actions">
						<button
							type="button"
							class="ff-btn ff-btn--secondary ff-btn--pill"
							onclick={() => {
								closeDrawer();
								goto('/platform/dashboard');
							}}
						>
							Open dashboard
						</button>

						<button
							type="button"
							class="ff-btn ff-btn--primary ff-btn--pill"
							onclick={() => {
								closeDrawer();
								goto('/platform/onboarding');
							}}
						>
							Start guided launch
						</button>
					</div>
				</div>
			</div>

			<button
				type="button"
				class="ff-drawer__backdrop"
				aria-label="Close menu"
				onclick={() => closeDrawer()}
			></button>
		</aside>
	{/if}

	<main id="content" class="ff-main" tabindex="-1">
		<section id="home" class="ff-section ff-section--hero">
			<div class="ff-container">
				<div class="ff-platformHeroGrid">
					<article class="ff-platformHeroCard ff-surface">
						<div class="ff-platformHeroIntro">
							<span class="ff-pill ff-pill--soft">Preview surface</span>
							<span class="ff-pill ff-pill--ghost">Public fundraiser + dashboard</span>
						</div>

						<p class="ff-kicker ff-mt-3">FutureFunded platform</p>
						<h1 class="ff-display ff-mt-4">Launch premium fundraising without the sprawl.</h1>
						<p class="ff-lead ff-mt-4 ff-platformHeroLead">
							One branded public fundraiser, one sponsor-ready revenue model, and one calmer dashboard for launch and operator confidence.
						</p>

						<div class="ff-platformHeroActions">
							<button
								type="button"
								class="ff-btn ff-btn--primary ff-btn--lg"
								onclick={() => goto('/platform/onboarding')}
							>
								Start guided launch
							</button>

							<button
								type="button"
								class="ff-btn ff-btn--secondary ff-btn--lg"
								onclick={() => goto('/c/connect-atx-elite')}
							>
								View live fundraiser
							</button>
						</div>

						<div class="ff-platformHeroPills">
							<span class="ff-pill ff-pill--soft">Branded fundraiser</span>
							<span class="ff-pill ff-pill--ghost">Sponsor packages</span>
							<span class="ff-pill ff-pill--ghost">Recurring support</span>
							<span class="ff-pill ff-pill--ghost">Mobile-first</span>
						</div>

						<div class="ff-platformHeroStatRow">
							<div class="ff-platformHeroStat">
								<span class="ff-platformHeroStat__label">Setup</span>
								<span class="ff-platformHeroStat__value">Launch-ready flow</span>
							</div>
							<div class="ff-platformHeroStat">
								<span class="ff-platformHeroStat__label">Revenue</span>
								<span class="ff-platformHeroStat__value">Sponsors + support</span>
							</div>
							<div class="ff-platformHeroStat">
								<span class="ff-platformHeroStat__label">Operator</span>
								<span class="ff-platformHeroStat__value">Calmer dashboard</span>
							</div>
						</div>

						<div class="ff-platformHeroPromise ff-mt-4">
							<div class="ff-platformHeroPromise__head">
								<p class="ff-kicker">Launch promise</p>
								<p class="ff-platformCopy ff-mt-2">
									This is built to feel like a real product on day one: branded setup, better revenue lanes,
									and a calmer operator handoff after launch.
								</p>
							</div>

							<div class="ff-platformPromiseList">
								{#each launchPromises as item (item.title)}
									<div class="ff-platformPromiseItem">
										<p class="ff-platformPromiseTitle">{item.title}</p>
										<p class="ff-platformPromiseBody">{item.body}</p>
									</div>
								{/each}
							</div>
						</div>

						<div class="ff-platformSignalGrid">
							{#each heroSignals as item (item.label)}
								<div class="ff-platformSignal">
									<p class="ff-kicker">{item.label}</p>
									<p class="ff-platformSignalValue">{item.value}</p>
									<p class="ff-platformSignalBody">{item.body}</p>
								</div>
							{/each}
						</div>
					</article>

					<aside class="ff-platformControlCard ff-surface" aria-labelledby="platformControlTitle">
						<div class="ff-platformControlHead">
							<p class="ff-kicker">Platform snapshot</p>
							<h2 class="ff-platformTitle" id="platformControlTitle">
								Built to launch like a real product.
							</h2>
							<p class="ff-platformCopy">
								Instead of stitching together donations, sponsors, updates, and launch actions across
								scattered tools, FutureFunded keeps the public experience and operator control in one
								calmer system.
							</p>
						</div>

						<div class="ff-platformControlRail">
							{#each controlMetrics as item (item.label)}
								<div class="ff-platformControlRailItem">
									<span class="ff-platformControlRailItem__label">{item.label}</span>
									<span class="ff-platformControlRailItem__value">{item.value}</span>
								</div>
							{/each}
						</div>

						<div class="ff-platformRouteGrid ff-mt-4">
							{#each routeCards as card (card.kicker)}
								<div class="ff-platformRouteCard">
									<p class="ff-kicker">{card.kicker}</p>
									<p class="ff-platformRouteTitle ff-platformProofTitle ff-mt-2">{card.title}</p>
									<p class="ff-platformBody ff-platformBody--sm ff-mt-2">{card.body}</p>
								</div>
							{/each}
						</div>

						<ul class="ff-platformChecklist ff-mt-4">
							{#each operatorChecks as item, i (i)}
								<li>
									<span class="ff-platformCheck" aria-hidden="true">✓</span>
									<span>{item}</span>
								</li>
							{/each}
						</ul>

						<div class="ff-platformControlProof ff-mt-4" role="list" aria-label="Launch proof">
							<div class="ff-platformControlProofItem" role="listitem">
								<span class="ff-platformControlProofItem__label">Speed</span>
								<strong class="ff-platformControlProofItem__value">1 cleaner launch path</strong>
							</div>
							<div class="ff-platformControlProofItem" role="listitem">
								<span class="ff-platformControlProofItem__label">Confidence</span>
								<strong class="ff-platformControlProofItem__value">Preview before publish</strong>
							</div>
							<div class="ff-platformControlProofItem" role="listitem">
								<span class="ff-platformControlProofItem__label">Revenue</span>
								<strong class="ff-platformControlProofItem__value">Sponsors + support</strong>
							</div>
						</div>

						<div class="ff-platformActionStack ff-mt-4">
							<button
								type="button"
								class="ff-btn ff-btn--primary ff-btn--pill"
								onclick={() => goto('/platform/onboarding')}
							>
								Start guided launch
							</button>

							<button
								type="button"
								class="ff-btn ff-btn--secondary ff-btn--pill"
								onclick={() => goto('/platform/dashboard')}
							>
								Open dashboard
							</button>
						</div>
					</aside>
				</div>
			</div>
		</section>

		<section id="how" class="ff-section ff-platformSection ff-platformSection--flow">
			<div class="ff-container">
				<div class="ff-platformSectionHeader">
					<p class="ff-kicker">How it works</p>
					<h2 class="ff-platformSectionTitle">A shorter path from setup to real support.</h2>
					<p class="ff-platformCopy">
						The platform story stays simple: brand the fundraiser, turn on better revenue lanes, preview it,
						and run it from one operator view.
					</p>
				</div>

				<div class="ff-platformStoryGrid ff-mt-4">
					{#each launchSteps as step (step.id)}
						<article class="ff-platformStoryCard">
							<div class="ff-platformStepBadge">{step.id}</div>
							<h3 class="ff-platformStoryTitle ff-mt-4">{step.title}</h3>
							<p class="ff-platformCopy ff-mt-3">{step.body}</p>
						</article>
					{/each}
				</div>
			</div>
		</section>

		<section class="ff-section ff-platformSection ff-platformSection--included">
			<div class="ff-container">
				<div class="ff-platformSectionHeader">
					<p class="ff-kicker">What’s included</p>
					<h2 class="ff-platformSectionTitle">The launch system, not just the donate page.</h2>
					<p class="ff-platformCopy">
						Every lane helps the organization look more credible, raise more clearly, and launch without clutter.
					</p>
				</div>

				<div class="ff-platformIncludeGrid ff-mt-4">
					{#each included as item (item.title)}
						<article class="ff-platformIncludeCard">
							<p class="ff-kicker">{item.title}</p>
							<p class="ff-platformCopy ff-mt-3">{item.body}</p>
						</article>
					{/each}
				</div>
			</div>
		</section>

		<section id="revenue" class="ff-section ff-platformSection">
			<div class="ff-container">
				<article class="ff-platformLaneWrap ff-surface">
					<div class="ff-platformSectionHeader">
						<p class="ff-kicker">Revenue lanes</p>
						<h2 class="ff-platformSectionTitle">More ways to raise, recognize, and grow support.</h2>
						<p class="ff-platformCopy">
							FutureFunded is built for more than one-time donations. It gives organizations a cleaner way
							to present sponsor offers, optional recurring support, and a stronger public fundraising
							story.
						</p>
					</div>

					<div class="ff-platformRevenueRibbon" role="list" aria-label="Revenue lanes at a glance">
						<div class="ff-platformRevenueBadge" role="listitem">
							<span class="ff-platformRevenueBadge__title">Donations</span>
							<span class="ff-platformRevenueBadge__body">Fast supporter path</span>
						</div>
						<div class="ff-platformRevenueBadge" role="listitem">
							<span class="ff-platformRevenueBadge__title">Sponsors</span>
							<span class="ff-platformRevenueBadge__body">Visible business packages</span>
						</div>
						<div class="ff-platformRevenueBadge" role="listitem">
							<span class="ff-platformRevenueBadge__title">Recurring</span>
							<span class="ff-platformRevenueBadge__body">Optional steady support</span>
						</div>
					</div>

					<div class="ff-platformLaneGrid">
						{#each sponsorLanes as lane (lane.name)}
							<article class="ff-platformLane">
								<div class="ff-platformLaneHead">
									<div>
										<p class="ff-kicker">{lane.name}</p>
										<h3 class="ff-platformLaneTitle ff-mt-2">{lane.tag}</h3>
									</div>
									<span class="ff-platformLaneAmount">{lane.amount}</span>
								</div>

								<p class="ff-platformCopy ff-mt-3">{lane.body}</p>

								<ul class="ff-platformBulletList ff-mt-4">
									{#each lane.bullets as bullet, i (i)}
										<li>
											<span class="ff-platformMiniMark" aria-hidden="true">•</span>
											<span>{bullet}</span>
										</li>
									{/each}
								</ul>

								<div class="ff-platformProofRow ff-mt-4">
									<span class="ff-platformLaneTag">{lane.tag}</span>
								</div>
							</article>
						{/each}
					</div>
				</article>
			</div>
		</section>

		<section class="ff-section ff-platformSection ff-platformSection--segments">
			<div class="ff-container">
				<div class="ff-platformSectionHeader">
					<p class="ff-kicker">Built for</p>
					<h2 class="ff-platformSectionTitle">
						Organizations that need fundraising to look as serious as their mission.
					</h2>
					<p class="ff-platformCopy">
						The same system supports youth teams, schools, nonprofits, and clubs without feeling generic.
					</p>
				</div>

				<div class="ff-platformIncludeGrid ff-mt-4">
					{#each segments as segment (segment.kicker)}
						<article class="ff-platformIncludeCard">
							<p class="ff-kicker">{segment.kicker}</p>
							<p class="ff-platformRouteTitle ff-platformProofTitle ff-mt-2">{segment.title}</p>
							<p class="ff-platformCopy ff-mt-3">{segment.body}</p>
						</article>
					{/each}
				</div>
			</div>
		</section>

		<section class="ff-section ff-platformSection ff-platformSection--preview">
			<div class="ff-container">
				<div class="ff-platformSectionHeader">
					<p class="ff-kicker">Product preview</p>
					<h2 class="ff-platformSectionTitle">One platform story from setup to launch.</h2>
					<p class="ff-platformCopy">
						The public fundraiser, sponsor offer, and operator controls belong to the same product surface.
					</p>
				</div>

				<div class="ff-platformRouteGrid ff-mt-4">
					{#each previewCards as card (card.kicker)}
						<article class="ff-platformRouteCard">
							<p class="ff-kicker">{card.kicker}</p>
							<p class="ff-platformRouteTitle ff-platformProofTitle ff-mt-2">{card.title}</p>
							<p class="ff-platformBody ff-platformBody--sm ff-mt-2">{card.body}</p>
						</article>
					{/each}
				</div>

				<article class="ff-platformPreviewShell ff-mt-4">
					<div class="ff-platformPreviewShell__head">
						<p class="ff-kicker">Why this product family sells better</p>
						<h3 class="ff-platformProofTitle ff-mt-2">Setup, public page, and operator flow finally feel like the same system.</h3>
					</div>
					<div class="ff-platformPreviewOutcomes">
						{#each previewOutcomes as item (item.title)}
							<div class="ff-platformPreviewOutcome">
								<p class="ff-platformPreviewOutcomeTitle">{item.title}</p>
								<p class="ff-platformBody ff-platformBody--sm ff-mt-2">{item.body}</p>
							</div>
						{/each}
					</div>
				</article>

				<div class="ff-platformProofRow ff-platformProofRow--preview ff-mt-4">
					<button
						type="button"
						class="ff-btn ff-btn--secondary ff-btn--pill"
						onclick={() => goto('/platform/onboarding')}
					>
						Open onboarding
					</button>

					<button
						type="button"
						class="ff-btn ff-btn--secondary ff-btn--pill"
						onclick={() => goto('/platform/dashboard')}
					>
						Open dashboard
					</button>

					<button
						type="button"
						class="ff-btn ff-btn--primary ff-btn--pill"
						onclick={() => goto('/c/connect-atx-elite')}
					>
						View live fundraiser
					</button>
				</div>
			</div>
		</section>

		<section id="pricing" class="ff-section ff-platformSection ff-platformSection--pricing">
			<div class="ff-container">
				<div class="ff-platformSectionHeader">
					<p class="ff-kicker">Pricing</p>
					<h2 class="ff-platformSectionTitle">Start clean. Add sponsor revenue when it fits.</h2>
					<p class="ff-platformCopy">
						The entry tier gets a real public launch live fast. The next tier turns attention into
						structured sponsor revenue.
					</p>
				</div>

				<div class="ff-platformProofRow ff-mt-4">
					<button
						type="button"
						class="ff-btn ff-btn--secondary ff-btn--pill"
						onclick={() => goto('/platform/pricing')}
					>
						Compare plans
					</button>
				</div>

				<div class="ff-platformCompareBar ff-mt-4">
					{#each pricingReasons as item (item.title)}
						<div class="ff-platformCompareItem">
							<p class="ff-platformCompareTitle">{item.title}</p>
							<p class="ff-platformCompareBody">{item.body}</p>
						</div>
					{/each}
				</div>

				<div class="ff-platformPricingGrid">
					{#each tiers as tier (tier.key)}
						<article class={`ff-platformTier ${tier.featured ? 'ff-platformTier--featured' : ''}`}>
							<div class="ff-platformTierHead">
								<div>
									<p class="ff-kicker">{tier.name}</p>
									<p class="ff-platformTierPrice">{tier.price}</p>
								</div>

								{#if tier.badge}
									<span class={`ff-pill ${tier.featured ? 'ff-platformTag ff-platformTag--soft' : 'ff-platformTag'}`}>
										{tier.badge}
									</span>
								{/if}
							</div>

							<p class="ff-platformCopy ff-mt-4">{tier.body}</p>

							<p class="ff-platformTierCallout ff-mt-3">
								{tier.featured
									? 'Best for sponsor revenue, recurring support, and a more premium launch motion.'
									: 'Best for getting a branded public fundraiser live with the least setup friction.'}
							</p>

							<ul class="ff-platformBulletList ff-mt-4">
								{#each tier.bullets as bullet, i (i)}
									<li>
										<span class="ff-platformMiniMark" aria-hidden="true">•</span>
										<span>{bullet}</span>
									</li>
								{/each}
							</ul>

							<div class="ff-platformTierNote">
								<span>
									{tier.featured
										? 'Built to monetize sponsors and recurring support.'
										: 'Built to launch one polished public page fast.'}
								</span>
							</div>

							<div class="ff-platformTierActions">
								<button
									type="button"
									class={tier.featured
										? 'ff-btn ff-btn--primary ff-btn--pill'
										: 'ff-btn ff-btn--secondary ff-btn--pill'}
									onclick={() => goto('/platform/onboarding')}
								>
									{tier.cta}
								</button>
							</div>
						</article>
					{/each}
				</div>
			</div>
		</section>

		<section id="faq" class="ff-section ff-platformSection ff-platformSection--faq">
			<div class="ff-container">
				<div class="ff-platformSectionHeader">
					<p class="ff-kicker">FAQ</p>
					<h2 class="ff-platformSectionTitle">Everything a buyer usually asks first.</h2>
					<p class="ff-platformCopy">
						Keep the story simple and credible before someone books a demo or starts setup.
					</p>
				</div>

				<div class="ff-platformFaqList ff-mt-4">
					{#each faqs as item (item.q)}
						<details class="ff-disclosure ff-platformFaqDisclosure">
							<summary class="ff-disclosure__sum">
								<span>{item.q}</span>
								<span aria-hidden="true">+</span>
							</summary>
							<div class="ff-disclosure__panel">
								<p class="ff-platformCopy ff-m-0">{item.a}</p>
							</div>
						</details>
					{/each}
				</div>
			</div>
		</section>

		<footer class="ff-section ff-platformSection">
			<div class="ff-container">
				<div class="ff-platformFooterCard ff-surface">
					<div class="ff-platformFooterGrid">
						<div>
							<p class="ff-kicker">Next move</p>
							<h2 class="ff-platformSectionTitle ff-mt-3">Launch one polished fundraiser that actually looks buyable.</h2>
							<p class="ff-platformCopy ff-mt-4">
								Start with a premium public page, then add sponsor packages and recurring support when
								the organization is ready.
							</p>
						</div>

						<div class="ff-platformFooterActions">
							<button
								type="button"
								class="ff-btn ff-btn--primary ff-btn--pill"
								onclick={() => goto('/platform/onboarding')}
							>
								Start guided launch
							</button>

							<button
								type="button"
								class="ff-btn ff-btn--secondary ff-btn--pill"
								onclick={() => goto('/platform/dashboard')}
							>
								Open dashboard
							</button>
						</div>
					</div>
				</div>
			</div>
		</footer>
	</main>
</div>

