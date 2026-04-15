<script lang="ts">
	import '$lib/styles/ff.css';
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import StripeCheckoutPanel from '$lib/components/campaign/StripeCheckoutPanel.svelte';
	import { mountFFPage, toggleFFTheme } from '$lib/utils/ff-theme';

	type PageData = {
		persistedSponsors?: Array<{
			id: string;
			business: string;
			email?: string;
			tier: string;
			campaignName?: string;
			orgName?: string;
		}>;
		mode?: string;
		countdownLabel?: string;
		countdownTarget?: string;
	};

	let { data = {} as PageData }: { data?: PageData } = $props();

	type QuickAmount = { amount: number; meta: string };
	type ImpactChoice = { amount: number; label: string; note: string; featured?: boolean };
	type TeamCard = {
		id: string;
		name: string;
		tier: string;
		meta: string;
		ask: string;
		raised: number;
		goal: number;
		featured?: boolean;
	};
	type SponsorTier = {
		key: string;
		label: string;
		amount: number;
		badge: string;
		sub: string;
		fit: string;
		recognition: string;
		cta: string;
		primary?: boolean;
	};
	type FAQ = { q: string; a: string };
	type PersistedSponsor = {
		id: string;
		business: string;
		email?: string;
		tier: string;
		campaignName?: string;
		orgName?: string;
	};
	type LeaderboardEntry = {
		id: string;
		rank: number;
		name: string;
		tier: string;
		amount: number;
		note: string;
		paid: boolean;
	};

	const campaign = {
		orgName: 'Connect ATX Elite',
		campaignName: 'Spring Fundraiser',
		location: 'Austin, TX',
		headline: 'Fuel the season. Fund the future.',
		supportingName: 'Connect ATX Elite',
		tagline:
			'Support travel, training, tournament fees, and shared season costs with one clean fundraiser for donors and sponsors.',
		storyLead:
			'This fundraiser covers the shared program: travel, training, tournaments, team costs, and season support that keeps athletes competing together.',
		announcement:
			'New sponsor visibility, live leaderboard placement, and secure donation checkout are now live.',
		countdownLabel: 'Next tournament weekend',
		countdownTarget: '2026-05-24T09:00:00-05:00',
		raised: 5175,
		goal: 10000,
		donorCount: 73,
		teamsCount: 4,
		seasonLabel: 'AAU season support',
		organizerEmail: 'support@getfuturefunded.com'
	};

	const quickAmounts: QuickAmount[] = [
		{ amount: 35, meta: 'Quick support' },
		{ amount: 75, meta: 'Most common' },
		{ amount: 150, meta: 'Team travel' },
		{ amount: 250, meta: 'Season lift' }
	];

	const impactChoices: ImpactChoice[] = [
		{ amount: 25, label: 'Quick gift', note: 'Helps cover shared season costs.' },
		{
			amount: 50,
			label: 'Most common',
			note: 'Supports travel and practice costs.',
			featured: true
		},
		{ amount: 100, label: 'Stronger lift', note: 'Helps cover tournament entry and gym time.' },
		{ amount: 250, label: 'Major lift', note: 'Moves a larger season expense forward.' }
	];

	const supportCovers = [
		{
			title: 'Tournament fees',
			body: 'Entry costs for league weekends, local events, and out-of-town tournament runs.'
		},
		{
			title: 'Gym time',
			body: 'Practice space, training sessions, and shared development costs across the program.'
		},
		{
			title: 'Gear',
			body: 'Uniforms, recovery tools, travel-day essentials, and program support needs.'
		}
	];

	const teams: TeamCard[] = [
		{
			id: '6g',
			name: '6th Grade Gold',
			tier: 'Gold',
			meta: 'First AAU reps — fundamentals + communication.',
			ask: 'Support helps cover shared program costs and keeps development moving for the full group.',
			raised: 1225,
			goal: 2500,
			featured: true
		},
		{
			id: '7g',
			name: '7th Grade Gold',
			tier: 'Gold',
			meta: 'Speed + spacing — film + pressure reps.',
			ask: 'Support helps with travel, weekend fees, and more training reps through the season.',
			raised: 1480,
			goal: 2500,
			featured: true
		},
		{
			id: '7b',
			name: '7th Grade Black',
			tier: 'Black',
			meta: 'Defense travels — stops into transition.',
			ask: 'Support helps cover team meals, uniforms, and game-day essentials.',
			raised: 980,
			goal: 2500
		},
		{
			id: '8g',
			name: '8th Grade Gold',
			tier: 'Gold',
			meta: 'Finish strong — intensity + leadership.',
			ask: 'Support helps with gym time, tournament runs, and final-season development work.',
			raised: 1490,
			goal: 2500
		}
	];

	const sponsorTiers: SponsorTier[] = [
		{
			key: 'community',
			label: 'Community',
			amount: 100,
			badge: 'Entry',
			sub: 'Entry sponsor tier',
			fit: 'Families, alumni, and local supporters who want a simple sponsor step with visible community support.',
			recognition: 'Business name listed on the page and included in sponsor appreciation.',
			cta: 'Choose Community'
		},
		{
			key: 'partner',
			label: 'Partner',
			amount: 250,
			badge: 'Recommended',
			sub: 'Recommended sponsor tier',
			fit: 'Businesses that want clear community alignment and stronger placement.',
			recognition:
				'Logo or business name on the sponsor wall with stronger placement and cleaner visibility.',
			cta: 'Choose Partner',
			primary: true
		},
		{
			key: 'champion',
			label: 'Champion',
			amount: 500,
			badge: 'Expanded visibility',
			sub: 'Featured partner tier',
			fit: 'Sponsors ready to move the season forward with broader visibility.',
			recognition:
				'Featured sponsor-wall placement and stronger recognition across the campaign surface.',
			cta: 'Choose Champion'
		},
		{
			key: 'vip',
			label: 'VIP',
			amount: 1000,
			badge: 'Top visibility',
			sub: 'Top visibility tier',
			fit: 'Sponsors looking for the clearest featured placement and strongest visibility.',
			recognition:
				'Premium placement, VIP spotlight visibility, and stronger recognition where available.',
			cta: 'Choose VIP',
			primary: true
		}
	];

	const faqs: FAQ[] = [
		{
			q: 'How fast can someone donate?',
			a: 'Most supporters can choose an amount, enter details, and finish support in about a minute.'
		},
		{
			q: 'Can businesses sponsor instead of donating?',
			a: 'Yes. The page supports sponsor interest and tiered visibility so local businesses have a clearer reason to say yes.'
		},
		{
			q: 'Is this support for one athlete or the whole program?',
			a: 'This page tells the shared program story. Team cards show who the program serves while the fundraiser supports the broader season.'
		},
		{
			q: 'Will supporters get a receipt?',
			a: 'Yes. Supporters receive confirmation at checkout and a receipt by email.'
		}
	];

	const sponsorTierAmounts: Record<string, number> = {
		vip: 1000,
		champion: 500,
		partner: 250,
		community: 100
	};

	let theme = $state<'dark' | 'light'>('dark');
	let drawerOpen = $state(false);
	let sponsorOpen = $state(false);
	let embeddedCheckoutActive = $state(false);
	let donationComplete = $state(false);
	let checkoutResultDismissed = $state(false);
	let sponsorResultDismissed = $state(false);

	let amount = $state(75);
	let donorName = $state('');
	let donorEmail = $state('');
	let donorMessage = $state('');
	let checkoutStatus = $state('');

	let sponsorTier = $state('partner');
	let sponsorBusiness = $state('');
	let sponsorContact = $state('');
	let sponsorEmail = $state('');
	let sponsorStatus = $state('');

	let countdown = $state({
		live: false,
		days: '00',
		hours: '00',
		minutes: '00',
		seconds: '00'
	});

	const slug = $derived(page.params.slug || 'connect-atx-elite');
	const pageMode = $derived(
		(('mode' in data && typeof data.mode === 'string' ? data.mode : 'live').toLowerCase() ===
		'preview')
			? 'preview'
			: 'live'
	);
	const persistedSponsors = $derived((data?.persistedSponsors ?? []) as PersistedSponsor[]);
	const checkoutResult = $derived(page.url.searchParams.get('checkout')?.toLowerCase() ?? '');
	const sponsorResult = $derived(page.url.searchParams.get('sponsor')?.toLowerCase() ?? '');
	const checkoutSuccess = $derived(!checkoutResultDismissed && checkoutResult === 'success');
	const checkoutCancelled = $derived(!checkoutResultDismissed && checkoutResult === 'cancelled');
	const sponsorSuccess = $derived(!sponsorResultDismissed && sponsorResult === 'success');
	const sponsorCancelled = $derived(!sponsorResultDismissed && sponsorResult === 'cancelled');
	const latestPersistedSponsor = $derived(
		sponsorSuccess && persistedSponsors.length ? persistedSponsors[0] : null
	);
	const sponsorDisplayBusiness = $derived(
		latestPersistedSponsor?.business || sponsorBusiness || 'Sponsor'
	);
	const sponsorDisplayEmail = $derived(latestPersistedSponsor?.email || sponsorEmail || '');
	const sponsorDisplayTier = $derived(latestPersistedSponsor?.tier || sponsorTier);
	const selectedSponsorTier = $derived(
		sponsorTiers.find((item) => item.key === sponsorDisplayTier) ??
			sponsorTiers.find((item) => item.key === sponsorTier) ??
			sponsorTiers[1]
	);
	const sponsorTierLabel = $derived(selectedSponsorTier.label);
	const sponsorBenefit = $derived(selectedSponsorTier.recognition);
	const sponsorSuccessState = $derived(
		sponsorSuccess || sponsorStatus.toLowerCase().startsWith('sponsor secured')
	);
	const sponsorCancelledState = $derived(
		sponsorCancelled || sponsorStatus.toLowerCase().includes('cancelled')
	);
	const checkoutCancelledState = $derived(
		checkoutCancelled || checkoutStatus.toLowerCase().includes('cancelled')
	);
	const percent = $derived(
		Math.max(0, Math.min(100, Math.floor((campaign.raised / campaign.goal) * 100)))
	);
	const remaining = $derived(Math.max(0, campaign.goal - campaign.raised));
	const nextPush = $derived(
		remaining >= 1500 ? 250 : remaining >= 600 ? 150 : remaining > 0 ? remaining : 100
	);
	const summaryAmount = $derived(money(amount));
	const modePill = $derived(pageMode === 'preview' ? 'Preview surface' : 'Live fundraiser');
	const announcementCopy = $derived(
		pageMode === 'preview'
			? 'Preview mode is on. Brand, copy, sponsor tiers, and payments can still be tuned before launch.'
			: campaign.announcement
	);
	const countdownLabel = $derived(
		(typeof data?.countdownLabel === 'string' && data.countdownLabel.trim()) || campaign.countdownLabel
	);
	const countdownTargetIso = $derived(
		(typeof data?.countdownTarget === 'string' && data.countdownTarget.trim()) || campaign.countdownTarget
	);
	const leaderboardEntries = $derived(
		persistedSponsors.length
			? [...persistedSponsors]
					.sort(
						(a, b) =>
							(sponsorTierAmounts[b.tier?.toLowerCase()] ?? 0) -
							(sponsorTierAmounts[a.tier?.toLowerCase()] ?? 0)
					)
					.map((sponsor, index) => ({
						id: sponsor.id,
						rank: index + 1,
						name: sponsor.business,
						tier:
							sponsorTiers.find((item) => item.key === sponsor.tier?.toLowerCase())?.label ??
							sponsor.tier,
						amount: sponsorTierAmounts[sponsor.tier?.toLowerCase()] ?? 0,
						note: sponsor.orgName || campaign.orgName,
						paid: true
					}))
			: [...sponsorTiers]
					.sort((a, b) => b.amount - a.amount)
					.map((tier, index) => ({
						id: tier.key,
						rank: index + 1,
						name: `${tier.label} tier`,
						tier: tier.label,
						amount: tier.amount,
						note: 'Open placement available',
						paid: false
					}))
	) as LeaderboardEntry[];
	const liveSponsorSpotlight = $derived(
		sponsorSuccessState
			? {
					business: sponsorDisplayBusiness,
					tier: sponsorTierLabel,
					badge:
						sponsorDisplayTier === 'vip'
							? 'Top spotlight'
							: sponsorDisplayTier === 'champion'
								? 'Featured sponsor'
								: sponsorDisplayTier === 'partner'
									? 'Priority placement'
									: 'Sponsor wall',
					headline:
						sponsorDisplayTier === 'vip'
							? 'Now featured in the top sponsor spotlight.'
							: sponsorDisplayTier === 'champion'
								? 'Now featured with stronger campaign visibility.'
								: sponsorDisplayTier === 'partner'
									? 'Now highlighted with clearer sponsor placement.'
									: 'Now listed in the live sponsor wall.',
					body: sponsorBenefit
				}
			: null
	);

	function money(value: number) {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			maximumFractionDigits: 0
		}).format(value);
	}

	function percentFor(team: TeamCard) {
		return Math.max(0, Math.min(100, Math.floor((team.raised / team.goal) * 100)));
	}

	function pad(value: number) {
		return String(Math.max(0, value)).padStart(2, '0');
	}

	function updateCountdown() {
		const targetMs = Date.parse(countdownTargetIso);
		if (Number.isNaN(targetMs)) {
			countdown = { live: false, days: '00', hours: '00', minutes: '00', seconds: '00' };
			return;
		}

		const diff = Math.max(0, targetMs - Date.now());
		const totalSeconds = Math.floor(diff / 1000);
		const days = Math.floor(totalSeconds / 86400);
		const hours = Math.floor((totalSeconds % 86400) / 3600);
		const minutes = Math.floor((totalSeconds % 3600) / 60);
		const seconds = totalSeconds % 60;

		countdown = {
			live: diff > 0,
			days: pad(days),
			hours: pad(hours),
			minutes: pad(minutes),
			seconds: pad(seconds)
		};
	}

	function scrollToId(id: string) {
		if (!browser) return;
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	function resetDonationFeedback() {
		donationComplete = false;
		checkoutResultDismissed = true;
		checkoutStatus = '';
	}

	function applyAmountPreset(value: number) {
		amount = value;
		embeddedCheckoutActive = false;
		resetDonationFeedback();
		scrollToId('checkout');
	}

	async function shareCampaign() {
		const url = browser
			? new URL(window.location.href)
			: new URL(`https://getfuturefunded.com/c/${slug}`);
		url.search = '';
		url.hash = '';
		const shareUrl = url.toString();
		const text = `Support ${campaign.orgName} — ${campaign.headline}`;

		try {
			if (browser && navigator.share) {
				await navigator.share({
					title: `${campaign.orgName} Fundraiser`,
					text,
					url: shareUrl
				});
			} else if (browser && navigator.clipboard) {
				await navigator.clipboard.writeText(shareUrl);
				checkoutStatus = 'Campaign link copied to clipboard.';
			} else {
				checkoutStatus = 'Campaign link is ready to share.';
			}
		} catch {
			checkoutStatus = 'Share was cancelled.';
		}
	}

	function openSponsor(tier?: string) {
		sponsorResultDismissed = true;
		sponsorStatus = '';
		if (tier) sponsorTier = tier;
		sponsorOpen = true;
	}

	function closeSponsor() {
		sponsorResultDismissed = true;
		sponsorOpen = false;
	}

	function submitDonation() {
		donationComplete = false;
		checkoutResultDismissed = true;

		if (amount < 5 || donorName.trim().length < 2 || !/\S+@\S+\.\S+/.test(donorEmail.trim())) {
			embeddedCheckoutActive = false;
			checkoutStatus =
				'Please review the donation amount, supporter name, and receipt email before continuing.';
			return;
		}

		embeddedCheckoutActive = true;
		checkoutStatus = '';
	}

	async function submitSponsorInterest() {
		sponsorStatus = '';
		sponsorResultDismissed = true;

		if (
			!sponsorBusiness.trim() ||
			sponsorBusiness.trim().length < 2 ||
			!sponsorContact.trim() ||
			sponsorContact.trim().length < 2 ||
			!/\S+@\S+\.\S+/.test(sponsorEmail.trim())
		) {
			sponsorStatus =
				'Please complete the business name, contact name, and business email before continuing.';
			return;
		}

		try {
			sponsorStatus = 'Redirecting to secure sponsor checkout…';

			const response = await fetch(`/c/${slug}/sponsor`, {
				method: 'POST',
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify({
					sponsorTier,
					sponsorBusiness: sponsorBusiness.trim(),
					sponsorContact: sponsorContact.trim(),
					sponsorEmail: sponsorEmail.trim(),
					orgName: campaign.orgName || 'Connect ATX Elite',
					campaignName: campaign.campaignName || campaign.headline || 'Spring Fundraiser'
				})
			});

			const body = (await response.json()) as { url?: string; error?: string };

			if (!response.ok) {
				throw new Error(body?.error || 'Sponsor checkout could not start.');
			}

			if (!body?.url) {
				throw new Error('Sponsor checkout did not return a payment URL.');
			}

			if (browser) {
				window.location.href = body.url;
				return;
			}

			sponsorStatus = 'Sponsor checkout URL created, but browser redirect is unavailable.';
		} catch (error) {
			sponsorStatus =
				error instanceof Error
					? error.message
					: 'Sponsor checkout could not start. Please try again.';
		}
	}

	function toggleTheme() {
		theme = toggleFFTheme(theme, {
			page: 'fundraiser',
			template: 'fundraiser',
			brand: 'connect-atx-elite',
			themePreset: 'core',
			dataMode: pageMode,
			canonical: `https://getfuturefunded.com/c/${slug}`,
			shareUrl: `https://getfuturefunded.com/c/${slug}`,
			returnUrl: `https://getfuturefunded.com/c/${slug}`
		});
	}

	onMount(() => {
		updateCountdown();
		const timer = window.setInterval(updateCountdown, 1000);

		if (sponsorSuccess) {
			sponsorStatus = 'Sponsor secured. Thank you for backing the program.';
			sponsorOpen = true;
		} else if (sponsorCancelled) {
			sponsorStatus =
				'Sponsor checkout was cancelled. You can review the tier and try again when you are ready.';
			sponsorOpen = true;
		}

		theme = mountFFPage('fundraiser', {
			brand: 'connect-atx-elite',
			themePreset: 'core',
			dataMode: pageMode,
			canonical: `https://getfuturefunded.com/c/${slug}`,
			shareUrl: `https://getfuturefunded.com/c/${slug}`,
			returnUrl: `https://getfuturefunded.com/c/${slug}`
		});

		if (checkoutSuccess) {
			donationComplete = true;
			checkoutStatus = 'Donation received. Thank you for backing the program.';
			setTimeout(() => scrollToId('checkout'), 0);
		} else if (checkoutCancelled) {
			checkoutStatus =
				'Donation checkout was cancelled. You can review the amount and try again anytime.';
			setTimeout(() => scrollToId('checkout'), 0);
		}

		return () => {
			window.clearInterval(timer);
		};
	});
</script>

<svelte:head>
	<title>{campaign.orgName} • {campaign.campaignName}</title>
	<meta name="description" content={campaign.tagline} />
</svelte:head>

<nav class="ff-skiplinks" aria-label="Skip links">
	<a href="#content" class="ff-skip">Skip to content</a>
	<a href="#checkout" class="ff-skip">Skip to checkout</a>
	<a href="#faq" class="ff-skip">Skip to FAQ</a>
</nav>

<div class="ff-shell" data-ff-shell="">
	<div class="ff-shellBg" aria-hidden="true"></div>

	<header class="ff-chrome" data-ff-chrome="">
		<nav class="ff-topbar ff-campaignHeader" id="ffTopbar" data-ff-topbar="" aria-label="Campaign header">
			<div class="ff-container">
				<div class="ff-campaignHeader__shell ff-surface">
					<div class="ff-campaignHeader__row ff-campaignHeader__row--top">
						<div class="ff-campaignHeader__brand">
							<a
								class="ff-platformBrand ff-platformBrand--mark ff-nounderline"
								href="/platform"
								aria-label="FutureFunded platform"
							>
								<span class="ff-platformBrand__disc" aria-hidden="true">FF</span>
								<span class="ff-sr">FutureFunded</span>
							</a>

							<a
								class="ff-topbarBrand ff-topbarBrand--flagship ff-nounderline ff-campaignHeader__org"
								href="#home"
								data-ff-home=""
								aria-label={`${campaign.orgName} fundraiser home`}
							>
								<div class="ff-topbarBrand__logo" aria-hidden="true">CA</div>

								<span class="ff-topbarBrand__stack ff-minw-0">
									<span class="ff-topbarBrand__text">{campaign.orgName}</span>
									<span class="ff-topbarBrand__sub">{campaign.location}</span>
								</span>

								<span class="ff-pill ff-pill--ghost ff-topbarBrand__pill" aria-label={modePill}>
									{modePill}
								</span>
							</a>
						</div>

						<div class="ff-campaignHeader__controls">
							<nav class="ff-campaignHeader__nav ff-topbar__desktop-only" aria-label="Primary navigation">
								<a class="ff-nav__link" href="#impact">Impact</a>
								<a class="ff-nav__link" href="#teams">Teams</a>
								<a class="ff-nav__link" href="#sponsors">Sponsors</a>
								<a class="ff-nav__link" href="#story">Story</a>
								<a class="ff-nav__link" href="#faq">Help</a>
							</nav>

							<div class="ff-campaignHeader__utility">
								<button
									type="button"
									class="ff-btn ff-btn--sm ff-btn--ghost ff-btn--pill ff-btn--quiet ff-themeToggle"
									data-ff-theme-toggle=""
									aria-label="Toggle color theme"
									aria-pressed={theme === 'light'}
									onclick={toggleTheme}
								>
									<span class="ff-themeToggle__glyph" aria-hidden="true">◐</span>
									<span class="ff-themeToggle__label">Theme</span>
								</button>

								<a
									class="ff-btn ff-btn--sm ff-btn--primary ff-btn--pill ff-btn--topCta ff-donate-btn"
									href="#checkout"
									aria-controls="checkout"
									data-ff-donate=""
									data-ff-open-checkout=""
								>
									Donate
								</a>

								<button
									type="button"
									class="ff-iconbtn ff-campaignHeader__menu ff-topbar__mobile-only"
									data-ff-open-drawer=""
									aria-controls="ffDrawerPanel"
									aria-expanded={drawerOpen}
									aria-label="Open menu"
									onclick={() => (drawerOpen = true)}
								>
									<span aria-hidden="true">☰</span>
									<span class="ff-sr">Open menu</span>
								</button>
							</div>
						</div>
					</div>

					<section class="ff-announcement" aria-label="Campaign announcements">
						<div class="ff-announcement__inner">
							<div class="ff-announcement__copy">
								<span class="ff-pill ff-pill--soft">{pageMode === 'preview' ? 'Preview' : 'Now live'}</span>
								<span class="ff-announcement__text">{announcementCopy}</span>
							</div>
							<div class="ff-announcement__meta">
								<span class="ff-pill ff-pill--ghost">Mobile-first</span>
								<span class="ff-pill ff-pill--ghost">Sponsor leaderboard</span>
								<span class="ff-pill ff-pill--ghost">Receipt-ready checkout</span>
							</div>
						</div>
					</section>

					<section
						class="ff-topbarGoal ff-campaignHeader__goal ff-densityGoalbar"
						data-ff-goalbar=""
						role="group"
						aria-label="Fundraising progress"
					>
						<div class="ff-topbarGoal__summary" data-ff-topbar-metrics="" aria-label="Raised, goal, and progress">
							<div class="ff-topbarGoal__metric ff-topbarGoal__metric--raised">
								<span class="ff-topbarGoal__label">Raised</span>
								<span class="ff-topbarGoal__raised ff-num" data-ff-raised="">{money(campaign.raised)}</span>
							</div>

							<div class="ff-topbarGoal__metric ff-topbarGoal__metric--goal">
								<span class="ff-topbarGoal__label">Goal</span>
								<span class="ff-topbarGoal__goal ff-num" data-ff-goal="">{money(campaign.goal)}</span>
							</div>

							<div class="ff-topbarGoal__metric ff-topbarGoal__metric--progress">
								<span class="ff-topbarGoal__label">Progress</span>
								<span class="ff-topbarGoal__percent ff-num" data-ff-percent="">{percent}%</span>
							</div>
						</div>

						<div class="ff-topbarGoal__progressWrap">
							<div class="ff-row ff-row--between ff-ais ff-gap-2 ff-wrap ff-topbarGoal__metaRow">
								<span class="ff-topbarGoal__progressLabel">Fundraising progress</span>
								<span class="ff-help ff-muted">Secure checkout • sponsor-ready • mobile-first</span>
							</div>

							<div class="ff-meter" data-ff-meter="" role="group" aria-label="Fundraising progress meter">
								<progress
									class="ff-meter__progress"
									max="100"
									value={percent}
									data-ff-pct=""
									aria-label="Fundraising progress"
								>
									{percent}%
								</progress>
							</div>
						</div>
					</section>
				</div>
			</div>
		</nav>
	</header>

	{#if drawerOpen}
		<aside id="drawer" class="ff-drawer" data-ff-drawer="" data-open="true" aria-hidden="false">
			<div
				id="ffDrawerPanel"
				class="ff-drawer__panel"
				role="dialog"
				aria-modal="true"
				aria-labelledby="ffDrawerTitle"
				tabindex="-1"
			>
				<header class="ff-drawer__head">
					<div class="ff-brand">
						<div class="ff-drawer__orgLogo" aria-hidden="true">CA</div>
						<div class="ff-minw-0">
							<div class="ff-brand__title" id="ffDrawerTitle">{campaign.orgName}</div>
							<div class="ff-brand__sub">{campaign.location}</div>
						</div>
					</div>

					<button
						type="button"
						class="ff-iconbtn ff-drawer__close ff-sheet__close"
						data-ff-close-drawer=""
						aria-label="Close menu"
						onclick={() => (drawerOpen = false)}
					>
						<span aria-hidden="true">✕</span>
					</button>
				</header>

				<div class="ff-drawer__body">
					<nav class="ff-drawer__block" aria-label="Drawer navigation">
						<ul class="ff-drawer__grid" role="list">
							<li><a class="ff-drawer__link" href="#impact" onclick={() => (drawerOpen = false)}>Impact</a></li>
							<li><a class="ff-drawer__link" href="#teams" onclick={() => (drawerOpen = false)}>Teams</a></li>
							<li><a class="ff-drawer__link" href="#sponsors" onclick={() => (drawerOpen = false)}>Sponsors</a></li>
							<li><a class="ff-drawer__link" href="#story" onclick={() => (drawerOpen = false)}>Story</a></li>
							<li><a class="ff-drawer__link" href="#faq" onclick={() => (drawerOpen = false)}>Help</a></li>
						</ul>
					</nav>

					<section class="ff-drawer__trust" role="note" aria-label="Drawer trust note">
						<p class="ff-drawer__trustTitle ff-m-0">Support with confidence</p>
						<p class="ff-drawer__trustText ff-mt-1 ff-mb-0">
							Secure checkout, clear progress, and sponsor-friendly support options.
						</p>
					</section>

					<div class="ff-row ff-wrap ff-gap-2 ff-mt-3" role="group" aria-label="Drawer quick actions">
						<button
							type="button"
							class="ff-btn ff-btn--sm ff-btn--ghost ff-btn--pill ff-btn--quiet ff-themeToggle"
							data-ff-theme-toggle=""
							aria-label="Toggle dark mode"
							aria-pressed={theme === 'light'}
							onclick={toggleTheme}
						>
							<span class="ff-themeToggle__glyph" aria-hidden="true">◐</span>
							<span class="ff-themeToggle__label">Theme</span>
						</button>

						<button
							type="button"
							class="ff-btn ff-btn--sm ff-btn--ghost ff-btn--pill"
							data-ff-share=""
							aria-label="Share this fundraiser"
							onclick={shareCampaign}
						>
							Share
						</button>
					</div>

					<div class="ff-stack ff-mt-3" role="group" aria-label="Drawer conversion actions">
						<button
							type="button"
							class="ff-btn ff-btn--secondary ff-btn--pill"
							data-ff-open-sponsor=""
							onclick={() => {
								drawerOpen = false;
								openSponsor();
							}}
						>
							Sponsor the program
						</button>

						<a
							class="ff-btn ff-btn--primary ff-btn--pill ff-donate-btn"
							href="#checkout"
							data-ff-donate=""
							data-ff-open-checkout=""
							onclick={() => (drawerOpen = false)}
						>
							Donate
						</a>
					</div>
				</div>
			</div>

			<button
				type="button"
				class="ff-drawer__backdrop ff-sheet__close"
				data-ff-close-drawer=""
				aria-label="Close menu"
				onclick={() => (drawerOpen = false)}
			></button>
		</aside>
	{/if}

	<main id="content" class="ff-main" data-ff-main="" data-ff-page-root="" tabindex="-1">
		<section
			id="home"
			class="ff-section ff-section--hero ff-hero ff-campaignHero"
			data-ff-section="hero"
			aria-labelledby="heroTitle"
			aria-describedby="heroLead"
		>
			<div class="ff-container ff-hero__shell">
				<div class="ff-hero__grid">
					<div class="ff-minw-0">
						<article class="ff-hero__capsule ff-surface ff-campaignHero__story" data-ff-animate="rise">
							<div class="ff-hero__capsuleInner">
								<header class="ff-heroHeader">
									<div class="ff-heroMeta" role="list" aria-label="Campaign highlights">
										<span class="ff-pill ff-pill--soft" role="listitem">{campaign.orgName}</span>
										<span class="ff-pill ff-pill--ghost" role="listitem">{campaign.location}</span>
										<span class="ff-pill ff-pill--ghost" role="listitem">{campaign.teamsCount} teams</span>
										<span class="ff-pill ff-pill--ghost" role="listitem">Sponsor-ready</span>
									</div>

									<h1 class="ff-display ff-heroTitle" id="heroTitle">
										<span class="ff-heroLine">{campaign.headline}</span>
										<span class="ff-heroAccent ff-heroLine" id="heroAccentLine">
											{campaign.campaignName}
										</span>
									</h1>

									<p class="ff-lead ff-heroLead" id="heroLead">{campaign.tagline}</p>

									<div class="ff-grid ff-grid--3 ff-gap-2 ff-mt-3 ff-heroSnapshotGrid" role="list" aria-label="Campaign snapshot">
										<div class="ff-proofMini ff-proofMini--hero" role="listitem">
											<p class="ff-kicker ff-m-0">Raised</p>
											<p class="ff-h3 ff-mt-1 ff-mb-0 ff-num" data-ff-raised="">{money(campaign.raised)}</p>
											<p class="ff-help ff-muted ff-mt-1 ff-mb-0">Support already moving into the season.</p>
										</div>

										<div class="ff-proofMini ff-proofMini--hero" role="listitem">
											<p class="ff-kicker ff-m-0">Goal</p>
											<p class="ff-h3 ff-mt-1 ff-mb-0 ff-num" data-ff-goal="">{money(campaign.goal)}</p>
											<p class="ff-help ff-muted ff-mt-1 ff-mb-0">Travel, training, and competition costs.</p>
										</div>

										<div class="ff-proofMini ff-proofMini--hero" role="listitem">
											<p class="ff-kicker ff-m-0">Next push</p>
											<p class="ff-h3 ff-mt-1 ff-mb-0 ff-num">{money(nextPush)}</p>
											<p class="ff-help ff-muted ff-mt-1 ff-mb-0">A practical milestone supporters can close fast.</p>
										</div>
									</div>

									<div class="ff-countdownCard ff-card ff-card--soft ff-card--tight">
										<div class="ff-row ff-row--between ff-wrap ff-ais">
											<div>
												<p class="ff-kicker ff-m-0">Countdown</p>
												<h2 class="ff-h3 ff-mt-1 ff-mb-0">{countdownLabel}</h2>
											</div>
											<span class={`ff-pill ${countdown.live ? 'ff-pill--soft' : 'ff-pill--ghost'}`}>
												{countdown.live ? 'Approaching fast' : 'Started'}
											</span>
										</div>

										<div class="ff-countdownGrid" role="list" aria-label="Event countdown">
											<div class="ff-countdownUnit" role="listitem">
												<span class="ff-countdownUnit__value">{countdown.days}</span>
												<span class="ff-countdownUnit__label">Days</span>
											</div>
											<div class="ff-countdownUnit" role="listitem">
												<span class="ff-countdownUnit__value">{countdown.hours}</span>
												<span class="ff-countdownUnit__label">Hours</span>
											</div>
											<div class="ff-countdownUnit" role="listitem">
												<span class="ff-countdownUnit__value">{countdown.minutes}</span>
												<span class="ff-countdownUnit__label">Minutes</span>
											</div>
											<div class="ff-countdownUnit" role="listitem">
												<span class="ff-countdownUnit__value">{countdown.seconds}</span>
												<span class="ff-countdownUnit__label">Seconds</span>
											</div>
										</div>
									</div>
								</header>

								<div class="ff-grid ff-grid--2 ff-gap-2" role="list" aria-label="Trust and sponsor proof">
									<div class="ff-proofMini ff-proofMini--checkout" role="listitem">
										<p class="ff-kicker ff-m-0">Why supporters trust this page</p>
										<p class="ff-help ff-muted ff-mt-1 ff-mb-0">
											Clear progress, secure checkout, and a cleaner page families, alumni, and donors can trust immediately.
										</p>
									</div>

									<div class="ff-proofMini ff-proofMini--checkout" role="listitem">
										<p class="ff-kicker ff-m-0">Why businesses sponsor</p>
										<p class="ff-help ff-muted ff-mt-1 ff-mb-0">
											Visible recognition, featured placement, and clear follow-up for local businesses and community partners.
										</p>
									</div>
								</div>

								<footer class="ff-heroFooter">
									<nav class="ff-heroCtas ff-heroCtas--flagship" aria-label="Primary actions">
										<a
											class="ff-btn ff-btn--primary ff-btn--lg ff-btn--pill ff-donate-btn"
											href="#checkout"
											data-ff-donate=""
											data-ff-open-checkout=""
										>
											Donate securely now
										</a>

										<button
											type="button"
											class="ff-btn ff-btn--secondary ff-btn--lg ff-btn--pill"
											data-ff-open-sponsor=""
											onclick={() => openSponsor()}
										>
											Sponsor the program
										</button>

										<button
											type="button"
											class="ff-btn ff-btn--ghost ff-btn--lg ff-btn--pill"
											data-ff-share=""
											aria-label="Share this fundraiser"
											onclick={shareCampaign}
										>
											Share
										</button>
									</nav>

									<p class="ff-help ff-mutedStrong ff-mt-2 ff-mb-0 ff-heroTrustCue">
										Secure checkout • No account required • Receipt-ready flow
									</p>
								</footer>
							</div>
						</article>
					</div>

					<aside class="ff-heroPanel ff-heroPanel--flagship" data-ff-hero-panel="" aria-labelledby="heroPanelTitle">
						<article
							class="ff-card ff-card--premium ff-card--lift ff-pad ff-campaignHero__checkout"
							data-ff-animate="rise"
							id="checkout"
						>
							<header class="ff-heroPanelHead">
								<div class="ff-row ff-row--between ff-ais ff-wrap ff-gap-2">
									<div class="ff-minw-0">
										<p class="ff-kicker ff-m-0">Donate</p>
										<h2 class="ff-h2 ff-mt-1 ff-mb-0" id="heroPanelTitle">Support the season</h2>
									</div>
									<span class="ff-pill ff-pill--soft">{percent}% funded</span>
								</div>

								<p class="ff-help ff-muted ff-mt-1 ff-mb-0">
									Choose an amount, then confirm securely in checkout. Most supporters can complete support in just a few simple steps.
								</p>
							</header>

							<div class="ff-grid ff-grid--2 ff-gap-2" role="group" aria-label="Quick donation amounts">
								{#each quickAmounts as item (item.amount)}
									<button
										type="button"
										class="ff-chip ff-chip--pill"
										data-ff-amount={item.amount}
										aria-label={`Preload ${item.amount} dollars`}
										onclick={() => applyAmountPreset(item.amount)}
									>
										<span class="ff-chip__amt">${item.amount}</span>
										<span class="ff-chip__meta">{item.meta}</span>
									</button>
								{/each}
							</div>

							<form
								class="ff-stack"
								id="donationForm"
								onsubmit={(e) => {
									e.preventDefault();
									submitDonation();
								}}
								aria-describedby="checkoutStatus"
							>
								<input
									class="ff-input"
									type="number"
									name="amount"
									min="1"
									step="1"
									required
									bind:value={amount}
									data-ff-amount-input=""
									aria-label="Donation amount"
								/>

								<input
									class="ff-input"
									type="text"
									name="donorName"
									minlength="2"
									required
									placeholder="Your name"
									bind:value={donorName}
									data-ff-donor-name=""
									aria-label="Donor name"
								/>

								<input
									class="ff-input"
									type="email"
									name="donorEmail"
									required
									placeholder="Email receipt"
									bind:value={donorEmail}
									data-ff-email=""
									aria-label="Donor email"
								/>

								<textarea
									class="ff-input"
									name="donorMessage"
									rows="4"
									placeholder="Optional note"
									bind:value={donorMessage}
									data-ff-message=""
									aria-label="Optional donor note"
								></textarea>

								<div class="ff-checkoutSummary ff-proofMini ff-proofMini--checkout">
									<p class="ff-kicker ff-m-0">Summary amount</p>
									<p class="ff-h3 ff-mt-1 ff-mb-0" data-ff-summary-amount="">{summaryAmount}</p>
									<p class="ff-help ff-muted ff-mt-1 ff-mb-0">
										This amount carries into secure payment and email receipt confirmation.
									</p>
									<p class="ff-help ff-mutedStrong ff-mt-1 ff-mb-0">
										Secure donation handoff • fast supporter flow • receipt-ready confirmation
									</p>
								</div>

								<div class="ff-checkoutCtas">
									<button type="submit" class="ff-btn ff-btn--primary ff-btn--pill ff-btn--lg">
										Donate securely now
									</button>

									<button
										type="button"
										class="ff-btn ff-btn--secondary ff-btn--pill ff-btn--lg"
										data-ff-open-sponsor=""
										onclick={() => openSponsor('partner')}
									>
										Sponsor instead
									</button>
								</div>

								<p class="ff-help ff-mutedStrong ff-mt-2 ff-mb-0">
									Secure payment, clear confirmation, and receipt-ready follow-up.
								</p>

								{#if embeddedCheckoutActive}
									<div data-ff-embedded-checkout>
										{#key `${amount}:${donorName}:${donorEmail}:${donorMessage}`}
											<StripeCheckoutPanel
												slug={slug}
												amount={amount}
												donorName={donorName}
												donorEmail={donorEmail}
												donorMessage={donorMessage}
												orgName={campaign.orgName}
												campaignName={campaign.campaignName}
												active={embeddedCheckoutActive}
												on:ready={() => {
													checkoutStatus = 'Secure payment is ready.';
												}}
												on:error={(e) => {
													checkoutStatus = e.detail.message;
												}}
												on:success={() => {
													donationComplete = true;
													embeddedCheckoutActive = false;
													checkoutStatus = 'Donation received. Thank you for backing the program.';
													setTimeout(() => scrollToId('checkout'), 0);
												}}
											/>
										{/key}
									</div>
								{/if}

								{#if donationComplete}
									<div
										id="checkoutStatus"
										class="ff-successCard"
										data-ff-checkout-status=""
										role="status"
										aria-live="polite"
									>
										<div class="ff-successCard__icon" aria-hidden="true">🏀</div>
										<h3 class="ff-successCard__title">You just helped power the season.</h3>
										<p class="ff-successCard__body">
											Your support directly helps fund travel, training, tournament fees, and shared team costs.
										</p>

										<div class="ff-successCard__meta" role="list" aria-label="Donation summary">
											<div class="ff-successCard__metaItem" role="listitem">
												<span class="ff-successCard__label">Amount</span>
												<strong>{summaryAmount}</strong>
											</div>
											<div class="ff-successCard__metaItem" role="listitem">
												<span class="ff-successCard__label">Supporter</span>
												<strong>{donorName || 'Supporter'}</strong>
											</div>
										</div>

										<p class="ff-help ff-mutedStrong ff-mt-2 ff-mb-0">
											A receipt was sent to {donorEmail || 'your email'}.
										</p>

										<div class="ff-successCard__actions">
											<button type="button" class="ff-btn ff-btn--primary ff-btn--pill" onclick={shareCampaign}>
												Share fundraiser
											</button>

											<button type="button" class="ff-btn ff-btn--secondary ff-btn--pill" onclick={() => openSponsor()}>
												Sponsor the program
											</button>
										</div>
									</div>
								{:else if checkoutCancelledState}
									<div id="checkoutStatus" class="ff-alert ff-alert--warn" data-ff-checkout-status="" role="alert">
										{checkoutStatus}
									</div>
								{:else if checkoutStatus}
									<div
										id="checkoutStatus"
										class="ff-alert ff-alert--info"
										data-ff-checkout-status=""
										role="status"
										aria-live="polite"
									>
										{checkoutStatus}
									</div>
								{/if}
							</form>
						</article>
					</aside>
				</div>
			</div>
		</section>

		<section id="impact" class="ff-section" aria-labelledby="impactTitle">
			<div class="ff-container">
				<header class="ff-sectionhead ff-sectionIntro ff-stack ff-stack--tight" aria-labelledby="impactTitle">
					<p class="ff-kicker ff-m-0">Support levels</p>
					<h2 class="ff-h2 ff-mt-2 ff-mb-0" id="impactTitle">Support moves the season forward.</h2>
					<p class="ff-lead ff-mt-2 ff-mb-0">
						Pick a support level that helps cover travel, training, tournament fees, and shared season costs.
					</p>
				</header>

				<div class="ff-grid ff-grid--2 ff-gap-3 ff-mt-3">
					<article class="ff-card ff-pad">
						<p class="ff-kicker ff-m-0">Choose a support level</p>
						<div class="ff-impactChoiceGrid ff-mt-3">
							{#each impactChoices as item (item.amount)}
								<button
									type="button"
									class={`ff-chip ff-chip--impact ${item.featured ? 'ff-card--premium' : ''}`}
									onclick={() => applyAmountPreset(item.amount)}
								>
									<span class="ff-impactChoice__amt">{money(item.amount)}</span>
									<span class="ff-impactChoice__meta">{item.label} — {item.note}</span>
								</button>
							{/each}
						</div>
					</article>

					<article class="ff-card ff-pad">
						<p class="ff-kicker ff-m-0">This support helps cover</p>
						<div class="ff-stack ff-mt-3">
							{#each supportCovers as item (item.title)}
								<div class="ff-proofMini ff-proofMini--checkout">
									<p class="ff-h3 ff-m-0">{item.title}</p>
									<p class="ff-help ff-muted ff-mt-1 ff-mb-0">{item.body}</p>
								</div>
							{/each}
						</div>
					</article>
				</div>

				<div class="ff-statStrip ff-mt-3">
					<div class="ff-proofMini ff-proofMini--checkout">
						<p class="ff-kicker ff-m-0">Support raised so far</p>
						<p class="ff-h3 ff-mt-1 ff-mb-0">{money(campaign.raised)}</p>
						<p class="ff-help ff-muted ff-mt-1 ff-mb-0">Momentum is already building.</p>
					</div>

					<div class="ff-proofMini ff-proofMini--checkout">
						<p class="ff-kicker ff-m-0">Donor count</p>
						<p class="ff-h3 ff-mt-1 ff-mb-0">{campaign.donorCount}</p>
						<p class="ff-help ff-muted ff-mt-1 ff-mb-0">Community support is showing up.</p>
					</div>

					<div class="ff-proofMini ff-proofMini--checkout">
						<p class="ff-kicker ff-m-0">Still to goal</p>
						<p class="ff-h3 ff-mt-1 ff-mb-0">{money(remaining)}</p>
						<p class="ff-help ff-muted ff-mt-1 ff-mb-0">Help close the next real season milestone.</p>
					</div>
				</div>
			</div>
		</section>

		<section id="teams" class="ff-section" aria-labelledby="teamsTitle">
			<div class="ff-container">
				<header class="ff-sectionhead" aria-labelledby="teamsTitle">
					<p class="ff-kicker ff-m-0">Teams in the program</p>
					<h2 class="ff-h2 ff-mt-2 ff-mb-0" id="teamsTitle">Support the athletes behind the fundraiser</h2>
					<p class="ff-help ff-muted ff-mt-2 ff-mb-0">
						Team cards show who the program serves while the support story stays centered on the shared season fund.
					</p>
				</header>

				<div class="ff-teamGrid ff-mt-3 ff-campaignTeamsGrid">
					{#each teams as team (team.id)}
						<article class={`ff-teamCard ${team.featured ? 'ff-card--premium' : ''}`}>
							<div class="ff-teamCard__inner ff-pad">
								<header class="ff-teamCard__head">
									<div class="ff-row ff-row--between ff-wrap ff-ais">
										<div>
											<p class="ff-kicker ff-m-0">{team.tier} team</p>
											<h3 class="ff-h3 ff-mt-1 ff-mb-0">{team.name}</h3>
										</div>

										<span class="ff-pill ff-pill--ghost">{percentFor(team)}%</span>
									</div>

									<p class="ff-help ff-muted ff-m-0">{team.meta}</p>
								</header>

								<div class="ff-teamCard__media" aria-hidden="true">
									<span class="ff-teamCard__mediaBadge">{team.tier}</span>
									<div class="ff-teamCard__mediaBody">
										<div class="ff-teamCard__mediaName">{team.name}</div>
										<div class="ff-teamCard__mediaMeta">Program spotlight</div>
									</div>
								</div>

								<div class="ff-teamCard__stats">
									<div class="ff-teamStat">
										<span class="ff-teamStat__label">Raised</span>
										<span class="ff-teamStat__value">{money(team.raised)}</span>
									</div>
									<div class="ff-teamStat">
										<span class="ff-teamStat__label">Goal</span>
										<span class="ff-teamStat__value">{money(team.goal)}</span>
									</div>
									<div class="ff-teamStat">
										<span class="ff-teamStat__label">Progress</span>
										<span class="ff-teamStat__value">{percentFor(team)}%</span>
									</div>
								</div>

								<div class="ff-teamCard__meter">
									<progress class="ff-teamCard__meterBar" value={percentFor(team)} max="100"></progress>
									<span class="ff-teamCard__meterText">{team.ask}</span>
								</div>

								<div class="ff-teamCard__foot">
									<button
										type="button"
										class="ff-btn ff-btn--secondary ff-btn--pill"
										onclick={() => applyAmountPreset(100)}
									>
										Support {team.name}
									</button>

									<button
										type="button"
										class="ff-btn ff-btn--ghost ff-btn--pill"
										data-ff-share=""
										onclick={shareCampaign}
									>
										Share
									</button>
								</div>
							</div>
						</article>
					{/each}
				</div>
			</div>
		</section>

		<section id="sponsors" class="ff-section" aria-labelledby="sponsorsTitle">
			<div class="ff-container">
				<header class="ff-sectionhead ff-stack ff-stack--tight" aria-labelledby="sponsorsTitle">
					<p class="ff-kicker ff-m-0">Sponsors</p>
					<h2 class="ff-h2 ff-mt-2 ff-mb-0" id="sponsorsTitle">Become a visible sponsor</h2>
					<p class="ff-help ff-muted ff-mt-2 ff-mb-0">
						Businesses can support the season with clear recognition, fast checkout, and a more credible public presence.
					</p>

					<div class="ff-card ff-card--tight ff-stack ff-stack--tight">
						<p class="ff-kicker ff-m-0">Sponsor readiness</p>
						<h3 class="ff-h3 ff-mt-2 ff-mb-0">Back the program. Be seen supporting it.</h3>
						<p class="ff-copy ff-mt-2 ff-mb-0">
							Local businesses can sponsor the season through a clean checkout path with visible recognition on the fundraiser.
						</p>
						<div class="ff-chipRow">
							<span class="ff-pill ff-pill--ghost">Fast sponsor checkout</span>
							<span class="ff-pill ff-pill--ghost">Clear recognition</span>
							<span class="ff-pill ff-pill--ghost">Business-friendly support</span>
						</div>
					</div>
				</header>

				<div class="ff-grid ff-grid--2 ff-gap-3 ff-mt-3">
					<article class="ff-card ff-pad ff-sponsorLeaderboard" aria-label="Sponsor leaderboard">
						<div class="ff-row ff-row--between ff-wrap ff-ais">
							<div class="ff-minw-0">
								<p class="ff-kicker ff-m-0">Sponsor leaderboard</p>
								<h3 class="ff-h3 ff-mt-1 ff-mb-0">
									{persistedSponsors.length ? 'Live paid sponsors' : 'Available sponsor placements'}
								</h3>
							</div>
							<span class="ff-pill ff-pill--soft">
								{persistedSponsors.length ? `${persistedSponsors.length} paid` : 'Open now'}
							</span>
						</div>

						<div class="ff-leaderboardList">
							{#each leaderboardEntries as entry (entry.id)}
								<div class={`ff-leaderboardRow ${entry.rank === 1 ? 'ff-leaderboardRow--top' : ''} ${entry.paid ? 'ff-leaderboardRow--paid' : 'ff-leaderboardRow--open'}`}>
									<div class="ff-leaderboardRank" aria-hidden="true">{entry.rank}</div>
									<div class="ff-leaderboardMain">
										<div class="ff-leaderboardName">{entry.name}</div>
										<div class="ff-leaderboardMeta">{entry.tier} • {entry.note}</div>
									</div>
									<div class="ff-leaderboardSide">
										<div class="ff-leaderboardAmount">
											{entry.amount ? money(entry.amount) : '—'}
										</div>
										<span class={`ff-pill ${entry.paid ? 'ff-pill--soft' : 'ff-pill--ghost'}`}>{entry.paid ? 'Paid' : 'Open'}</span>
									</div>
								</div>
							{/each}
						</div>

						<p class="ff-help ff-muted ff-mb-0">
							Top packages receive the strongest placement, while every paid sponsor remains visible on the public page.
						</p>
					</article>

					<article class="ff-card ff-pad">
						<p class="ff-kicker ff-m-0">Why businesses sponsor</p>
						<div class="ff-stack ff-mt-3">
							<div class="ff-proofMini ff-proofMini--checkout">
								<p class="ff-h3 ff-m-0">Cleaner local visibility</p>
								<p class="ff-help ff-muted ff-mt-1 ff-mb-0">
									Local businesses get a stronger presentation than a generic donation ask.
								</p>
							</div>
							<div class="ff-proofMini ff-proofMini--checkout">
								<p class="ff-h3 ff-m-0">Better sponsor story</p>
								<p class="ff-help ff-muted ff-mt-1 ff-mb-0">
									Recognition, placement, and community alignment are easier to explain and easier to say yes to.
								</p>
							</div>
							<div class="ff-proofMini ff-proofMini--checkout">
								<p class="ff-h3 ff-m-0">Premium path to purchase</p>
								<p class="ff-help ff-muted ff-mt-1 ff-mb-0">
									Choose a tier, complete payment, and land directly in a polished sponsor confirmation state.
								</p>
							</div>
						</div>
					</article>
				</div>

				{#if persistedSponsors.length}
					<article class="ff-card ff-pad ff-mt-3" aria-label="Persisted sponsor wall">
						<div class="ff-row ff-row--between ff-wrap ff-ais ff-gap-2">
							<div class="ff-minw-0">
								<p class="ff-kicker ff-m-0">Paid sponsors</p>
								<h3 class="ff-h3 ff-mt-1 ff-mb-0">Live sponsor wall</h3>
							</div>
							<span class="ff-pill ff-pill--ghost">{persistedSponsors.length} active</span>
						</div>

						<div class="ff-grid ff-grid--2 ff-gap-2 ff-mt-3">
							{#each persistedSponsors as sponsor (sponsor.id)}
								<div class="ff-proofMini ff-proofMini--checkout">
									<p class="ff-kicker ff-m-0">{sponsor.tier.toUpperCase()}</p>
									<p class="ff-h3 ff-mt-1 ff-mb-0">{sponsor.business}</p>
									<p class="ff-help ff-muted ff-mt-1 ff-mb-0">{sponsor.campaignName} • {sponsor.orgName}</p>
								</div>
							{/each}
						</div>
					</article>
				{/if}

				{#if liveSponsorSpotlight}
					<article
						class="ff-card ff-pad ff-card--premium ff-mt-3 ff-sponsorSpotlightLive"
						data-ff-live-sponsor-spotlight=""
						aria-label="Live sponsor spotlight"
					>
						<div class="ff-row ff-row--between ff-wrap ff-ais ff-gap-2">
							<div class="ff-minw-0">
								<p class="ff-kicker ff-m-0">Live sponsor spotlight</p>
								<h3 class="ff-h3 ff-mt-1 ff-mb-0">{liveSponsorSpotlight.business}</h3>
							</div>
							<span class="ff-pill ff-pill--soft">{liveSponsorSpotlight.badge}</span>
						</div>

						<p class="ff-help ff-mutedStrong ff-mt-2 ff-mb-0">{liveSponsorSpotlight.headline}</p>

						<div class="ff-proofMini ff-proofMini--checkout">
							<p class="ff-kicker ff-m-0">Included with this tier</p>
							<p class="ff-help ff-muted ff-mt-1 ff-mb-0">{liveSponsorSpotlight.body}</p>
						</div>
					</article>
				{/if}

				<div class="ff-impactTierGrid ff-mt-3 ff-campaignSponsorGrid">
					{#each sponsorTiers as tier (tier.key)}
						<article class={`ff-impactTier ${tier.primary ? 'ff-impactTier--premium' : ''}`}>
							<div class="ff-impactTier__head">
								<div class="ff-row ff-row--between ff-ais ff-wrap">
									<p class="ff-kicker ff-m-0">{tier.label}</p>
									<span class={`ff-pill ${tier.primary ? 'ff-pill--soft' : 'ff-pill--ghost'}`}>{tier.badge}</span>
								</div>
								<h3 class="ff-h3 ff-mt-1 ff-mb-0">{money(tier.amount)}</h3>
								<p class="ff-help ff-muted ff-m-0">{tier.sub}</p>
							</div>

							<div class="ff-impactTier__body">
								<p class="ff-help ff-muted ff-m-0">{tier.fit}</p>
								<p class="ff-help ff-muted ff-m-0">{tier.recognition}</p>
							</div>

							<div class="ff-impactTier__footer">
								<button
									type="button"
									class={`ff-btn ${tier.primary ? 'ff-btn--primary' : 'ff-btn--secondary'} ff-btn--pill`}
									data-ff-open-sponsor=""
									onclick={() => openSponsor(tier.key)}
								>
									{tier.cta}
								</button>
							</div>
						</article>
					{/each}
				</div>
			</div>
		</section>

		<section id="story" class="ff-section" aria-labelledby="storyTitle">
			<div class="ff-container">
				<div class="ff-grid ff-grid--2 ff-gap-3">
					<article class="ff-card ff-pad">
						<p class="ff-kicker ff-m-0">Story</p>
						<h2 class="ff-h2 ff-mt-2 ff-mb-0" id="storyTitle">A season built on reps, travel, and shared support.</h2>
						<p class="ff-help ff-muted ff-mt-2 ff-mb-0">{campaign.storyLead}</p>
						<div class="ff-row ff-wrap ff-gap-2 ff-mt-3">
							<a class="ff-btn ff-btn--primary ff-btn--pill" href="#checkout">Donate securely now</a>
							<button type="button" class="ff-btn ff-btn--secondary ff-btn--pill" onclick={() => openSponsor()}>
								Sponsor the program
							</button>
						</div>
					</article>

					<article class="ff-card ff-pad">
						<p class="ff-kicker ff-m-0">Why this page matters</p>
						<div class="ff-stack ff-mt-3">
							<div class="ff-proofMini ff-proofMini--checkout">
								<p class="ff-h3 ff-m-0">Cleaner donor trust from first click</p>
								<p class="ff-help ff-muted ff-mt-1 ff-mb-0">
									The page is designed to feel clear, credible, and easy to support.
								</p>
							</div>
							<div class="ff-proofMini ff-proofMini--checkout">
								<p class="ff-h3 ff-m-0">Better sponsor conversations for local businesses</p>
								<p class="ff-help ff-muted ff-mt-1 ff-mb-0">
									Businesses can choose a tier, complete checkout, and understand what recognition comes next.
								</p>
							</div>
							<div class="ff-proofMini ff-proofMini--checkout">
								<p class="ff-h3 ff-m-0">Launch-ready mobile flow</p>
								<p class="ff-help ff-muted ff-mt-1 ff-mb-0">
									The core conversion path stays compact, thumb-friendly, and easy to finish on phones.
								</p>
							</div>
						</div>
					</article>
				</div>
			</div>
		</section>

		<section id="faq" class="ff-section" aria-labelledby="faqTitle">
			<div class="ff-container">
				<header class="ff-sectionhead ff-sectionIntro ff-stack ff-stack--tight" aria-labelledby="faqTitle">
					<p class="ff-kicker ff-m-0">FAQ</p>
					<h2 class="ff-h2 ff-mt-2 ff-mb-0" id="faqTitle">Everything supporters and sponsors usually ask</h2>
				</header>

				<div class="ff-faqList ff-mt-3">
					{#each faqs as item (item.q)}
						<details class="ff-disclosure">
							<summary class="ff-disclosure__sum">
								<span>{item.q}</span>
								<span aria-hidden="true">+</span>
							</summary>
							<div class="ff-disclosure__panel">
								<p class="ff-help ff-muted ff-m-0">{item.a}</p>
							</div>
						</details>
					{/each}
				</div>
			</div>
		</section>

		<footer id="footer" class="ff-section" aria-labelledby="footerTitle">
			<div class="ff-container">
				<div class="ff-footerShell ff-surface">
					<div class="ff-footerGrid">
						<div class="ff-footerBrand">
							<p class="ff-kicker ff-m-0">FutureFunded</p>
							<h2 class="ff-h2 ff-mt-2 ff-mb-0" id="footerTitle">
								A cleaner way to raise, brand, and grow support
							</h2>
							<p class="ff-help ff-muted ff-mt-2 ff-mb-0">
								This page is built to make giving, sponsoring, and sharing feel clear from the first click.
							</p>
						</div>

						<div class="ff-stack">
							<a class="ff-btn ff-btn--primary ff-btn--pill" href="#checkout">Donate securely now</a>
							<button type="button" class="ff-btn ff-btn--secondary ff-btn--pill" onclick={() => openSponsor()}>
								Sponsor the program
							</button>
							<button type="button" class="ff-btn ff-btn--ghost ff-btn--pill" onclick={shareCampaign}>
								Share fundraiser
							</button>
						</div>
					</div>
				</div>
			</div>
		</footer>
	</main>

	{#if sponsorOpen}
		<div class="ff-modal" data-ff-sponsor-modal="">
			<div class="ff-modal__panel ff-card ff-pad">
				<div class="ff-row ff-row--between ff-ais ff-wrap">
					<div>
						<p class="ff-kicker ff-m-0">Sponsor the program</p>
						<h2 class="ff-h2 ff-mt-2 ff-mb-0">Complete sponsor checkout</h2>
					</div>

					<button
						type="button"
						class="ff-iconbtn"
						data-ff-close-sponsor=""
						aria-label="Close sponsor modal"
						onclick={closeSponsor}
					>
						✕
					</button>
				</div>

				<div class="ff-proofMini ff-proofMini--checkout ff-mt-3">
					<p class="ff-kicker ff-m-0">Selected sponsor package</p>
					<p class="ff-h3 ff-mt-1 ff-mb-0">{selectedSponsorTier.label} • {money(selectedSponsorTier.amount)}</p>
					<p class="ff-help ff-muted ff-mt-1 ff-mb-0">{selectedSponsorTier.recognition}</p>
				</div>

				<form
					class="ff-stack ff-mt-3"
					id="sponsorForm"
					onsubmit={(e) => {
						e.preventDefault();
						submitSponsorInterest();
					}}
				>
					<input
						class="ff-input"
						type="text"
						placeholder="Business name"
						bind:value={sponsorBusiness}
						aria-label="Business name"
					/>

					<input
						class="ff-input"
						type="text"
						placeholder="Contact name"
						bind:value={sponsorContact}
						aria-label="Contact name"
					/>

					<input
						class="ff-input"
						type="email"
						placeholder="Business email"
						bind:value={sponsorEmail}
						aria-label="Business email"
					/>

					<button type="submit" class="ff-btn ff-btn--primary ff-btn--pill">
						Continue to sponsor checkout
					</button>

					<p class="ff-help ff-mutedStrong ff-mt-2 ff-mb-0">
						Secure sponsor checkout • clear confirmation • clean follow-up after payment.
					</p>

					{#if sponsorSuccessState}
						<div class="ff-successCard ff-mt-3" data-ff-sponsor-status="" role="status" aria-live="polite">
							<div class="ff-successCard__icon" aria-hidden="true">🏆</div>
							<h3 class="ff-successCard__title">Your business just backed the season.</h3>
							<p class="ff-successCard__body">
								Thank you for sponsoring {campaign.orgName}. Your support helps fund travel, training, tournaments, and shared program costs.
							</p>

							<div class="ff-successCard__meta" role="list" aria-label="Sponsor summary">
								<div class="ff-successCard__metaItem" role="listitem">
									<span class="ff-successCard__label">Tier</span>
									<strong>{sponsorTierLabel}</strong>
								</div>
								<div class="ff-successCard__metaItem" role="listitem">
									<span class="ff-successCard__label">Business</span>
									<strong>{sponsorDisplayBusiness}</strong>
								</div>
							</div>

							<p class="ff-help ff-mutedStrong ff-mt-2 ff-mb-0">
								A confirmation was sent to {sponsorDisplayEmail || 'your email'}.
							</p>

							<div class="ff-proofMini ff-proofMini--checkout ff-mt-2" aria-label="Sponsor tier benefits">
								<p class="ff-kicker ff-m-0">Included with this tier</p>
								<p class="ff-help ff-muted ff-mt-1 ff-mb-0">{sponsorBenefit}</p>
							</div>

							<p class="ff-help ff-muted ff-mt-2 ff-mb-0">
								Next step: finalize logo, recognition, and placement details for this sponsor tier.
							</p>

							<div class="ff-successCard__actions">
								<button type="button" class="ff-btn ff-btn--primary ff-btn--pill" onclick={closeSponsor}>
									Done
								</button>

								<button type="button" class="ff-btn ff-btn--secondary ff-btn--pill" onclick={shareCampaign}>
									Share fundraiser
								</button>
							</div>
						</div>
					{:else if sponsorCancelledState}
						<div class="ff-alert ff-alert--warn" data-ff-sponsor-status="" role="alert">{sponsorStatus}</div>
					{:else if sponsorStatus}
						<div class="ff-alert ff-alert--info" data-ff-sponsor-status="" role="status" aria-live="polite">
							{sponsorStatus}
						</div>
					{/if}
				</form>
			</div>
		</div>
	{/if}
</div>

