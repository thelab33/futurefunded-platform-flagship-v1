import Stripe from 'stripe';
import { env } from '$env/dynamic/private';

const STRIPE_CURRENCY = 'usd';
const MIN_DONATION_USD = 5;
const MAX_DONATION_USD = 25000;

type CreateDonationIntentInput = {
  campaignId: string;
  organizationId: string;
  amount: number;
  donorEmail?: string;
  donorName?: string;
  coverFees?: boolean;
  campaignSlug: string;
  idempotencyKey?: string;
};

type CreateDonationIntentResult = {
  id: string;
  clientSecret: string;
  amount: number;
  amountCents: number;
  currency: string;
};

let stripeInstance: Stripe | null = null;

function requireStripeSecret() {
  const secret = env.STRIPE_SECRET_KEY?.trim();

  if (!secret) {
    throw new Error('STRIPE_SECRET_KEY is not set.');
  }

  return secret;
}

export function stripe() {
  if (!stripeInstance) {
    stripeInstance = new Stripe(requireStripeSecret());
  }
  return stripeInstance;
}

function sanitizeText(value: string | undefined, maxLength = 120) {
  return (value ?? '').trim().slice(0, maxLength);
}

function normalizeUsdAmount(amount: number) {
  if (!Number.isFinite(amount)) {
    throw new Error('Donation amount must be a valid number.');
  }

  const rounded = Math.round(amount * 100);

  if (rounded < MIN_DONATION_USD * 100) {
    throw new Error(`Donation amount must be at least $${MIN_DONATION_USD}.`);
  }

  if (rounded > MAX_DONATION_USD * 100) {
    throw new Error(`Donation amount must be no more than $${MAX_DONATION_USD.toLocaleString()}.`);
  }

  return rounded;
}

function buildMetadata(input: CreateDonationIntentInput): Record<string, string> {
  return {
    campaignId: sanitizeText(input.campaignId, 80),
    organizationId: sanitizeText(input.organizationId, 80),
    campaignSlug: sanitizeText(input.campaignSlug, 80),
    donorName: sanitizeText(input.donorName, 80),
    coverFees: String(Boolean(input.coverFees))
  };
}

export async function createDonationIntent(
  input: CreateDonationIntentInput
): Promise<CreateDonationIntentResult> {
  const amountCents = normalizeUsdAmount(input.amount);

  const paymentIntent = await stripe().paymentIntents.create(
    {
      amount: amountCents,
      currency: STRIPE_CURRENCY,
      automatic_payment_methods: { enabled: true },
      receipt_email: sanitizeText(input.donorEmail, 120) || undefined,
      description: `Donation to ${sanitizeText(input.campaignSlug, 80) || 'campaign'}`,
      metadata: buildMetadata(input)
    },
    input.idempotencyKey
      ? {
          idempotencyKey: input.idempotencyKey
        }
      : undefined
  );

  if (!paymentIntent.client_secret) {
    throw new Error('Stripe did not return a client secret.');
  }

  return {
    id: paymentIntent.id,
    clientSecret: paymentIntent.client_secret,
    amount: input.amount,
    amountCents,
    currency: STRIPE_CURRENCY
  };
}
