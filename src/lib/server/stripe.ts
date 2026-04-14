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

// FF_STRIPE_CHECKOUT_HELPER_START
type DonationCheckoutSessionInput = {
  amount: number;
  donorName?: string;
  donorEmail: string;
  donorMessage?: string;
  slug: string;
  successUrl: string;
  cancelUrl: string;
  orgName: string;
  campaignName: string;
};

export async function createDonationCheckoutSession(
  input: DonationCheckoutSessionInput
) {
  const session = await stripe().checkout.sessions.create({
    mode: 'payment',
    submit_type: 'donate',
    success_url: input.successUrl,
    cancel_url: input.cancelUrl,
    customer_email: input.donorEmail || undefined,
    metadata: {
      slug: input.slug,
      donorName: input.donorName || '',
      donorEmail: input.donorEmail,
      donorMessage: input.donorMessage || '',
      orgName: input.orgName,
      campaignName: input.campaignName
    },
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: 'usd',
          unit_amount: Math.round(input.amount * 100),
          product_data: {
            name: `${input.orgName} Donation`,
            description: input.campaignName
          }
        }
      }
    ]
  });

  if (!session.url) {
    throw new Error('Stripe checkout session did not return a URL.');
  }

  return {
    id: session.id,
    url: session.url
  };
}
// FF_STRIPE_CHECKOUT_HELPER_END

// FF_STRIPE_ELEMENTS_CHECKOUT_HELPER_START
type DonationElementsCheckoutSessionInput = {
  amount: number;
  donorName?: string;
  donorEmail: string;
  donorMessage?: string;
  slug: string;
  returnUrl: string;
  orgName: string;
  campaignName: string;
};

export async function createDonationElementsCheckoutSession(
  input: DonationElementsCheckoutSessionInput
) {
  const amountCents = normalizeUsdAmount(input.amount);

  const session = await stripe().checkout.sessions.create({
    mode: 'payment',
    ui_mode: 'elements',
    return_url: input.returnUrl,
    customer_email: input.donorEmail || undefined,
    metadata: {
      slug: input.slug,
      donorName: input.donorName || '',
      donorEmail: input.donorEmail,
      donorMessage: input.donorMessage || '',
      orgName: input.orgName,
      campaignName: input.campaignName
    },
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: STRIPE_CURRENCY,
          unit_amount: amountCents,
          product_data: {
            name: `${input.orgName} Donation`,
            description: input.campaignName
          }
        }
      }
    ]
  });

  if (!session.client_secret) {
    throw new Error('Stripe checkout session did not return a client_secret.');
  }

  return {
    id: session.id,
    clientSecret: session.client_secret
  };
}
// FF_STRIPE_ELEMENTS_CHECKOUT_HELPER_END

// FF_STRIPE_SPONSOR_CHECKOUT_HELPER_START
type SponsorCheckoutSessionInput = {
  amount: number;
  sponsorTier: string;
  sponsorBusiness: string;
  sponsorContact: string;
  sponsorEmail: string;
  slug: string;
  orgName: string;
  campaignName: string;
  successUrl: string;
  cancelUrl: string;
};

export async function createSponsorCheckoutSession(
  input: SponsorCheckoutSessionInput
) {
  const amountCents = normalizeUsdAmount(input.amount);

  const session = await stripe().checkout.sessions.create({
    mode: 'payment',
    success_url: input.successUrl,
    cancel_url: input.cancelUrl,
    customer_email: input.sponsorEmail || undefined,
    metadata: {
      type: 'sponsor',
      slug: input.slug,
      sponsorTier: input.sponsorTier,
      sponsorBusiness: input.sponsorBusiness,
      sponsorContact: input.sponsorContact,
      sponsorEmail: input.sponsorEmail,
      orgName: input.orgName,
      campaignName: input.campaignName
    },
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: STRIPE_CURRENCY,
          unit_amount: amountCents,
          product_data: {
            name: `${input.orgName} Sponsor Package`,
            description: `${input.campaignName} • ${input.sponsorTier} sponsor tier`
          }
        }
      }
    ]
  });

  if (!session.url) {
    throw new Error('Stripe sponsor checkout session did not return a URL.');
  }

  return {
    id: session.id,
    url: session.url
  };
}
// FF_STRIPE_SPONSOR_CHECKOUT_HELPER_END

