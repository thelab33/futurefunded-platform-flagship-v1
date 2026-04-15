export type SponsorTierKey = 'community' | 'featured' | 'founding';
export type PlanKey = 'starter' | 'growth';

export const ffPaths = {
  home: '/platform',
  pricing: '/platform/pricing',
  demo: '/platform/demo',
  onboarding: '/platform/onboarding',
  dashboard: '/platform/dashboard',
  fundraiser: '/c/connect-atx-elite'
} as const;

export const ffNav = [
  { label: 'Home', href: ffPaths.home },
  { label: 'Pricing', href: ffPaths.pricing },
  { label: 'Demo', href: ffPaths.demo },
  { label: 'Live fundraiser', href: ffPaths.fundraiser }
] as const;

export const ffCtas = {
  marketingPrimary: { label: 'Start guided launch', href: ffPaths.onboarding },
  marketingSecondary: { label: 'View live fundraiser', href: ffPaths.fundraiser },
  pricing: { label: 'See pricing', href: ffPaths.pricing },
  operator: { label: 'Open dashboard', href: ffPaths.dashboard },
  returnToSetup: { label: 'Return to setup', href: ffPaths.onboarding },
  publish: { label: 'Go live', href: ffPaths.dashboard }
} as const;

export const ffPlans = [
  {
    key: 'starter' satisfies PlanKey,
    name: 'Starter',
    price: '$49',
    billing: 'setup',
    kicker: 'Fastest way live',
    summary: 'Best for teams and organizations that want a polished launch, a credible public page, and one clean setup path.',
    bullets: [
      'Branded fundraiser page',
      'Clean launch workflow',
      'Donor-ready public surface',
      'Core operator access',
      'Fastest way live with one clear setup path'
    ],
    ctaLabel: 'Start Starter'
  },
  {
    key: 'growth' satisfies PlanKey,
    name: 'Growth',
    price: '$79',
    billing: '/mo',
    kicker: 'Best for revenue',
    summary: 'Best for teams and organizations that want sponsors, recurring support, and a stronger fundraising model from day one.',
    bullets: [
      'Everything in Starter',
      'Sponsor package positioning',
      'Recurring support',
      'Built to monetize beyond one-time donations',
      'Stronger sponsor revenue model'
    ],
    ctaLabel: 'Start Growth'
  }
] as const;

export const ffSponsorTiers = [
  {
    key: 'community' satisfies SponsorTierKey,
    name: 'Community Sponsor',
    price: '$250',
    badge: 'Visible to every donor',
    summary: 'Entry visibility for families, alumni, and local businesses that want donor-facing presence.',
    bullets: [
      'Logo or name on fundraiser',
      'Supporter-facing visibility',
      'Clean recognition without a heavy lift'
    ]
  },
  {
    key: 'featured' satisfies SponsorTierKey,
    name: 'Featured Partner',
    price: '$500',
    badge: 'Featured on launch',
    summary: 'Recommended tier for businesses that want stronger placement and clearer sponsor value.',
    bullets: [
      'Featured placement on fundraiser',
      'Stronger business visibility',
      'More attention during launch'
    ]
  },
  {
    key: 'founding' satisfies SponsorTierKey,
    name: 'Founding Sponsor',
    price: '$1,000',
    badge: 'Shown across donor shares',
    summary: 'Top-visibility tier for businesses that want premium placement and stronger brand association.',
    bullets: [
      'Priority sponsor placement',
      'Premium brand association',
      'Recognition across donor shares'
    ]
  }
] as const;

export const ffStory = {
  platformTitle: 'Launch one polished fundraiser.',
  platformSubtitle: 'One branded fundraiser plus one calm dashboard for launch, sponsors, and recurring support.',
  campaignTitle: 'Support the season with one clean, sponsor-ready fundraiser.',
  campaignSubtitle: 'Back travel, training, tournament fees, equipment, and shared team costs with a credible public fundraising surface.'
} as const;

export const ffJourney = [
  {
    step: '01',
    title: 'Open the live fundraiser',
    body: 'Start with the public surface so buyers immediately see polish, momentum, and sponsor credibility.'
  },
  {
    step: '02',
    title: 'Show pricing + sponsor logic',
    body: 'Explain how the platform creates cleaner support lanes for one-time gifts, sponsors, and recurring support.'
  },
  {
    step: '03',
    title: 'Move into guided launch',
    body: 'Shift from what it is into how fast the organization can go live.'
  },
  {
    step: '04',
    title: 'Reinforce operator confidence',
    body: 'Close with the dashboard story: the buyer is getting a clean fundraising system, not just a page.'
  }
] as const;

export const ffDashboard = {
  allowPublicDiagnostics: false,
  featuredTierKey: 'featured' as SponsorTierKey,
  recurringEnabledDefault: false
} as const;
