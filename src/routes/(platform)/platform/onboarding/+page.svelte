<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	type Step = {
		id: number;
		label: string;
		title: string;
		body: string;
	};

	const steps: Step[] = [
		{
			id: 1,
			label: 'Organization',
			title: 'Start with the organization basics.',
			body: 'Set the name, org type, and launch context so the platform can frame the fundraiser correctly.'
		},
		{
			id: 2,
			label: 'Brand',
			title: 'Apply the brand quickly.',
			body: 'Add logo text, colors, and visual direction so the fundraiser feels like a real public surface.'
		},
		{
			id: 3,
			label: 'Campaign',
			title: 'Define the campaign story.',
			body: 'Name the fundraiser, set the goal, and explain what support actually covers.'
		},
		{
			id: 4,
			label: 'Revenue',
			title: 'Choose your support lanes.',
			body: 'Decide whether to run donations only, add sponsor packages, and turn on recurring support.'
		},
		{
			id: 5,
			label: 'Review',
			title: 'Review before launch.',
			body: 'Check the preview, confirm the setup, and move toward publishing with confidence.'
		}
	];

	const shell =
		'rounded-[28px] border border-slate-300/80 bg-white/92 shadow-[0_24px_54px_rgba(15,23,42,0.12)] backdrop-blur dark:border-white/10 dark:bg-slate-950/60 dark:shadow-[0_30px_80px_rgba(0,0,0,0.42)]';
	const soft =
		'rounded-[18px] border border-slate-300/80 bg-white/92 p-4 shadow-[0_8px_24px_rgba(15,23,42,0.06)] dark:border-white/10 dark:bg-white/[0.04]';
	const pill =
		'inline-flex items-center rounded-full border border-slate-300/80 bg-white/88 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-700 dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-300';
	const buttonPrimary =
		'inline-flex items-center justify-center rounded-full bg-gradient-to-b from-orange-400 to-orange-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(249,115,22,0.28)] transition hover:-translate-y-0.5';
	const buttonSecondary =
		'inline-flex items-center justify-center rounded-full border border-slate-300 bg-white/92 px-5 py-3 text-sm font-semibold text-slate-800 shadow-[0_10px_24px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(15,23,42,0.10)] dark:border-white/10 dark:bg-white/[0.07] dark:text-slate-100 dark:hover:bg-white/[0.10]';
	const input =
		'w-full rounded-2xl border border-slate-300 bg-white/98 px-4 py-3 text-sm text-slate-950 outline-none ring-0 placeholder:text-slate-500 focus:border-sky-400 dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-50 dark:placeholder:text-slate-500';

	let theme = $state<'dark' | 'light'>('dark');
	let drawerOpen = $state(false);
	let activeStep = $state(1);

	let orgName = $state('Connect ATX Elite');
	let orgType = $state('Youth team');
	let location = $state('Austin, TX');
	let logoText = $state('CA');
	let brandColor = $state('#f97316');
	let accentColor = $state('#38bdf8');

	let campaignTitle = $state('Spring Fundraiser');
	let fundraisingGoal = $state('10000');
	let shortStory = $state(
		'Support travel, training, tournament fees, and shared season costs with one cleaner, sponsor-ready fundraising page.'
	);

	let donationLane = $state(true);
	let sponsorLane = $state(true);
	let recurringLane = $state(false);

	let launchNotice = $state('');

	const previewGoal = $derived(Number(fundraisingGoal || '0'));
	const previewSlug = $derived(
		orgName
			.toLowerCase()
			.trim()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-|-$/g, '') || 'connect-atx-elite'
	);
	const progressPct = $derived(0);

	function nextStep() {
		activeStep = Math.min(activeStep + 1, steps.length);
	}

	function prevStep() {
		activeStep = Math.max(activeStep - 1, 1);
	}

	function goToStep(step: number) {
		activeStep = step;
	}

	function toggleTheme() {
		theme = theme === 'dark' ? 'light' : 'dark';
		if (browser) localStorage.setItem('ff-theme', theme);
	}

	function openPreview() {
		goto(`/c/${previewSlug}`);
	}

	function launchWorkspace() {
		launchNotice =
			'Workspace setup is ready. Next pass: save this state, connect payments, and publish the live page.';
	}

	onMount(() => {
		if (!browser) return;
		const saved = localStorage.getItem('ff-theme');
		if (saved === 'light' || saved === 'dark') theme = saved;
	});
</script>

<svelte:head>
	<title>FutureFunded Onboarding</title>
	<meta
		name="description"
		content="Set up branding, campaign story, support lanes, and launch settings from the FutureFunded onboarding workspace."
	/>
</svelte:head>

<div class={theme === 'dark' ? 'dark' : ''}>
	<div
		class="text-slate-900 dark:text-slate-50 min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.08),transparent_28%),radial-gradient(circle_at_top_right,rgba(249,115,22,0.10),transparent_26%),linear-gradient(180deg,#eef3f8_0%,#f8fafc_100%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.10),transparent_24%),radial-gradient(circle_at_top_right,rgba(249,115,22,0.14),transparent_22%),linear-gradient(180deg,#07111f_0%,#081223_100%)]"
	>
		<a
			href="#content"
			class="focus:left-4 focus:top-4 focus:bg-white focus:px-4 focus:py-2 focus:text-slate-900 sr-only focus:not-sr-only focus:absolute focus:z-[120] focus:rounded-full"
		>
			Skip to content
		</a>

		<header class="top-0 px-3 pt-3 backdrop-blur sticky z-50">
			<div class="max-w-7xl mx-auto">
				<div class={`${shell} px-4 py-4`}>
					<div class="gap-4 flex flex-wrap items-center justify-between">
						<div class="min-w-0 gap-3 flex items-center">
							<div
								class="h-10 w-10 rounded-2xl from-slate-900 to-slate-700 text-sm font-black text-white dark:from-slate-200 dark:to-white dark:text-slate-900 grid place-items-center bg-gradient-to-b"
							>
								FF
							</div>
							<div class="min-w-0">
								<p class="text-sm font-semibold truncate">FutureFunded</p>
								<p class="text-xs text-slate-600 dark:text-slate-300 truncate">Launch workspace</p>
							</div>
							<span class={pill}>Onboarding</span>
						</div>

						<nav class="gap-2 md:flex hidden items-center">
							<button type="button" class={buttonSecondary} onclick={() => goto('/platform')}>
								Back to platform
							</button>
							<button type="button" class={buttonSecondary} onclick={openPreview}>
								Open preview
							</button>
							<button
								type="button"
								class={buttonSecondary}
								onclick={() => goto('/platform/dashboard')}
							>
								Dashboard
							</button>
							<button type="button" class={buttonSecondary} onclick={toggleTheme}>Theme</button>
							<button type="button" class={buttonPrimary} onclick={launchWorkspace}>
								Publish setup
							</button>
						</nav>

						<div class="gap-2 md:hidden flex items-center">
							<button type="button" class={buttonSecondary} onclick={toggleTheme}>◐</button>
							<button type="button" class={buttonPrimary} onclick={launchWorkspace}>Publish</button>
							<button type="button" class={buttonSecondary} onclick={() => (drawerOpen = true)}
								>☰</button
							>
						</div>
					</div>
				</div>
			</div>
		</header>

		{#if drawerOpen}
			<button
				type="button"
				class="inset-0 bg-slate-950/55 backdrop-blur-sm md:hidden fixed z-[90]"
				aria-label="Close menu"
				onclick={() => (drawerOpen = false)}
			></button>

			<aside
				class="inset-y-0 right-0 max-w-sm border-white/10 bg-slate-950 p-5 text-slate-50 shadow-2xl md:hidden fixed z-[100] w-[92vw] border-l"
			>
				<div class="flex items-center justify-between">
					<div>
						<p class="text-sm font-semibold">FutureFunded</p>
						<p class="text-xs text-slate-400">Onboarding</p>
					</div>
					<button type="button" class={buttonSecondary} onclick={() => (drawerOpen = false)}
						>✕</button
					>
				</div>

				<nav class="mt-6 gap-2 grid">
					<button
						type="button"
						class={buttonSecondary}
						onclick={() => {
							drawerOpen = false;
							goto('/platform');
						}}
					>
						Back to platform
					</button>
					<button
						type="button"
						class={buttonSecondary}
						onclick={() => {
							drawerOpen = false;
							openPreview();
						}}
					>
						Open preview
					</button>
					<button
						type="button"
						class={buttonSecondary}
						onclick={() => {
							drawerOpen = false;
							goto('/platform/dashboard');
						}}
					>
						Dashboard
					</button>
					<button
						type="button"
						class={buttonPrimary}
						onclick={() => {
							drawerOpen = false;
							launchWorkspace();
						}}
					>
						Publish setup
					</button>
				</nav>
			</aside>
		{/if}

		<main id="content" class="max-w-7xl px-3 pb-16 pt-5 mx-auto">
			<section class="gap-4 xl:grid-cols-[0.72fr_1.28fr_0.92fr] grid">
				<aside class={`${shell} p-5 md:p-6 self-start`}>
					<p
						class="font-semibold text-slate-600 dark:text-slate-300 text-[11px] tracking-[0.14em] uppercase"
					>
						Launch steps
					</p>
					<h1 class="mt-4 text-4xl font-black leading-tight max-w-[10ch] tracking-[-0.05em]">
						Build the launch workspace.
					</h1>
					<p class="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-200">
						Keep setup calm: define the organization, apply the brand, set the fundraiser story, and
						review before launch.
					</p>

					<div class="mt-5 gap-3 grid">
						{#each steps as step (step.id)}
							<button
								type="button"
								class={`${soft} hover:-translate-y-0.5 text-left transition ${activeStep === step.id ? 'ring-orange-400/35 ring-1' : ''}`}
								onclick={() => goToStep(step.id)}
							>
								<div class="gap-3 flex items-center justify-between">
									<span class={pill}>{step.id < 10 ? `0${step.id}` : `${step.id}`}</span>
									{#if activeStep === step.id}
										<span class="text-xs font-semibold text-orange-500 tracking-[0.14em] uppercase"
											>Active</span
										>
									{/if}
								</div>
								<p class="mt-3 text-lg font-black">{step.label}</p>
								<p class="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200">{step.body}</p>
							</button>
						{/each}
					</div>
				</aside>

				<section class={`${shell} p-5 md:p-6`}>
					<div class="gap-4 flex flex-wrap items-start justify-between">
						<div>
							<p
								class="font-semibold text-slate-600 dark:text-slate-300 text-[11px] tracking-[0.14em] uppercase"
							>
								Step {activeStep}
							</p>
							<h2 class="mt-3 text-4xl font-black leading-tight max-w-[14ch] tracking-[-0.04em]">
								{steps[activeStep - 1].title}
							</h2>
							<p class="mt-3 max-w-3xl text-sm leading-7 text-slate-700 dark:text-slate-200">
								{steps[activeStep - 1].body}
							</p>
						</div>

						<span class={pill}>{activeStep} / {steps.length}</span>
					</div>

					{#if activeStep === 1}
						<div class="mt-6 gap-4 md:grid-cols-2 grid">
							<div>
								<label class="mb-2 text-sm font-semibold block" for="orgName"
									>Organization name</label
								>
								<input
									id="orgName"
									class={input}
									bind:value={orgName}
									placeholder="Connect ATX Elite"
								/>
							</div>
							<div>
								<label class="mb-2 text-sm font-semibold block" for="orgType"
									>Organization type</label
								>
								<select id="orgType" class={input} bind:value={orgType}>
									<option>Youth team</option>
									<option>School</option>
									<option>Nonprofit</option>
									<option>Club</option>
									<option>Community group</option>
								</select>
							</div>
							<div class="md:col-span-2">
								<label class="mb-2 text-sm font-semibold block" for="location">Location</label>
								<input id="location" class={input} bind:value={location} placeholder="Austin, TX" />
							</div>
						</div>
					{/if}

					{#if activeStep === 2}
						<div class="mt-6 gap-4 md:grid-cols-2 grid">
							<div>
								<label class="mb-2 text-sm font-semibold block" for="logoText">Logo initials</label>
								<input
									id="logoText"
									class={input}
									bind:value={logoText}
									maxlength="3"
									placeholder="CA"
								/>
							</div>
							<div>
								<label class="mb-2 text-sm font-semibold block" for="brandColorText"
									>Primary brand color</label
								>
								<div class="gap-3 flex">
									<input
										aria-label="Primary brand color swatch"
										class="h-12 w-16 rounded-2xl border-slate-300 bg-white dark:border-white/10 dark:bg-white/[0.05] border"
										type="color"
										bind:value={brandColor}
									/>
									<input id="brandColorText" class={input} bind:value={brandColor} />
								</div>
							</div>
							<div class="md:col-span-2">
								<label class="mb-2 text-sm font-semibold block" for="accentColorText"
									>Accent color</label
								>
								<div class="gap-3 flex">
									<input
										aria-label="Accent color swatch"
										class="h-12 w-16 rounded-2xl border-slate-300 bg-white dark:border-white/10 dark:bg-white/[0.05] border"
										type="color"
										bind:value={accentColor}
									/>
									<input id="accentColorText" class={input} bind:value={accentColor} />
								</div>
							</div>
						</div>
					{/if}

					{#if activeStep === 3}
						<div class="mt-6 gap-4 grid">
							<div>
								<label class="mb-2 text-sm font-semibold block" for="campaignTitle"
									>Campaign title</label
								>
								<input
									id="campaignTitle"
									class={input}
									bind:value={campaignTitle}
									placeholder="Spring Fundraiser"
								/>
							</div>
							<div>
								<label class="mb-2 text-sm font-semibold block" for="fundraisingGoal"
									>Fundraising goal</label
								>
								<input
									id="fundraisingGoal"
									class={input}
									bind:value={fundraisingGoal}
									inputmode="numeric"
									placeholder="10000"
								/>
							</div>
							<div>
								<label class="mb-2 text-sm font-semibold block" for="shortStory">Short story</label>
								<textarea id="shortStory" class={input} rows="5" bind:value={shortStory}></textarea>
							</div>
						</div>
					{/if}

					{#if activeStep === 4}
						<div class="mt-6 gap-4 md:grid-cols-3 grid">
							<button
								type="button"
								class={`${soft} text-left ${donationLane ? 'ring-orange-400/35 ring-1' : ''}`}
								onclick={() => (donationLane = !donationLane)}
							>
								<p class="text-lg font-black">Donations</p>
								<p class="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200">
									One-time supporter contributions on the public page.
								</p>
							</button>

							<button
								type="button"
								class={`${soft} text-left ${sponsorLane ? 'ring-orange-400/35 ring-1' : ''}`}
								onclick={() => (sponsorLane = !sponsorLane)}
							>
								<p class="text-lg font-black">Sponsor packages</p>
								<p class="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200">
									Visible partner tiers for local business support.
								</p>
							</button>

							<button
								type="button"
								class={`${soft} text-left ${recurringLane ? 'ring-orange-400/35 ring-1' : ''}`}
								onclick={() => (recurringLane = !recurringLane)}
							>
								<p class="text-lg font-black">Recurring support</p>
								<p class="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200">
									Monthly or seasonal support for longer-term fundraising.
								</p>
							</button>
						</div>
					{/if}

					{#if activeStep === 5}
						<div class="mt-6 gap-4 grid">
							<div class={soft}>
								<p
									class="font-semibold text-slate-600 dark:text-slate-300 text-[11px] tracking-[0.14em] uppercase"
								>
									Launch checklist
								</p>
								<ul class="mt-3 gap-3 text-sm leading-7 text-slate-700 dark:text-slate-200 grid">
									<li>• Organization details look right</li>
									<li>• Campaign title and goal are filled in</li>
									<li>• Brand colors and initials are set</li>
									<li>• Revenue lanes match the launch plan</li>
									<li>• Preview is ready for stakeholder review</li>
								</ul>
							</div>

							<div class={soft}>
								<p
									class="font-semibold text-slate-600 dark:text-slate-300 text-[11px] tracking-[0.14em] uppercase"
								>
									Publish note
								</p>
								<p class="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-200">
									This is the operator checkpoint before connecting payments, confirming sponsor
									tiers, and making the live page public.
								</p>
							</div>
						</div>
					{/if}

					<div class="mt-6 gap-3 flex flex-wrap items-center justify-between">
						<button
							type="button"
							class={buttonSecondary}
							onclick={prevStep}
							disabled={activeStep === 1}
						>
							Back
						</button>

						<div class="gap-3 flex flex-wrap">
							<button type="button" class={buttonSecondary} onclick={openPreview}>
								Open preview
							</button>
							{#if activeStep < steps.length}
								<button type="button" class={buttonPrimary} onclick={nextStep}> Continue </button>
							{:else}
								<button type="button" class={buttonPrimary} onclick={launchWorkspace}>
									Publish setup
								</button>
							{/if}
						</div>
					</div>

					{#if launchNotice}
						<div
							class="mt-5 rounded-2xl border-sky-300/40 bg-sky-100/70 px-4 py-3 text-sm text-slate-800 dark:border-sky-400/20 dark:bg-sky-400/10 dark:text-slate-100 border"
						>
							{launchNotice}
						</div>
					{/if}
				</section>

				<aside class={`${shell} p-5 md:p-6 xl:sticky xl:top-24 self-start`}>
					<p
						class="font-semibold text-slate-600 dark:text-slate-300 text-[11px] tracking-[0.14em] uppercase"
					>
						Live preview
					</p>
					<h3 class="mt-3 text-3xl font-black tracking-[-0.04em]">{orgName}</h3>
					<p class="mt-2 text-sm text-slate-700 dark:text-slate-200">{location}</p>

					<div class="mt-5 gap-2 flex flex-wrap">
						<span class={pill}>{orgType}</span>
						{#if donationLane}
							<span class={pill}>Donations</span>
						{/if}
						{#if sponsorLane}
							<span class={pill}>Sponsors</span>
						{/if}
						{#if recurringLane}
							<span class={pill}>Recurring</span>
						{/if}
					</div>

					<div
						class="mt-5 border-slate-300/80 p-5 text-white rounded-[24px] border bg-[linear-gradient(180deg,#09152b_0%,#07111f_100%)] shadow-[0_24px_54px_rgba(15,23,42,0.22)]"
					>
						<div class="gap-3 flex items-center">
							<div
								class="h-12 w-12 rounded-2xl text-sm font-black text-white grid place-items-center"
								style={`background: linear-gradient(180deg, ${brandColor}, ${accentColor});`}
							>
								{logoText}
							</div>
							<div>
								<p class="text-sm font-semibold">{orgName}</p>
								<p class="text-xs text-white/60">{location}</p>
							</div>
						</div>

						<p class="mt-5 text-4xl font-black leading-[0.94] tracking-[-0.05em]">
							{campaignTitle}
						</p>
						<p class="mt-3 text-sm leading-7 text-white/78">{shortStory}</p>

						<div class="mt-5 gap-3 sm:grid-cols-3 grid">
							<div class="border-white/10 bg-white/[0.04] p-3 rounded-[18px] border">
								<p class="font-semibold text-white/52 text-[10px] tracking-[0.14em] uppercase">
									Goal
								</p>
								<p class="mt-2 text-lg font-black">${previewGoal.toLocaleString()}</p>
							</div>
							<div class="border-white/10 bg-white/[0.04] p-3 rounded-[18px] border">
								<p class="font-semibold text-white/52 text-[10px] tracking-[0.14em] uppercase">
									Progress
								</p>
								<p class="mt-2 text-lg font-black">{progressPct}%</p>
							</div>
							<div class="border-white/10 bg-white/[0.04] p-3 rounded-[18px] border">
								<p class="font-semibold text-white/52 text-[10px] tracking-[0.14em] uppercase">
									Slug
								</p>
								<p class="mt-2 text-sm font-black truncate">{previewSlug}</p>
							</div>
						</div>
					</div>

					<div class="mt-5 gap-3 grid">
						<div class={soft}>
							<p
								class="font-semibold text-slate-600 dark:text-slate-300 text-[11px] tracking-[0.14em] uppercase"
							>
								Preview actions
							</p>
							<div class="mt-4 gap-3 grid">
								<button type="button" class={buttonPrimary} onclick={openPreview}
									>Open live preview</button
								>
								<button
									type="button"
									class={buttonSecondary}
									onclick={() => goto('/platform/dashboard')}
								>
									Open dashboard
								</button>
							</div>
						</div>

						<div class={soft}>
							<p
								class="font-semibold text-slate-600 dark:text-slate-300 text-[11px] tracking-[0.14em] uppercase"
							>
								What ships from here
							</p>
							<ul class="mt-3 gap-3 text-sm leading-7 text-slate-700 dark:text-slate-200 grid">
								<li>• branded public fundraiser</li>
								<li>• launch-ready support lanes</li>
								<li>• cleaner operator workflow</li>
								<li>• preview path before publishing</li>
							</ul>
						</div>
					</div>
				</aside>
			</section>
		</main>
	</div>
</div>
