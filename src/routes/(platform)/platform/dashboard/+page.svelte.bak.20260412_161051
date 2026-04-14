<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	type Metric = { label: string; value: string; note: string };
	type Action = { title: string; body: string; cta: string; action: () => void; primary?: boolean };
	type Activity = { title: string; meta: string; body: string };
	type Diagnostic = { label: string; value: string; tone?: 'good' | 'warn' | 'muted' };

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

	let theme = $state<'dark' | 'light'>('dark');
	let drawerOpen = $state(false);
	let dataMode = $state<'preview' | 'live'>('preview');
	let copyNotice = $state('');

	const orgName = 'Connect ATX Elite';
	const publicPath = '/c/connect-atx-elite';
	const publicUrl = $derived(`http://localhost:5173${publicPath}`);

	const raised = 5175;
	const goal = 10000;
	const donors = 73;
	const progress = Math.round((raised / goal) * 100);

	const metrics: Metric[] = [
		{ label: 'Raised', value: '$5,175', note: 'Momentum is already building.' },
		{ label: 'Goal', value: '$10,000', note: 'Clear season target for launch.' },
		{ label: 'Progress', value: `${progress}%`, note: 'Public fundraising surface is active.' },
		{ label: 'Donors', value: `${donors}`, note: 'Community support is showing up.' }
	];

	const activities: Activity[] = [
		{
			title: 'Fundraiser surface is live in preview mode',
			meta: 'Today • Public page',
			body: 'The campaign page is rendering, sponsor lanes are visible, and the donor journey is ready for payment wiring.'
		},
		{
			title: 'Onboarding workspace was updated',
			meta: 'Today • Operator flow',
			body: 'Organization setup, campaign basics, brand controls, and preview routing are now connected into one launch path.'
		},
		{
			title: 'Platform landing page is aligned',
			meta: 'Today • Marketing surface',
			body: 'The platform page now feels like the right software-first companion to the fundraiser.'
		}
	];

	const sponsorDiagnostics = [
		{ label: 'Sponsor packages', value: 'Enabled' },
		{ label: 'Lead capture', value: 'UI ready' },
		{ label: 'Featured tier', value: '$500' },
		{ label: 'Top tier', value: '$1,000' }
	];

	const actions = $derived<Action[]>([
		{
			title: 'Open live preview',
			body: 'Jump straight to the public page and review the supporter-facing experience.',
			cta: 'Open preview',
			action: () => goto(publicPath),
			primary: true
		},
		{
			title: 'Return to onboarding',
			body: 'Update organization details, story, branding, or revenue lanes before launch.',
			cta: 'Edit onboarding',
			action: () => goto('/platform/onboarding')
		},
		{
			title: dataMode === 'preview' ? 'Publish setup' : 'Set back to preview',
			body:
				dataMode === 'preview'
					? 'Mark the workspace as live once the public surface and payments are ready.'
					: 'Switch back into preview mode for additional setup changes.',
			cta: dataMode === 'preview' ? 'Go live' : 'Set preview',
			action: () => {
				dataMode = dataMode === 'preview' ? 'live' : 'preview';
			}
		}
	]);

	const diagnostics = $derived<Diagnostic[]>([
		{ label: 'Environment', value: 'local', tone: 'muted' },
		{
			label: 'Data mode',
			value: dataMode === 'preview' ? 'Preview' : 'Live',
			tone: dataMode === 'preview' ? 'warn' : 'good'
		},
		{ label: 'Payments', value: 'Not connected', tone: 'warn' },
		{ label: 'Build lane', value: 'wave-4-scroll-compression', tone: 'muted' },
		{ label: 'Public route', value: publicPath, tone: 'muted' }
	]);

	function toggleTheme() {
		theme = theme === 'dark' ? 'light' : 'dark';
		if (browser) localStorage.setItem('ff-theme', theme);
	}

	async function copyPublicLink() {
		if (!browser || !navigator.clipboard) {
			copyNotice = 'Clipboard not available in this environment.';
			return;
		}
		await navigator.clipboard.writeText(publicUrl);
		copyNotice = 'Public fundraiser link copied.';
	}

	function badgeClasses(tone?: 'good' | 'warn' | 'muted') {
		if (tone === 'good') {
			return 'border-emerald-300 bg-emerald-100 text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-500/10 dark:text-emerald-300';
		}
		if (tone === 'warn') {
			return 'border-orange-300 bg-orange-100 text-orange-700 dark:border-orange-400/20 dark:bg-orange-500/10 dark:text-orange-300';
		}
		return 'border-slate-300/80 bg-white/88 text-slate-700 dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-300';
	}

	onMount(() => {
		if (!browser) return;
		const saved = localStorage.getItem('ff-theme');
		if (saved === 'light' || saved === 'dark') theme = saved;
	});
</script>

<svelte:head>
	<title>FutureFunded Dashboard</title>
	<meta
		name="description"
		content="Operator dashboard for launch status, campaign summary, sponsor readiness, and workspace controls."
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
								<p class="text-xs text-slate-600 dark:text-slate-300 truncate">
									Operator dashboard
								</p>
							</div>
							<span class={pill}>Dashboard</span>
						</div>

						<nav class="gap-2 md:flex hidden items-center">
							<button type="button" class={buttonSecondary} onclick={() => goto('/platform')}>
								Back to platform
							</button>
							<button
								type="button"
								class={buttonSecondary}
								onclick={() => goto('/platform/onboarding')}
							>
								Onboarding
							</button>
							<button type="button" class={buttonSecondary} onclick={() => goto(publicPath)}>
								Live fundraiser
							</button>
							<button type="button" class={buttonSecondary} onclick={toggleTheme}>Theme</button>
							<button
								type="button"
								class={buttonPrimary}
								onclick={() => (dataMode = dataMode === 'preview' ? 'live' : 'preview')}
							>
								{dataMode === 'preview' ? 'Publish setup' : 'Set preview'}
							</button>
						</nav>

						<div class="gap-2 md:hidden flex items-center">
							<button type="button" class={buttonSecondary} onclick={toggleTheme}>◐</button>
							<button
								type="button"
								class={buttonPrimary}
								onclick={() => (dataMode = dataMode === 'preview' ? 'live' : 'preview')}
							>
								{dataMode === 'preview' ? 'Publish' : 'Preview'}
							</button>
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
						<p class="text-xs text-slate-400">Dashboard</p>
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
							goto('/platform/onboarding');
						}}
					>
						Onboarding
					</button>
					<button
						type="button"
						class={buttonSecondary}
						onclick={() => {
							drawerOpen = false;
							goto(publicPath);
						}}
					>
						Live fundraiser
					</button>
					<button
						type="button"
						class={buttonPrimary}
						onclick={() => {
							drawerOpen = false;
							dataMode = dataMode === 'preview' ? 'live' : 'preview';
						}}
					>
						{dataMode === 'preview' ? 'Publish setup' : 'Set preview'}
					</button>
				</nav>
			</aside>
		{/if}

		<main id="content" class="max-w-7xl px-3 pb-16 pt-5 mx-auto">
			<section class="gap-4 xl:grid-cols-[1.2fr_0.8fr] grid">
				<article class={`${shell} p-5 md:p-6`}>
					<div class="gap-4 flex flex-wrap items-start justify-between">
						<div>
							<p
								class="font-semibold text-slate-600 dark:text-slate-300 text-[11px] tracking-[0.14em] uppercase"
							>
								Workspace status
							</p>
							<h1
								class="mt-4 text-5xl font-black text-slate-900 dark:text-white md:text-6xl max-w-[12ch] leading-[0.92] tracking-[-0.06em]"
							>
								Operate the fundraiser from one calmer view.
							</h1>
							<p class="mt-4 max-w-3xl text-base leading-7 text-slate-700 dark:text-slate-200">
								Track launch readiness, campaign progress, sponsor support, and next actions without
								jumping between scattered tools.
							</p>
						</div>

						<span class={`${pill} ${badgeClasses(dataMode === 'preview' ? 'warn' : 'good')}`}>
							{dataMode === 'preview' ? 'Preview mode' : 'Live mode'}
						</span>
					</div>

					<div class="mt-5 gap-3 sm:grid-cols-2 xl:grid-cols-4 grid">
						{#each metrics as item (item.label)}
							<div class={soft}>
								<p
									class="font-semibold text-slate-600 dark:text-slate-300 text-[11px] tracking-[0.14em] uppercase"
								>
									{item.label}
								</p>
								<p class="mt-2 text-2xl font-black">{item.value}</p>
								<p class="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200">{item.note}</p>
							</div>
						{/each}
					</div>

					<div class="mt-5 gap-3 md:grid-cols-3 grid">
						{#each actions as item (item.title)}
							<div class={soft}>
								<p class="text-lg font-black">{item.title}</p>
								<p class="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-200">{item.body}</p>
								<div class="mt-4">
									<button
										type="button"
										class={item.primary ? buttonPrimary : buttonSecondary}
										onclick={item.action}
									>
										{item.cta}
									</button>
								</div>
							</div>
						{/each}
					</div>

					{#if copyNotice}
						<div
							class="mt-5 rounded-2xl border-sky-300/40 bg-sky-100/70 px-4 py-3 text-sm text-slate-800 dark:border-sky-400/20 dark:bg-sky-400/10 dark:text-slate-100 border"
						>
							{copyNotice}
						</div>
					{/if}
				</article>

				<aside class={`${shell} p-5 md:p-6 xl:sticky xl:top-24 self-start`}>
					<p
						class="font-semibold text-slate-600 dark:text-slate-300 text-[11px] tracking-[0.14em] uppercase"
					>
						Diagnostics
					</p>
					<h2 class="mt-4 text-3xl font-black tracking-[-0.04em]">Launch diagnostics</h2>
					<p class="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-200">
						Keep the operator view honest: what mode the product is in, whether the fundraiser is
						ready, and what still needs wiring.
					</p>

					<div class="mt-5 gap-3 grid">
						{#each diagnostics as item (item.label)}
							<div class={`${soft} gap-3 flex items-center justify-between`}>
								<div>
									<p
										class="font-semibold text-slate-600 dark:text-slate-300 text-[11px] tracking-[0.14em] uppercase"
									>
										{item.label}
									</p>
									<p class="mt-2 text-sm font-semibold text-slate-900 dark:text-slate-50">
										{item.value}
									</p>
								</div>
								<span class={`${pill} ${badgeClasses(item.tone)}`}>
									{item.tone === 'good' ? 'Ready' : item.tone === 'warn' ? 'Attention' : 'Info'}
								</span>
							</div>
						{/each}
					</div>

					<div class="mt-5 gap-3 grid">
						<button type="button" class={buttonPrimary} onclick={copyPublicLink}
							>Copy public link</button
						>
						<button type="button" class={buttonSecondary} onclick={() => goto(publicPath)}
							>Open live fundraiser</button
						>
						<button
							type="button"
							class={buttonSecondary}
							onclick={() => goto('/platform/onboarding')}
						>
							Edit onboarding
						</button>
					</div>
				</aside>
			</section>

			<section class="pt-8">
				<div class="gap-4 xl:grid-cols-[1fr_0.8fr] grid">
					<article class={`${shell} p-5 md:p-6`}>
						<div class="gap-4 flex flex-wrap items-end justify-between">
							<div>
								<p
									class="font-semibold text-slate-600 dark:text-slate-300 text-[11px] tracking-[0.14em] uppercase"
								>
									Recent activity
								</p>
								<h2 class="mt-3 text-4xl font-black leading-tight max-w-[13ch] tracking-[-0.04em]">
									What changed across the launch flow.
								</h2>
							</div>
							<span class={pill}>Today</span>
						</div>

						<div class="mt-5 gap-3 grid">
							{#each activities as item (item.title)}
								<article class={soft}>
									<div class="gap-2 flex flex-wrap items-center justify-between">
										<p class="text-lg font-black">{item.title}</p>
										<span class={pill}>{item.meta}</span>
									</div>
									<p class="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-200">
										{item.body}
									</p>
								</article>
							{/each}
						</div>
					</article>

					<aside class={`${shell} p-5 md:p-6`}>
						<p
							class="font-semibold text-slate-600 dark:text-slate-300 text-[11px] tracking-[0.14em] uppercase"
						>
							Sponsor lane
						</p>
						<h2 class="mt-3 text-4xl font-black leading-tight max-w-[12ch] tracking-[-0.04em]">
							Sponsor readiness at a glance.
						</h2>
						<p class="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-200">
							Keep the business-facing side of the fundraiser visible inside the operator workspace.
						</p>

						<div class="mt-5 gap-3 sm:grid-cols-2 grid">
							{#each sponsorDiagnostics as item (item.label)}
								<div class={soft}>
									<p
										class="font-semibold text-slate-600 dark:text-slate-300 text-[11px] tracking-[0.14em] uppercase"
									>
										{item.label}
									</p>
									<p class="mt-2 text-xl font-black">{item.value}</p>
								</div>
							{/each}
						</div>

						<div class="mt-5 gap-3 grid">
							<button
								type="button"
								class={buttonPrimary}
								onclick={() => goto(publicPath + '#sponsors')}
							>
								Review sponsor section
							</button>
							<button
								type="button"
								class={buttonSecondary}
								onclick={() => goto('/platform/pricing')}
							>
								View pricing context
							</button>
						</div>
					</aside>
				</div>
			</section>

			<footer class="pt-8">
				<div class={`${shell} p-5 md:p-6`}>
					<div class="gap-5 lg:grid-cols-[1fr_auto] lg:items-end grid">
						<div>
							<p
								class="font-semibold text-slate-600 dark:text-slate-300 text-[11px] tracking-[0.14em] uppercase"
							>
								Operator close
							</p>
							<h2 class="mt-3 text-4xl font-black leading-tight max-w-[11ch] tracking-[-0.04em]">
								Keep the launch flow sharp.
							</h2>
							<p class="mt-4 max-w-2xl text-sm leading-7 text-slate-700 dark:text-slate-200">
								Review the public surface, keep the workspace current, and move from preview to live
								when the fundraiser is ready.
							</p>
						</div>

						<div class="gap-3 grid">
							<button type="button" class={buttonPrimary} onclick={() => goto(publicPath)}>
								Open live fundraiser
							</button>
							<button
								type="button"
								class={buttonSecondary}
								onclick={() => goto('/platform/onboarding')}
							>
								Return to onboarding
							</button>
						</div>
					</div>
				</div>
			</footer>
		</main>
	</div>
</div>
