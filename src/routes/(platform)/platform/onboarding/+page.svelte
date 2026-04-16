<script lang="ts">
	import '$lib/styles/ff.css';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { onMount, tick } from 'svelte';
	import { mountFFPage, toggleFFTheme } from '$lib/utils/ff-theme';
	import { loadLaunchState, saveLaunchState, slugifyOrgName } from '$lib/config/ff-launch-state';

	type Step = {
		id: number;
		label: string;
		title: string;
		body: string;
	};

	type PromiseItem = {
		title: string;
		body: string;
	};

	type LaneCard = {
		key: 'donation' | 'sponsor' | 'recurring';
		title: string;
		body: string;
		active: boolean;
	};

	const steps: Step[] = [
		{
			id: 1,
			label: 'Organization',
			title: 'Start with the organization basics.',
			body: 'Set the name, org type, and launch context so the fundraiser starts with a credible public foundation.'
		},
		{
			id: 2,
			label: 'Brand',
			title: 'Brand it clearly.',
			body: 'Apply the brand so the fundraiser looks credible the first time someone opens it.'
		},
		{
			id: 3,
			label: 'Campaign',
			title: 'Tell the story clearly.',
			body: 'Name the fundraiser, set the goal, and explain what support covers so people understand it fast.'
		},
		{
			id: 4,
			label: 'Revenue',
			title: 'Choose revenue lanes.',
			body: 'Choose donations, sponsors, and recurring support when you want more than one revenue lane.'
		},
		{
			id: 5,
			label: 'Review',
			title: 'Review and publish.',
			body: 'Review the preview, confirm the setup, and publish when the page is ready.'
		}
	];

	const setupProof: PromiseItem[] = [
		{
			title: 'Guided launch flow',
			body: 'Organization, brand, campaign, revenue, and review stay in one calmer workspace.'
		},
		{
			title: 'Preview before publish',
			body: 'Operators can review the donor-facing page before payments and promotion go live.'
		},
		{
			title: 'Sponsor-capable from setup',
			body: 'Revenue lanes are chosen during setup so the fundraiser is not retrofitted later.'
		}
	];

	const previewBenefits: PromiseItem[] = [
		{
			title: 'Credible on first open',
			body: 'Brand, goal, story, and location show up together in one cleaner donor surface.'
		},
		{
			title: 'Sponsor-ready path',
			body: 'Donation, sponsor, and recurring lanes are visible before launch day.'
		},
		{
			title: 'Operator confidence',
			body: 'Preview now, publish later, and keep setup changes grounded in the live page.'
		}
	];

	const publishChecks: PromiseItem[] = [
		{
			title: 'Brand locked',
			body: 'Name, colors, logo text, and launch context are aligned.'
		},
		{
			title: 'Story ready',
			body: 'Campaign title, goal, and support message are clear.'
		},
		{
			title: 'Revenue chosen',
			body: 'Donation, sponsor, and recurring lanes match the launch plan.'
		}
	];

	const launch = loadLaunchState();

	let drawerOpen = $state(false);
	let activeStep = $state(1);
	let theme = $state<'dark' | 'light'>('dark');
	let launchNotice = $state('');
	let drawerPanel = $state<HTMLDivElement | null>(null);
	let drawerTrigger = $state<HTMLButtonElement | null>(null);

	let orgName = $state(launch.orgName || 'Connect ATX Elite');
	let orgType = $state('Youth team');
	let location = $state('Austin, TX');

	let logoText = $state('CA');
	let brandColor = $state('#f97316');
	let accentColor = $state('#38bdf8');

	let campaignTitle = $state('Spring Fundraiser');
	let fundraisingGoal = $state(launch.fundraisingGoal || '10000');
	let shortStory = $state(
		'Support travel, training, tournament fees, and shared season costs with one clean, sponsor-ready fundraiser.'
	);

	let donationLane = $state(true);
	let sponsorLane = $state(launch.sponsorLane ?? true);
	let recurringLane = $state(launch.recurringLane ?? false);

	const selectedStep = $derived(steps[activeStep - 1] ?? steps[0]);

	const previewGoalValue = $derived(Math.max(0, Number(fundraisingGoal || '0') || 0));

	const previewGoalLabel = $derived(
		new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			maximumFractionDigits: 0
		}).format(previewGoalValue)
	);

	const previewSlug = $derived(slugifyOrgName(orgName || 'connect-atx-elite'));

	const previewUrl = $derived(`/c/${previewSlug}`);

	const liveLaneCount = $derived(
		Number(donationLane) + Number(sponsorLane) + Number(recurringLane)
	);

	const publishReady = $derived(
		orgName.trim().length > 1 &&
			campaignTitle.trim().length > 1 &&
			previewGoalValue > 0 &&
			shortStory.trim().length > 20 &&
			liveLaneCount > 0
	);

	const laneCards = $derived<LaneCard[]>([
		{
			key: 'donation',
			title: 'Donations',
			body: 'One-time supporter contributions on the public page.',
			active: donationLane
		},
		{
			key: 'sponsor',
			title: 'Sponsors',
			body: 'Business-facing packages with clearer public recognition.',
			active: sponsorLane
		},
		{
			key: 'recurring',
			title: 'Recurring support',
			body: 'Optional monthly support for organizations with a longer revenue plan.',
			active: recurringLane
		}
	]);

	function nextStep() {
		activeStep = Math.min(activeStep + 1, steps.length);
	}

	function prevStep() {
		activeStep = Math.max(activeStep - 1, 1);
	}

	function goToStep(step: number) {
		activeStep = Math.min(Math.max(step, 1), steps.length);
	}

	function toggleTheme() {
		theme = toggleFFTheme(theme, {
			page: 'onboarding',
			template: 'platform',
			brand: 'connect-atx-elite',
			themePreset: 'core',
			dataMode: 'preview'
		});
	}

	function openPreview() {
		goto(previewUrl);
	}

	function openDashboard() {
		goto('/platform/dashboard');
	}

	function launchWorkspace() {
		if (!publishReady) {
			launchNotice =
				'Finish the organization basics, campaign title, fundraising goal, story, and at least one revenue lane before publishing.';
			activeStep = 1;
			return;
		}

		saveLaunchState({
			...loadLaunchState(),
			orgName,
			fundraisingGoal,
			sponsorLane,
			recurringLane,
			dataMode: 'preview',
			updatedAt: new Date().toISOString()
		});

		launchNotice =
			'Setup is launch-ready. Next: confirm payments, validate sponsor lanes, and publish with confidence.';
	}

	async function openDrawer() {
		drawerOpen = true;
		await tick();
		drawerPanel?.focus();
	}

	function closeDrawer() {
		drawerOpen = false;
		tick().then(() => drawerTrigger?.focus());
	}

	function handleWindowKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && drawerOpen) {
			closeDrawer();
		}
	}

	function toggleLane(key: LaneCard['key']) {
		if (key === 'donation') donationLane = !donationLane;
		if (key === 'sponsor') sponsorLane = !sponsorLane;
		if (key === 'recurring') recurringLane = !recurringLane;
	}

	$effect(() => {
		saveLaunchState({
			...loadLaunchState(),
			orgName,
			fundraisingGoal,
			sponsorLane,
			recurringLane,
			dataMode: 'preview',
			updatedAt: new Date().toISOString()
		});
	});

	$effect(() => {
		if (!browser) return;

		const previous = document.body.style.overflow;
		document.body.style.overflow = drawerOpen ? 'hidden' : previous;

		return () => {
			document.body.style.overflow = previous;
		};
	});

	onMount(() => {
		theme = mountFFPage('onboarding', {
			brand: 'connect-atx-elite',
			themePreset: 'core',
			dataMode: 'preview'
		});
	});
</script>

<svelte:window onkeydown={handleWindowKeydown} />

<svelte:head>
	<title>FutureFunded Onboarding</title>
	<meta
		name="description"
		content="Set up branding, campaign story, support lanes, and launch settings from the FutureFunded onboarding workspace."
	/>
</svelte:head>

<nav class="ff-skiplinks" aria-label="Skip links">
	<a href="#content" class="ff-skip">Skip to content</a>
</nav>

<div class="ff-onboardingPage">
	<div class="ff-onboardingPage__inner">
		<header class="ff-appbar">
			<div class="ff-container">
				<div class="ff-appbar__inner ff-surface">
					<div class="ff-onboardingTopbar">
						<div class="ff-brand ff-minw-0">
							<div class="ff-brand__mark" aria-hidden="true">FF</div>

							<div class="ff-brand__meta ff-minw-0">
								<p class="ff-brand__title">FutureFunded</p>
								<p class="ff-onboardingMeta">Launch workspace</p>
							</div>

							<span class="ff-pill ff-pill--ghost">Onboarding</span>
						</div>

						<nav class="ff-actions ff-desktopOnly" aria-label="Onboarding navigation">
							<button
								type="button"
								class="ff-btn ff-btn--secondary ff-btn--sm ff-btn--quiet"
								onclick={() => goto('/platform')}
							>
								Back to platform
							</button>

							<button
								type="button"
								class="ff-btn ff-btn--secondary ff-btn--sm ff-btn--quiet"
								onclick={openPreview}
							>
								View live fundraiser
							</button>

							<button
								type="button"
								class="ff-btn ff-btn--secondary ff-btn--sm ff-btn--quiet"
								onclick={openDashboard}
							>
								Dashboard
							</button>

							<button
								type="button"
								class="ff-btn ff-btn--secondary ff-btn--sm ff-btn--quiet ff-themeToggle"
								aria-label="Toggle color theme"
								aria-pressed={theme === 'light'}
								onclick={toggleTheme}
							>
								<span class="ff-themeToggle__glyph" aria-hidden="true">◐</span>
								<span class="ff-themeToggle__label">Theme</span>
							</button>

							<button
								type="button"
								class="ff-btn ff-btn--secondary ff-btn--sm ff-btn--topCtaMuted"
								onclick={launchWorkspace}
							>
								Publish fundraiser
							</button>
						</nav>

						<div class="ff-actions ff-mobileOnly">
							<button
								type="button"
								class="ff-btn ff-btn--secondary ff-btn--sm ff-btn--quiet ff-themeToggle"
								aria-label="Toggle color theme"
								aria-pressed={theme === 'light'}
								onclick={toggleTheme}
							>
								<span class="ff-themeToggle__glyph" aria-hidden="true">◐</span>
							</button>

							<button
								type="button"
								class="ff-btn ff-btn--secondary ff-btn--sm ff-btn--topCtaMuted"
								onclick={launchWorkspace}
							>
								Publish
							</button>

							<button
								bind:this={drawerTrigger}
								type="button"
								class="ff-btn ff-btn--secondary ff-btn--sm"
								aria-label="Open menu"
								aria-controls="ffOnboardingDrawer"
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
			<div class="ff-drawer" aria-hidden="false">
				<div
					bind:this={drawerPanel}
					id="ffOnboardingDrawer"
					class="ff-drawer__panel ff-onboardingDrawer"
					role="dialog"
					aria-modal="true"
					aria-labelledby="ffOnboardingDrawerTitle"
					tabindex="-1"
				>
					<div class="ff-drawer__head">
						<div>
							<p class="ff-brand__title" id="ffOnboardingDrawerTitle">FutureFunded</p>
							<p class="ff-onboardingDrawerLabel">Onboarding</p>
						</div>

						<button
							type="button"
							class="ff-btn ff-btn--secondary ff-btn--sm"
							aria-label="Close menu"
							onclick={closeDrawer}
						>
							✕
						</button>
					</div>

					<nav class="ff-drawer__body" aria-label="Drawer navigation">
						<button
							type="button"
							class="ff-btn ff-btn--secondary"
							onclick={() => {
								closeDrawer();
								goto('/platform');
							}}
						>
							Back to platform
						</button>

						<button
							type="button"
							class="ff-btn ff-btn--secondary"
							onclick={() => {
								closeDrawer();
								openPreview();
							}}
						>
							View live fundraiser
						</button>

						<button
							type="button"
							class="ff-btn ff-btn--secondary"
							onclick={() => {
								closeDrawer();
								openDashboard();
							}}
						>
							Dashboard
						</button>

						<button
							type="button"
							class="ff-btn ff-btn--secondary ff-btn--sm ff-btn--quiet ff-themeToggle"
							aria-label="Toggle color theme"
							aria-pressed={theme === 'light'}
							onclick={toggleTheme}
						>
							<span class="ff-themeToggle__glyph" aria-hidden="true">◐</span>
							<span class="ff-themeToggle__label">Theme</span>
						</button>

						<button
							type="button"
							class="ff-btn ff-btn--secondary ff-btn--sm ff-btn--topCtaMuted"
							onclick={() => {
								closeDrawer();
								launchWorkspace();
							}}
						>
							Publish fundraiser
						</button>
					</nav>
				</div>

				<button
					type="button"
					class="ff-drawer__backdrop"
					aria-label="Close menu"
					onclick={closeDrawer}
				></button>
			</div>
		{/if}

		<main id="content" class="ff-main" tabindex="-1">
			<div class="ff-container">
				<section class="ff-section">
					<div class="ff-grid ff-onboardingWorkspaceGrid">
						<aside class="ff-card ff-onboardingRail">
							<p class="ff-kicker">Launch steps</p>

							<h1 class="ff-h1 ff-mt-4 ff-onboardingTitle">
								Set up your fundraiser like a real launch.
							</h1>

							<p class="ff-copy ff-mt-3">
								Keep setup calm: define the organization, apply the brand, set the fundraiser story,
								and review before launch.
							</p>

							<div class="ff-grid ff-mt-4">
								{#each steps as step (step.id)}
									<button
										type="button"
										class="ff-card ff-card--soft ff-onboardingStepCard"
										data-active={activeStep === step.id ? 'true' : 'false'}
										aria-pressed={activeStep === step.id}
										onclick={() => goToStep(step.id)}
									>
										<div class="ff-row ff-row--between ff-ais ff-wrap">
											<span class="ff-pill ff-pill--ghost">
												{step.id < 10 ? `0${step.id}` : `${step.id}`}
											</span>

											{#if activeStep === step.id}
												<span class="ff-pill ff-pill--soft">Active</span>
											{/if}
										</div>

										<p class="ff-h3 ff-mt-3 ff-onboardingStepLabel">{step.label}</p>
										<p class="ff-onboardingBody ff-onboardingBody--sm ff-mt-2">{step.body}</p>
									</button>
								{/each}
							</div>

							<div class="ff-grid ff-mt-4">
								{#each setupProof as item (item.title)}
									<div class="ff-card ff-card--soft ff-onboardingProofItem">
										<p class="ff-kicker">{item.title}</p>
										<p class="ff-onboardingBody ff-onboardingBody--sm ff-mt-2">{item.body}</p>
									</div>
								{/each}
							</div>
						</aside>

						<div class="ff-stack">
							<section class="ff-card ff-onboardingMain" aria-labelledby="onboardingStepTitle">
								<div class="ff-row ff-row--between ff-wrap ff-gap-3">
									<div class="ff-minw-0">
										<p class="ff-kicker">Step {activeStep}</p>

										<h2 class="ff-h2 ff-mt-3 ff-onboardingSectionTitle" id="onboardingStepTitle">
											{selectedStep.title}
										</h2>

										<p class="ff-copy ff-mt-3">{selectedStep.body}</p>

										<p class="ff-help ff-mutedStrong ff-mt-2">
											These choices shape the public page, sponsor offers, and publish flow.
										</p>
									</div>

									<span class="ff-pill ff-pill--ghost">{activeStep} / {steps.length}</span>
								</div>

								{#if activeStep === 1}
									<div class="ff-grid ff-grid--2 ff-mt-4">
										<div class="ff-stack">
											<label class="ff-label" for="orgName">Organization name</label>
											<input
												id="orgName"
												class="ff-input"
												bind:value={orgName}
												placeholder="Connect ATX Elite"
											/>
										</div>

										<div class="ff-stack">
											<label class="ff-label" for="orgType">Organization type</label>
											<select id="orgType" class="ff-input" bind:value={orgType}>
												<option>Youth team</option>
												<option>School</option>
												<option>Nonprofit</option>
												<option>Club</option>
												<option>Community group</option>
											</select>
										</div>

										<div class="ff-stack">
											<label class="ff-label" for="location">Location</label>
											<input
												id="location"
												class="ff-input"
												bind:value={location}
												placeholder="Austin, TX"
											/>
										</div>

										<div class="ff-card ff-card--soft">
											<p class="ff-kicker">Why this matters</p>
											<p class="ff-copy ff-mt-2">
												Name, org type, and location are what make the fundraiser feel real on first open.
											</p>
										</div>
									</div>
								{/if}

								{#if activeStep === 2}
									<div class="ff-grid ff-grid--2 ff-mt-4">
										<div class="ff-stack">
											<label class="ff-label" for="logoText">Logo initials</label>
											<input
												id="logoText"
												class="ff-input"
												bind:value={logoText}
												maxlength="3"
												placeholder="CA"
											/>
										</div>

										<div class="ff-stack">
											<label class="ff-label" for="brandColorText">Primary brand color</label>
											<div class="ff-row ff-ais">
												<input
													aria-label="Primary brand color swatch"
													class="ff-onboardingSwatch"
													type="color"
													bind:value={brandColor}
												/>
												<input id="brandColorText" class="ff-input" bind:value={brandColor} />
											</div>
										</div>

										<div class="ff-stack">
											<label class="ff-label" for="accentColorText">Accent color</label>
											<div class="ff-row ff-ais">
												<input
													aria-label="Accent color swatch"
													class="ff-onboardingSwatch"
													type="color"
													bind:value={accentColor}
												/>
												<input id="accentColorText" class="ff-input" bind:value={accentColor} />
											</div>
										</div>

										<div class="ff-card ff-card--soft">
											<p class="ff-kicker">Brand outcome</p>
											<p class="ff-copy ff-mt-2">
												Clean initials, primary color, and accent color make the public page feel intentional faster.
											</p>
										</div>
									</div>
								{/if}

								{#if activeStep === 3}
									<div class="ff-grid ff-mt-4">
										<div class="ff-stack">
											<label class="ff-label" for="campaignTitle">Campaign title</label>
											<input
												id="campaignTitle"
												class="ff-input"
												bind:value={campaignTitle}
												placeholder="Spring Fundraiser"
											/>
										</div>

										<div class="ff-stack">
											<label class="ff-label" for="fundraisingGoal">Fundraising goal</label>
											<input
												id="fundraisingGoal"
												class="ff-input"
												bind:value={fundraisingGoal}
												inputmode="numeric"
												placeholder="10000"
											/>
										</div>

										<div class="ff-stack">
											<label class="ff-label" for="shortStory">Short story</label>
											<textarea
												id="shortStory"
												class="ff-input"
												rows="5"
												bind:value={shortStory}
											></textarea>
										</div>
									</div>
								{/if}

								{#if activeStep === 4}
									<div class="ff-grid ff-grid--3 ff-mt-4">
										{#each laneCards as lane (lane.key)}
											<button
												type="button"
												class="ff-card ff-card--soft ff-onboardingStepCard"
												data-active={lane.active ? 'true' : 'false'}
												aria-pressed={lane.active}
												onclick={() => toggleLane(lane.key)}
											>
												<div class="ff-row ff-row--between ff-ais ff-wrap">
													<p class="ff-h3">{lane.title}</p>
													<span class={`ff-pill ${lane.active ? 'ff-pill--soft' : 'ff-pill--ghost'}`}>
														{lane.active ? 'On' : 'Off'}
													</span>
												</div>

												<p class="ff-onboardingBody ff-onboardingBody--sm ff-mt-2">{lane.body}</p>
											</button>
										{/each}
									</div>
								{/if}

								{#if activeStep === 5}
									<div class="ff-grid ff-grid--3 ff-mt-4">
										{#each publishChecks as item (item.title)}
											<div class="ff-card ff-card--soft ff-onboardingLaunchItem">
												<p class="ff-kicker">{item.title}</p>
												<p class="ff-onboardingBody ff-onboardingBody--sm ff-mt-2">{item.body}</p>
											</div>
										{/each}
									</div>

									<div class="ff-card ff-card--soft ff-mt-4">
										<div class="ff-row ff-row--between ff-wrap ff-ais">
											<div class="ff-minw-0">
												<p class="ff-kicker">Launch readiness</p>
												<h3 class="ff-h3 ff-mt-2">
													{publishReady ? 'Ready for launch review' : 'Needs a little more setup'}
												</h3>
											</div>

											<span class={`ff-pill ${publishReady ? 'ff-pill--soft' : 'ff-pill--ghost'}`}>
												{publishReady ? 'Ready' : 'Review needed'}
											</span>
										</div>

										<p class="ff-copy ff-mt-3">
											{publishReady
												? 'The setup is in good shape. Next step: confirm payments and final launch checks from the dashboard.'
												: 'Finish the basics, campaign story, and at least one revenue lane before you publish.'}
										</p>
									</div>
								{/if}

								<div class="ff-actions ff-mt-4">
									<button
										type="button"
										class="ff-btn ff-btn--secondary ff-btn--pill"
										onclick={prevStep}
										disabled={activeStep === 1}
									>
										Back
									</button>

									<button
										type="button"
										class="ff-btn ff-btn--secondary ff-btn--pill"
										onclick={openPreview}
									>
										View live fundraiser
									</button>

									{#if activeStep < steps.length}
										<button
											type="button"
											class="ff-btn ff-btn--primary ff-btn--pill"
											onclick={nextStep}
										>
											Continue
										</button>
									{:else}
										<button
											type="button"
											class="ff-btn ff-btn--primary ff-btn--pill"
											onclick={launchWorkspace}
										>
											Publish ready
										</button>
									{/if}
								</div>

								{#if launchNotice}
									<div class="ff-alert ff-alert--info ff-mt-4" role="status" aria-live="polite">
										{launchNotice}
									</div>
								{/if}
							</section>

							<aside class="ff-card">
								<p class="ff-kicker">Live preview</p>
								<h2 class="ff-h2 ff-mt-3">{orgName}</h2>
								<p class="ff-copy ff-mt-2">{location}</p>

								<div class="ff-row ff-wrap ff-gap-2 ff-mt-3">
									<span class="ff-pill ff-pill--ghost">{orgType}</span>
									{#if donationLane}
										<span class="ff-pill ff-pill--ghost">Donations</span>
									{/if}
									{#if sponsorLane}
										<span class="ff-pill ff-pill--ghost">Sponsors</span>
									{/if}
									{#if recurringLane}
										<span class="ff-pill ff-pill--ghost">Recurring</span>
									{/if}
								</div>

								<div class="ff-grid ff-mt-4">
									{#each previewBenefits as item (item.title)}
										<div class="ff-card ff-card--soft">
											<p class="ff-h3">{item.title}</p>
											<p class="ff-copy ff-mt-2">{item.body}</p>
										</div>
									{/each}
								</div>

								<div class="ff-card ff-card--soft ff-mt-4">
									<div class="ff-inline">
										<div
											class="ff-brand__mark"
											aria-hidden="true"
											style={`background:${brandColor};color:#fff;border-color:transparent;`}
										>
											{logoText || 'FF'}
										</div>

										<div class="ff-minw-0">
											<p class="ff-brand__title">{orgName}</p>
											<p class="ff-brand__sub">{location}</p>
										</div>
									</div>

									<h3 class="ff-display ff-mt-4">{campaignTitle}</h3>
									<p class="ff-copy ff-mt-3">{shortStory}</p>

									<div class="ff-grid ff-grid--3 ff-mt-4">
										<div class="ff-card ff-card--soft">
											<p class="ff-kicker">Goal</p>
											<p class="ff-h3 ff-mt-2">{previewGoalLabel}</p>
										</div>

										<div class="ff-card ff-card--soft">
											<p class="ff-kicker">Revenue lanes</p>
											<p class="ff-h3 ff-mt-2">{liveLaneCount}</p>
										</div>

										<div class="ff-card ff-card--soft">
											<p class="ff-kicker">Slug</p>
											<p class="ff-h3 ff-mt-2">{previewSlug}</p>
										</div>
									</div>
								</div>

								<div class="ff-actions ff-mt-4">
									<button
										type="button"
										class="ff-btn ff-btn--primary ff-btn--pill"
										onclick={openPreview}
									>
										Preview public page
									</button>

									<button
										type="button"
										class="ff-btn ff-btn--secondary ff-btn--pill"
										onclick={openDashboard}
									>
										Open dashboard
									</button>
								</div>

								<div class="ff-card ff-card--soft ff-mt-4">
									<p class="ff-kicker">What goes live from here</p>
									<ul class="ff-stack ff-mt-3" style="padding-left: 1rem; margin: 0;">
										<li>branded public fundraiser</li>
										<li>launch-ready revenue lanes</li>
										<li>operator-ready launch workflow</li>
										<li>preview path before you publish</li>
									</ul>
								</div>
							</aside>
						</div>
					</div>
				</section>
			</div>
		</main>
	</div>
</div>
