export async function load({ params }) {
  const slug = params.slug || 'connect-atx-elite';
  const persistedSponsors = await getSponsorsForSlug(slug);
  return {
    persistedSponsors
  };
}

import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { createDonationCheckoutSession } from '$lib/server/stripe';
import { getSponsorsForSlug } from '$lib/server/sponsor-store';

function asString(value: FormDataEntryValue | null) {
  return typeof value === 'string' ? value.trim() : '';
}

export const actions: Actions = {
  donate: async ({ request, params, url }) => {
    const form = await request.formData();

    const amount = Number(asString(form.get('amount')));
    const donorName = asString(form.get('donorName'));
    const donorEmail = asString(form.get('donorEmail'));
    const donorMessage = asString(form.get('donorMessage'));
    const orgName = asString(form.get('orgName')) || 'Connect ATX Elite';
    const campaignName = asString(form.get('campaignName')) || 'Spring Fundraiser';

    if (!Number.isFinite(amount) || amount < 1) {
      return fail(400, { donateError: 'Please enter a valid donation amount.' });
    }

    if (donorName.length < 2) {
      return fail(400, { donateError: 'Please enter the supporter name.' });
    }

    if (!/\S+@\S+\.\S+/.test(donorEmail)) {
      return fail(400, { donateError: 'Please enter a valid receipt email.' });
    }

    const slug = params.slug || 'connect-atx-elite';
    const origin = url.origin || 'https://getfuturefunded.com';

    let session;
    try {
      session = await createDonationCheckoutSession({
        amount,
        donorName,
        donorEmail,
        donorMessage,
        slug,
        orgName,
        campaignName,
        successUrl: `${origin}/c/${slug}?checkout=success`,
        cancelUrl: `${origin}/c/${slug}?checkout=cancelled`
      });
    } catch (error) {
      console.error('Stripe checkout session failed', error);
      return fail(500, {
        donateError:
          'Checkout could not start. Verify STRIPE_SECRET_KEY and try again.'
      });
    }

    throw redirect(303, session.url);
  }
};
