<script lang="ts">
	import { onDestroy } from 'svelte';
	import { loadStripe, type Stripe } from '@stripe/stripe-js';
	import { PUBLIC_STRIPE_PUBLISHABLE_KEY } from '$env/static/public';
	import { createEventDispatcher } from 'svelte';

	type Props = {
		slug: string;
		amount: number;
		donorName: string;
		donorEmail: string;
		donorMessage?: string;
		orgName: string;
		campaignName: string;
		active?: boolean;
	};

	const dispatch = createEventDispatcher<{
		ready: { clientSecret: string };
		error: { message: string };
		success: Record<string, never>;
	}>();

	let {
		slug,
		amount,
		donorName,
		donorEmail,
		donorMessage = '',
		orgName,
		campaignName,
		active = false
	}: Props = $props();

	let loading = $state(false);
	let initialized = $state(false);
	let submitting = $state(false);
	let error = $state('');
	let info = $state('');
	let clientSecret = $state('');

	let stripe: Stripe | null = null;
	let checkout: any = null;
	let actions: any = null;
	let paymentElement: any = null;

	const usd = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD'
	});

	const mountId = `ff-payment-element-${Math.random().toString(36).slice(2)}`;

	async function initialize() {
		if (loading || initialized) return;

		const publishableKey = PUBLIC_STRIPE_PUBLISHABLE_KEY?.trim() ?? '';

		if (!publishableKey) {
			error = 'Missing PUBLIC_STRIPE_PUBLISHABLE_KEY.';
			dispatch('error', { message: error });
			return;
		}

		if (!Number.isFinite(amount) || amount < 5) {
			error = 'Please enter a valid donation amount of at least $5.';
			dispatch('error', { message: error });
			return;
		}

		if (!donorName || donorName.trim().length < 2) {
			error = 'Please enter the supporter name before opening payment.';
			dispatch('error', { message: error });
			return;
		}

		if (!/\S+@\S+\.\S+/.test(donorEmail)) {
			error = 'Please enter a valid receipt email before opening payment.';
			dispatch('error', { message: error });
			return;
		}

		loading = true;
		error = '';
		info = 'Preparing secure payment…';

		try {
			const response = await fetch(`/c/${slug}/checkout`, {
				method: 'POST',
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify({
					amount,
					donorName,
					donorEmail,
					donorMessage,
					orgName,
					campaignName
				})
			});

			const payload = (await response.json()) as { clientSecret?: string; error?: string };

			if (!response.ok) {
				throw new Error(payload?.error || 'Could not initialize payment.');
			}

			if (!payload.clientSecret) {
						throw new Error(payload.error || 'Could not initialize payment.');
					}
					clientSecret = payload.clientSecret;

			stripe = await loadStripe(publishableKey);

			if (!stripe) {
				throw new Error('Stripe.js failed to initialize.');
			}

			checkout = stripe.initCheckoutElementsSdk({
				clientSecret
			});

			paymentElement = checkout.createPaymentElement();
			paymentElement.mount(`#${mountId}`);

			const loadActionsResult = await checkout.loadActions();

			if (loadActionsResult.type !== 'success') {
				throw new Error('Stripe checkout actions could not load.');
			}

			actions = loadActionsResult.actions;
			initialized = true;
			info = 'Secure payment is ready.';
			dispatch('ready', { clientSecret });
		} catch (err) {
			error = err instanceof Error ? err.message : 'Could not initialize payment.';
			info = '';
			dispatch('error', { message: error });
		} finally {
			loading = false;
		}
	}

	async function confirmPayment() {
		if (!actions || submitting) return;

		submitting = true;
		error = '';
		info = 'Confirming secure payment…';

		try {
			const result = await actions.confirm();

			if (result?.type === 'error') {
				throw new Error(result.error?.message || 'Payment confirmation failed.');
			}

			info = 'Stripe is processing the payment…';
			dispatch('success', {});
		} catch (err) {
			error = err instanceof Error ? err.message : 'Payment confirmation failed.';
			info = '';
			dispatch('error', { message: error });
		} finally {
			submitting = false;
		}
	}

	$effect(() => {
		if (active && !initialized && !loading) {
			void initialize();
		}
	});

	onDestroy(() => {
		try {
			paymentElement?.unmount?.();
		} catch {
			// no-op
		}
	});
</script>

<div class="ff-stack ff-mt-3 ff-checkoutPanel">
	<div class="ff-proofMini ff-proofMini--checkout">
		<p class="ff-kicker">Embedded payment</p>
		<p class="ff-help ff-mutedStrong ff-mt-1 ff-mb-0">
			Card details stay with Stripe and never touch your server.
		</p>
	</div>

	<div class="ff-proofMini ff-proofMini--checkout ff-checkoutSummary">
		<p class="ff-kicker">Payment summary</p>
		<div class="ff-stack ff-stack--tight ff-mt-2">
			<div class="ff-checkoutSummary__row">
				<span class="ff-help ff-muted">Amount</span>
				<strong>{usd.format(amount)}</strong>
			</div>
			<div class="ff-checkoutSummary__row">
				<span class="ff-help ff-muted">Supporter</span>
				<strong>{donorName}</strong>
			</div>
			<div class="ff-checkoutSummary__row">
				<span class="ff-help ff-muted">Receipt email</span>
				<strong>{donorEmail}</strong>
			</div>
		</div>
	</div>

	{#if loading}
		<div class="ff-proofMini ff-proofMini--checkout ff-checkoutStatus">
			<p class="ff-help ff-m-0">Preparing secure payment…</p>
		</div>
	{/if}

	{#if info}
		<div class="ff-alert ff-alert--info ff-checkoutStatus">
			{info}
		</div>
	{/if}

	{#if error}
		<div class="ff-alert ff-alert--info ff-checkoutStatus ff-checkoutError">
			{error}
		</div>
	{/if}

	<div class="ff-proofMini ff-proofMini--checkout">
		<div id={mountId}></div>
	</div>

	<div class="ff-row ff-wrap ff-gap-2 ff-checkoutActions">
		<button
			type="button"
			class="ff-btn ff-btn--primary ff-btn--lg ff-btn--pill ff-checkoutPrimaryCta"
			onclick={confirmPayment}
			disabled={!initialized || submitting}
			aria-disabled={!initialized || submitting}
		>
			{submitting ? 'Confirming secure payment…' : 'Complete secure donation'}
		</button>
	</div>

	<p class="ff-checkoutReassurance ff-help ff-muted ff-mt-2 ff-mb-0" aria-live="polite">
		Secure payment • Receipt-ready confirmation • No account required
	</p>

	<p class="ff-help ff-mutedStrong ff-mb-0">
		Payments are processed securely by Stripe, and the receipt will be sent to {donorEmail}.
	</p>
</div>
