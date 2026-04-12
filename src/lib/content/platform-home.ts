export type Cta = {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
};

export type HeroRailCard = {
  title: string;
  items: string[];
  tone?: 'default' | 'feature' | 'success';
};

export type ProofItem = { label: string };

export type StepItem = {
  step: string;
  title: string;
  body: string;
};

export type RevenueLane = {
  title: string;
  body: string;
  pills?: string[];
  featured?: boolean;
};

export type UseCase = {
  title: string;
  body: string;
  meta: string;
};

export type PreviewItem = {
  label: string;
  title: string;
  body: string;
  stats?: { label: string; value: string }[];
};

export type SponsorTierPreview = {
  label: string;
  priceLabel: string;
  body: string;
  perks: string[];
  tone?: 'default' | 'featured' | 'vip';
};

export type BrandControl = {
  title: string;
  body: string;
};

export type FAQItem = {
  q: string;
  a: string;
};

export type FooterLink = {
  label: string;
  href: string;
};

export const platformSeo = {
  title: 'FutureFunded | Launch premium fundraising pages',
  description:
    'FutureFunded helps teams, schools, nonprofits, and clubs launch branded fundraising pages with secure donations, sponsor packages, memberships, and mobile-first trust.'
};

export const platformTopBar = {
  brand: {
    name: 'FutureFunded',
    subline: 'Fundraising platform'
  },
  nav: [
    { label: 'Platform', href: '/platform' },
    { label: 'Pricing', href: '/platform/pricing' },
    { label: 'Demo', href: '/platform/demo' },
    { label: 'Dashboard', href: '/platform/dashboard' }
  ] satisfies FooterLink[],
  ctas: {
    secondary: {
      label: 'View demo',
      href: '/platform/demo',
      variant: 'secondary',
      size: 'sm'
    } satisfies Cta,
    primary: {
      label: 'Start onboarding',
      href: '/platform/onboarding',
      variant: 'primary',
      size: 'sm'
    } satisfies Cta
  }
};

export const platformHero = {
  eyebrow: 'Turnkey fundraising for teams, schools, nonprofits, and clubs',
  title: 'Launch a sponsor-ready fundraising experience that feels premium from day one.',
  body:
    'FutureFunded helps organizations launch branded fundraising pages with secure donations, sponsor packages, memberships, and mobile-first trust — all from one operator-friendly workspace.',
  primaryCta: {
    label: 'View demo',
    href: '/platform/demo',
    variant: 'primary',
    size: 'lg'
  } satisfies Cta,
  secondaryCta: {
    label: 'Start onboarding',
    href: '/platform/onboarding',
    variant: 'secondary',
    size: 'lg'
  } satisfies Cta,
  trustPills: [
    'Secure payments',
    'Sponsor-ready',
    'Mobile-first',
    'Branded launch',
    'Operator-friendly'
  ],
  railCards: [
    {
      title: 'Brand your page',
      items: ['Upload logo', 'Choose colors', 'Set fundraising goal', 'Preview before publish'],
      tone: 'feature'
    },
    {
      title: 'Raise in more ways',
      items: ['One-time donations', 'Recurring memberships', 'Sponsor packages', 'VIP recognition'],
      tone: 'default'
    },
    {
      title: 'Launch-ready workflow',
      items: ['Stripe connected', 'PayPal optional', 'Mobile preview ready', 'Publish live'],
      tone: 'success'
    }
  ] satisfies HeroRailCard[]
};

export const platformProofStrip = {
  title: 'Built for real fundraising, real operators, and real sponsor support.',
  items: [
    { label: 'Secure checkout flows' },
    { label: 'Sponsor-ready presentation' },
    { label: 'Branded campaign pages' },
    { label: 'Mobile-first donor experience' },
    { label: 'Fast launch workflow' }
  ] satisfies ProofItem[]
};

export const platformHowItWorks = {
  eyebrow: 'How it works',
  title: 'Go from setup to live page without the usual fundraising friction.',
  lead:
    'FutureFunded is built to make launch simple: brand your page, connect payments, configure sponsor support, and go live with a premium fundraising surface.',
  steps: [
    {
      step: '01',
      title: 'Add your brand',
      body: 'Upload your logo, choose your colors, and shape a page that feels like your organization — not a generic template.'
    },
    {
      step: '02',
      title: 'Connect payments',
      body: 'Enable secure support with Stripe, optional PayPal, and a cleaner donor checkout flow.'
    },
    {
      step: '03',
      title: 'Set your revenue lanes',
      body: 'Accept one-time donations, recurring memberships, and sponsor packages from one unified campaign setup.'
    },
    {
      step: '04',
      title: 'Launch and share',
      body: 'Publish a mobile-first page that supporters, families, and sponsors can trust fast.'
    }
  ] satisfies StepItem[]
};

export const platformRevenueLanes = {
  eyebrow: 'Revenue lanes',
  title: 'More ways to raise, recognize, and grow support.',
  lead:
    'FutureFunded turns fundraising into a cleaner, more flexible support engine — with donations, memberships, sponsor visibility, and branded campaign momentum built in.',
  items: [
    {
      title: 'One-time donations',
      body: 'Give supporters a fast, trusted way to contribute from mobile or desktop without account friction.',
      pills: ['Mobile-first', 'Fast checkout']
    },
    {
      title: 'Recurring memberships',
      body: 'Invite families, alumni, and community supporters into ongoing monthly backing.',
      pills: ['Monthly support', 'Community retention']
    },
    {
      title: 'Sponsor packages',
      body: 'Offer real business-facing sponsor tiers with visible recognition and cleaner value.',
      pills: ['Business-ready', 'Tiered visibility'],
      featured: true
    },
    {
      title: 'VIP sponsor visibility',
      body: 'Highlight featured backers with premium placement, leaderboard-style recognition, and social proof.',
      pills: ['Premium recognition', 'Social proof']
    },
    {
      title: 'Campaign momentum',
      body: 'Use announcement bars, countdowns, and progress storytelling without making the page feel noisy.',
      pills: ['Announcements', 'Countdowns']
    },
    {
      title: 'Custom branding',
      body: 'Keep your fundraising experience aligned to your logo, colors, message, and audience.',
      pills: ['Logo', 'Colors', 'Brand control']
    }
  ] satisfies RevenueLane[]
};

export const platformUseCases = {
  eyebrow: 'Who it’s for',
  title: 'Built for organizations that need fundraising to look as serious as their mission.',
  lead:
    'Whether you’re funding a season, a school initiative, a nonprofit campaign, or a community program, FutureFunded is designed to launch quickly and present cleanly.',
  items: [
    {
      title: 'Youth teams',
      body: 'Support travel, training, tournaments, gear, and community sponsorship with a page families can trust.',
      meta: 'Travel • training • tournaments • sponsor support'
    },
    {
      title: 'Schools',
      body: 'Launch branded campaigns for booster clubs, programs, events, and school community support.',
      meta: 'Booster clubs • events • school fundraising'
    },
    {
      title: 'Nonprofits',
      body: 'Create mission-led fundraising pages that feel more trustworthy, more modern, and easier to act on.',
      meta: 'Mission-driven • donor trust • clean storytelling'
    },
    {
      title: 'Clubs & community groups',
      body: 'Give members and supporters a cleaner way to donate, join, sponsor, and stay engaged.',
      meta: 'Memberships • sponsors • community support'
    }
  ] satisfies UseCase[]
};

export const platformProductPreview = {
  eyebrow: 'Operator view',
  title: 'A product experience that’s polished for both operators and supporters.',
  lead:
    'FutureFunded is built to feel good on both sides: simple to launch internally, and clean to trust externally.',
  items: [
    {
      label: 'Onboarding',
      title: 'Setup that feels fast and intentional',
      body: 'Set logo, colors, fundraising goal, payments, and sponsor packages from one launch workspace.',
      stats: [
        { label: 'Logo', value: 'Ready' },
        { label: 'Payments', value: 'Connected' },
        { label: 'Brand', value: 'Applied' }
      ]
    },
    {
      label: 'Dashboard',
      title: 'Operator clarity without clutter',
      body: 'Track campaign progress, sponsor activity, support flow, and launch health in one operator view.',
      stats: [
        { label: 'Raised', value: '$18.4k' },
        { label: 'Sponsors', value: '12' },
        { label: 'Status', value: 'Live' }
      ]
    },
    {
      label: 'Live page',
      title: 'A premium supporter-facing surface',
      body: 'Publish a mobile-first campaign page built for trust, sponsor visibility, and stronger conversion.',
      stats: [
        { label: 'Mobile', value: 'Optimized' },
        { label: 'Checkout', value: 'Secure' },
        { label: 'Brand', value: 'Custom' }
      ]
    }
  ] satisfies PreviewItem[]
};

export const platformSponsorCommerce = {
  eyebrow: 'Sponsor commerce',
  title: 'Sponsor support that feels credible to local businesses.',
  lead:
    'FutureFunded treats sponsorship like a real support lane, not an afterthought — with clearer value, stronger visibility, and cleaner presentation.',
  featuredBand: {
    kicker: 'Fast sponsor path',
    title: 'Give businesses a clearer reason to say yes.',
    body: 'Visible recognition, premium placement, and clean sponsor packaging make support easier to pitch and easier to trust.'
  },
  tiers: [
    {
      label: 'Community sponsor',
      priceLabel: '$250',
      body: 'Entry-level visibility for local supporters and community partners.',
      perks: ['Business name listed', 'Community visibility', 'Simple sponsor entry'],
      tone: 'default'
    },
    {
      label: 'Featured sponsor',
      priceLabel: '$1,000',
      body: 'Stronger placement for businesses that want more meaningful visibility.',
      perks: ['Featured placement', 'Spotlight mention', 'Most popular'],
      tone: 'featured'
    },
    {
      label: 'VIP sponsor',
      priceLabel: '$2,500',
      body: 'Top-tier recognition with premium positioning and leaderboard-style visibility.',
      perks: ['Top placement', 'VIP visibility', 'Priority recognition'],
      tone: 'vip'
    }
  ] satisfies SponsorTierPreview[]
};

export const platformBrandControl = {
  eyebrow: 'Brand + launch control',
  title: 'Brand it once. Launch like a real platform.',
  lead:
    'FutureFunded makes it easy to deliver a fundraising experience that feels custom without forcing every organization into a complicated setup process.',
  items: [
    {
      title: 'Logo and color control',
      body: 'Set your visual identity up front so every page feels aligned to your brand.'
    },
    {
      title: 'Campaign setup',
      body: 'Choose your goal, support story, and sponsor options without rebuilding your page each time.'
    },
    {
      title: 'Momentum features',
      body: 'Use countdowns, announcement bars, and supporter-friendly updates when they actually help conversion.'
    }
  ] satisfies BrandControl[]
};

export const platformFaq = {
  eyebrow: 'Questions before launch',
  title: 'Everything organizations usually ask before they go live.',
  lead:
    'A few fast answers before someone books a demo, starts onboarding, or puts FutureFunded in front of their team.',
  items: [
    {
      q: 'How fast can we launch?',
      a: 'FutureFunded is designed to help organizations move from setup to live page quickly with branding, payments, sponsor options, and fundraising structure already baked in.'
    },
    {
      q: 'Can we use our own branding?',
      a: 'Yes. Logo, colors, campaign framing, and page presentation are all designed to reflect your organization clearly.'
    },
    {
      q: 'Can we accept sponsors and donations?',
      a: 'Yes. FutureFunded supports both direct giving and sponsor package lanes so organizations can raise in more than one way.'
    },
    {
      q: 'Does this work for teams, schools, and nonprofits?',
      a: 'Yes. The platform is designed for a wide range of community-focused organizations that need a premium launch surface.'
    },
    {
      q: 'Is checkout secure?',
      a: 'Yes. The support flow is designed around secure payment handling, clear supporter trust, and mobile-first conversion.'
    }
  ] satisfies FAQItem[]
};

export const platformCloseBand = {
  eyebrow: 'Ready to launch',
  title: 'FutureFunded gives your organization a cleaner way to raise, brand, and grow support.',
  body:
    'Launch a fundraising experience that feels credible to supporters, polished to sponsors, and manageable for your team.',
  primaryCta: {
    label: 'Start onboarding',
    href: '/platform/onboarding',
    variant: 'primary',
    size: 'lg'
  } satisfies Cta,
  secondaryCta: {
    label: 'View demo',
    href: '/platform/demo',
    variant: 'secondary',
    size: 'lg'
  } satisfies Cta
};

export const platformFooter = {
  brand: {
    name: 'FutureFunded',
    subline: 'Premium fundraising infrastructure for modern organizations.'
  },
  links: [
    { label: 'Platform', href: '/platform' },
    { label: 'Pricing', href: '/platform/pricing' },
    { label: 'Demo', href: '/platform/demo' },
    { label: 'Dashboard', href: '/platform/dashboard' },
    { label: 'Launch', href: '/platform/onboarding' }
  ] satisfies FooterLink[]
};
