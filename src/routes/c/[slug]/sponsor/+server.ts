import { json } from '@sveltejs/kit';
import { createSponsorCheckoutSession } from '$lib/server/stripe';

function asString(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

const SPONSOR_AMOUNTS: Record<string, number> = {
  community: 100,
  partner: 250,
  champion: 500,
  vip: 1000
};

export async function POST({ request, params, url }) {
  try {
    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;

    const sponsorTier = asString(body?.sponsorTier || 'partner').toLowerCase();
    const sponsorBusiness = asString(body?.sponsorBusiness);
    const sponsorContact = asString(body?.sponsorContact);
    const sponsorEmail = asString(body?.sponsorEmail);
    const orgName = asString(body?.orgName) || 'Connect ATX Elite';
    const campaignName = asString(body?.campaignName) || 'Spring Fundraiser';

    if (!sponsorBusiness || sponsorBusiness.length < 2) {
      return json({ error: 'Please enter the business name.' }, { status: 400 });
    }

    if (!sponsorContact || sponsorContact.length < 2) {
      return json({ error: 'Please enter the sponsor contact name.' }, { status: 400 });
    }

    if (!/\S+@\S+\.\S+/.test(sponsorEmail)) {
      return json({ error: 'Please enter a valid business email.' }, { status: 400 });
    }

    const amount = SPONSOR_AMOUNTS[sponsorTier] ?? 250;
    const slug = params.slug || 'connect-atx-elite';
    const origin = url.origin || 'https://getfuturefunded.com';

    const session = await createSponsorCheckoutSession({
      amount,
      sponsorTier,
      sponsorBusiness,
      sponsorContact,
      sponsorEmail,
      slug,
      orgName,
      campaignName,
      successUrl: `${origin}/c/${slug}?sponsor=success`,
      cancelUrl: `${origin}/c/${slug}?sponsor=cancelled`
    });

    return json({ url: session.url });
  } catch (error) {
    console.error('Sponsor checkout session failed', error);
    return json(
      { error: 'Sponsor checkout could not start. Verify Stripe setup and try again.' },
      { status: 500 }
    );
  }
}
