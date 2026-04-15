export type BuyerType = 'coach' | 'school' | 'nonprofit' | 'club';

export const verbalPitches = {
  short10:
    'FutureFunded helps teams and organizations launch branded fundraising pages with sponsor packages and a simple dashboard to manage everything.',
  short20:
    'It is a sponsor-ready fundraising platform for teams, schools, nonprofits, and clubs. Instead of a basic donation page, they get a polished public fundraiser, launch workflow, and operator dashboard in one system.',
  short30:
    'FutureFunded is a turnkey fundraising platform that helps organizations launch faster, look more credible, and create more structured revenue through donations, sponsor packages, and recurring support from one cleaner workflow.'
} as const;

export const productFraming = {
  headline: 'Launch fast. Look credible. Monetize beyond one-time donations.',
  subhead:
    'FutureFunded gives teams, schools, nonprofits, and clubs a calmer way to launch fundraising with branded pages, sponsor offers, and operator control in one product.',
  wedge:
    'Most groups can get a donation page. Very few get a fundraiser that feels credible, supports sponsor outreach, and gives the organizer a clean launch workflow.'
} as const;

export const demoFlow = [
  {
    id: 'platform',
    route: '/platform',
    label: 'Platform overview',
    talkTrack:
      'What FutureFunded does is give teams, schools, nonprofits, and clubs a cleaner way to launch fundraising without stitching together a donate page, sponsor outreach, and launch workflow across multiple tools.'
  },
  {
    id: 'onboarding',
    route: '/platform/onboarding',
    label: 'Launch workspace',
    talkTrack:
      'This is the setup flow. A group can set organization info, branding, fundraiser story, and revenue setup in one place, so they move through one guided launch instead of piecing things together.'
  },
  {
    id: 'dashboard',
    route: '/platform/dashboard',
    label: 'Operator dashboard',
    talkTrack:
      'This is the operator view. It shows whether the page is live, what still needs wiring, where sponsor readiness stands, and what the next action is, so the fundraiser does not feel guessy.'
  },
  {
    id: 'campaign',
    route: '/c/connect-atx-elite',
    label: 'Live fundraising page',
    talkTrack:
      'This is the public fundraising surface. It is built to convert donors and sponsors on the same page with trust cues, clear goal tracking, strong branding, and sponsor packages that feel buyable.'
  }
] as const;

export const closeLines = [
  'So instead of just getting a generic donation page, you get a launch-ready fundraising system that helps you raise money, package sponsor visibility, and manage the whole thing from one calmer workflow.',
  'Starter gets you live fast. Growth helps you monetize properly.',
  'I can tailor this to your branding, fundraising goal, and sponsor tiers so you can see what it would look like for your organization.'
] as const;

export const buyerPitches: Record<BuyerType, { title: string; caresAbout: string[]; pitch: string }> = {
  coach: {
    title: 'Coach pitch',
    caresAbout: [
      'raising money fast',
      'less parent and organizer chaos',
      'making the program look legitimate',
      'getting sponsor help without extra admin'
    ],
    pitch:
      'This helps your team launch a polished fundraiser fast, track progress, and package sponsor visibility without juggling a bunch of tools.'
  },
  school: {
    title: 'School pitch',
    caresAbout: [
      'credibility',
      'safer presentation',
      'consistency',
      'less administrative mess'
    ],
    pitch:
      'This gives your program a more structured and professional fundraising surface, with a cleaner setup process and a more trustworthy public experience.'
  },
  nonprofit: {
    title: 'Nonprofit pitch',
    caresAbout: [
      'donor trust',
      'clear story',
      'repeatable fundraising',
      'sponsor and community alignment'
    ],
    pitch:
      'This helps you launch a cleaner donor experience while also creating sponsor visibility packages that are easier to explain and easier for local businesses to say yes to.'
  },
  club: {
    title: 'Club pitch',
    caresAbout: [
      'ease',
      'branding',
      'being taken seriously',
      'simple money collection'
    ],
    pitch:
      'This gives your organization a premium fundraising page and a simple launch workflow, so you can raise money and look organized without needing a full technical team.'
  }
};

export const objections = [
  {
    objection: 'We already use GoFundMe or another donation tool.',
    response:
      'That makes sense. The difference here is that this is not just a donation page. It gives you branding, sponsor offers, clearer trust signals, and an operator workflow so the fundraiser feels more like a real program launch.'
  },
  {
    objection: 'We do not really have sponsors.',
    response:
      'That is part of the value. Most groups do not have a clean sponsor offer, so they default to simple donation asks. This gives you a more structured way to present visibility and recognition.'
  },
  {
    objection: 'We do not have time.',
    response:
      'That is exactly who it is built for. The whole point is to reduce setup drag and get you to a credible public page much faster.'
  },
  {
    objection: 'We just need something simple.',
    response:
      'Starter is for exactly that. It gets you live quickly with a polished public fundraiser, and you can grow into sponsor packages later.'
  }
] as const;

export const pricingPositioning = {
  starter: {
    name: 'Starter',
    oneLiner: 'Best for groups that need to launch quickly with a polished public fundraiser and a better first impression than a generic donation tool.',
    buying: ['fast launch', 'clean branded page', 'donor-ready public surface', 'operator setup path']
  },
  growth: {
    name: 'Growth',
    oneLiner: 'Best for groups that want sponsor packages, recurring support, and a fundraising setup that can generate more than one-time donations.',
    buying: ['sponsor monetization', 'recurring support lane', 'better operator workflow', 'stronger long-term fundraising model']
  }
} as const;
