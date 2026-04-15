import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';
import { createDonationElementsCheckoutSession } from '$lib/server/stripe';

function asString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

export const POST: RequestHandler = async ({ request, params, url }) => {
  try {
    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;

    const amount = Number(body?.amount);
    const donorName = asString(body?.donorName);
    const donorEmail = asString(body?.donorEmail);
    const donorMessage = asString(body?.donorMessage);
    const orgName = asString(body?.orgName) || 'Connect ATX Elite';
    const campaignName = asString(body?.campaignName) || 'Spring Fundraiser';

    if (!Number.isFinite(amount) || amount < 5) {
      return json(
        { ok: false, error: 'Please enter a valid donation amount of at least $5.' },
        { status: 400 }
      );
    }

    if (donorName.length < 2) {
      return json(
        { ok: false, error: 'Please enter the supporter name.' },
        { status: 400 }
      );
    }

    if (!/\S+@\S+\.\S+/.test(donorEmail)) {
      return json(
        { ok: false, error: 'Please enter a valid receipt email.' },
        { status: 400 }
      );
    }

    const slug = asString(params.slug) || 'connect-atx-elite';
    const origin = url.origin || 'http://127.0.0.1:5173';

    const session = await createDonationElementsCheckoutSession({
      amount,
      donorName,
      donorEmail,
      donorMessage,
      slug,
      orgName,
      campaignName,
      returnUrl: `${origin}/c/${slug}?checkout=success`
    });

    if (!session?.id) {
      throw new Error('Stripe session was created without an id.');
    }

    return json({
      ok: true,
      sessionId: session.id,
      clientSecret: session.clientSecret ?? null,
      publishableKey: env.PUBLIC_STRIPE_PUBLISHABLE_KEY ?? null
    });
  } catch (error) {
    console.error('Embedded Stripe checkout setup failed', error);

    return json(
      {
        ok: false,
        error: 'Could not initialize embedded checkout.'
      },
      { status: 500 }
    );
  }
};
