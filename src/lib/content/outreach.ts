export const outreachMessages = {
  coach: {
    subject: 'A cleaner fundraising setup for your team',
    body:
      `Hey Coach — I have been building a premium fundraising platform for teams that want something cleaner than a generic donation page.\n\n` +
      `It gives you:\n` +
      `- a branded public fundraiser\n` +
      `- sponsor packages on the same page\n` +
      `- a simple operator dashboard to manage launch and updates\n\n` +
      `The goal is to help programs raise money faster and look more credible to families, alumni, and sponsors.\n\n` +
      `I would love to show you a quick 2-minute demo using a real team example. Would you be open to that?`
  },
  school: {
    subject: 'A sponsor-ready fundraising platform for schools and programs',
    body:
      `Hi — I am working on a fundraising platform designed for schools, teams, and youth programs that need a more polished and sponsor-ready alternative to a basic donation page.\n\n` +
      `It combines:\n` +
      `- branded fundraising pages\n` +
      `- sponsor visibility packages\n` +
      `- launch and setup workflow\n` +
      `- an operator dashboard for managing the fundraiser\n\n` +
      `The idea is to make it easier to launch quickly, build trust, and create more structured fundraising revenue.\n\n` +
      `I would be glad to share a short demo if that would be useful.`
  },
  nonprofit: {
    subject: 'A cleaner donor experience for nonprofit fundraising',
    body:
      `Hi — I have been building a fundraising platform for nonprofits and community organizations that want a cleaner donor experience and a more sponsor-ready public page.\n\n` +
      `It helps organizations:\n` +
      `- launch a polished fundraiser quickly\n` +
      `- present sponsor visibility more clearly\n` +
      `- manage setup and updates from one place\n\n` +
      `It is built for groups that want something more modern and conversion-focused than a generic donation page.\n\n` +
      `Would you be open to a quick demo?`
  },
  warmIntro: {
    subject: 'Want to see what I have been building?',
    body:
      `Hey — I wanted to show you something I have been building.\n\n` +
      `It is a fundraising platform for teams, schools, nonprofits, and clubs that combines:\n` +
      `- a polished donation page\n` +
      `- sponsor packages\n` +
      `- branding and setup workflow\n` +
      `- a simple dashboard to manage everything\n\n` +
      `The big difference is that it is built to feel more credible and more revenue-ready than a basic fundraiser page.\n\n` +
      `If you have got 10 minutes sometime, I would love to walk you through it.`
  }
} as const;

export const smsMessages = {
  coach:
    'Hey Coach — I built a cleaner fundraising platform for teams with branded pages, sponsor packages, and a simple dashboard. Want a quick 2-minute demo?',
  school:
    'I built a sponsor-ready fundraising platform for schools and programs. It is cleaner than a basic donation page and easier to launch. Open to a quick demo?',
  nonprofit:
    'I built a cleaner fundraising platform for nonprofits with branded pages, sponsor visibility, and simpler setup. Want a quick walkthrough?',
  warmIntro:
    'I want to show you a fundraising product I have been building. It combines donations, sponsors, branding, and a simple dashboard in one system. Up for a quick demo?'
} as const;
