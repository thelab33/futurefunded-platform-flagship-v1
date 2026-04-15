import {
  ffCtas,
  ffJourney,
  ffNav,
  ffPaths,
  ffPlans,
  ffSponsorTiers,
  ffStory
} from '$lib/config/futurefunded-offer';

export const marketingNav = ffNav;

export const marketingHero = {
  title: ffStory.platformTitle,
  subtitle: ffStory.platformSubtitle,
  primaryCta: ffCtas.marketingPrimary,
  secondaryCta: ffCtas.marketingSecondary,
  pricingCta: ffCtas.pricing
} as const;

export const pricingCards = ffPlans.map((plan) => ({
  name: plan.name,
  price: plan.billing.startsWith('/') ? `${plan.price}${plan.billing}` : `${plan.price} ${plan.billing}`,
  kicker: plan.kicker,
  summary: plan.summary,
  bullets: [...plan.bullets],
  cta: plan.ctaLabel
}));

export const sponsorCards = ffSponsorTiers.map((tier) => ({
  name: tier.name,
  amount: tier.price,
  badge: tier.badge,
  summary: tier.summary,
  bullets: [...tier.bullets]
}));

export const demoJourney = ffJourney.map((step) => ({
  step: step.step,
  title: step.title,
  body: step.body
}));

export const marketingLinks = {
  home: ffPaths.home,
  pricing: ffPaths.pricing,
  demo: ffPaths.demo,
  onboarding: ffPaths.onboarding,
  dashboard: ffPaths.dashboard,
  fundraiser: ffPaths.fundraiser
} as const;
