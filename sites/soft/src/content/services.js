/* ============================================================
   soft.ffluxx.com/services — content.
   **double asterisks** make text bold.
   ============================================================ */

export const nav = [
  { label: 'Services', href: '/services/', here: true },
  { label: 'Our apps', href: '/#apps', hideSm: true },
  { label: 'Get a quote', href: '#quote' },
];

export const hero = {
  eyebrow: 'ffluxxSoft — services',
  title: 'We build for ',
  titleEm: 'other people too.',
  body: 'Websites and apps, made properly and priced in the open. **You get a fixed quote before any work starts**, and you own everything at the end — code, domain, accounts, all of it.',
};

/* icon: one of chat, doc, design, browser, handover (see ProcessFlow.jsx) */
export const process = {
  title: 'How it works',
  eyebrow: 'Five steps · no surprises',
  lede: "Most of what goes wrong on a small software project goes wrong before anyone writes code — unclear scope, a moving finish line, a price that changes after you've committed. This is how we avoid that.",
  steps: [
    { icon: 'chat',     title: 'A conversation',     body: "Twenty minutes about what you need and why. Free, and there's no pitch at the end of it." },
    { icon: 'doc',      title: 'A written scope',    body: "Exactly what's being built, what it costs, and when it's done. You approve it before anything begins." },
    { icon: 'design',   title: 'Design before build', body: "You see the thing before it's made, and change it while changing it is cheap. Two rounds included." },
    { icon: 'browser',  title: 'Built in the open',  body: 'A live link from the first week. You watch it come together instead of waiting for a reveal.' },
    { icon: 'handover', title: 'Handover',           body: 'Everything transfers to accounts in your name. Leave whenever you like — nothing is held hostage.' },
  ],
};

/* price: { from?: true, amount: '$1,400', per?: 'month' }
   pick:  preselects "What do you need?" in the quote form — must match a quoteForm.types value */
export const rates = {
  title: 'Rates',
  eyebrow: 'Starting prices · fixed once scoped',
  lede: "Every price below is a starting point, not a ceiling — what moves it is scope, not how much we think you can pay. After the scope conversation the number is fixed, and it doesn't change unless you ask for something new.",
  tiers: [
    { kind: 'One page', title: 'Landing page', price: { from: true, amount: '$1,400' }, turn: '1–2 weeks',
      items: ['Single page, designed around one action', 'Works properly on phones', 'Contact or signup form', 'Deployed and live'],
      cta: 'Start here', pick: 'landing' },
    { kind: 'Most common', title: 'Small business site', price: { from: true, amount: '$3,200' }, turn: '3–4 weeks', feature: true,
      items: ['Up to five pages, custom designed', 'Search basics and analytics set up', 'Contact forms and maps', 'Deployed, with a handover walkthrough'],
      cta: 'Start here', pick: 'site' },
    { kind: 'Does something', title: 'Site with functionality', price: { from: true, amount: '$7,000' }, turn: '6–8 weeks',
      items: ['Booking, payments, or a shop', 'A CMS so you can edit it yourself', 'Accounts and logins where needed', 'Connections to tools you already use'],
      cta: 'Start here', pick: 'functional' },
  ],
  included: [
    'Custom design — no bought templates',
    'Two rounds of revisions at the design stage',
    'Mobile, tablet and desktop',
    'Accessibility and performance checks before launch',
    'Everything transferred into your accounts',
  ],
  excluded: [
    'Writing your copy or sourcing photography',
    'Domain and hosting fees — paid direct, roughly $20–$300 a year',
    'Third-party subscriptions your site needs',
    "Changes after handover, unless you're on a care plan",
    'Logo and brand identity work',
  ],
};

export const bigger = {
  title: 'Bigger than a website',
  eyebrow: 'Quoted individually',
  tiers: [
    { kind: 'iOS · Android · Web', title: 'Apps and custom software', price: { from: true, amount: '$18,000' }, turn: 'Quoted after a scoping call',
      items: ['Real accounts, real data, real backend', 'Built for one platform first, deliberately', 'Priced in stages, so you can stop between them'],
      cta: 'Talk it through', pick: 'app' },
    { kind: 'After launch', title: 'Care plan', price: { from: true, amount: '$120', per: 'month' }, turn: 'Monthly · cancel any time',
      items: ['Updates, backups and uptime monitoring', 'Small changes each month, no charge', 'You keep hosting in your own name'],
      cta: 'Ask about it', pick: 'care' },
    { kind: 'By the hour', title: 'Ad-hoc work', price: { amount: '$110', per: 'hour' }, turn: 'Billed in half-hour blocks',
      items: ['Fixes and changes to an existing site', "A second opinion on someone else's build", 'No minimum, no retainer'],
      cta: 'Get in touch', pick: 'hourly' },
  ],
};

export const proof = {
  eyebrow: 'What you can judge us on',
  title: 'The work is public',
  paragraphs: [
    "ffluxx builds its own software — two apps under ffluxxSoft and two games under ffluxxStudio, all in development and all documented in the open as they're made.",
    "This site and the two beside it were designed and built in-house, from the typography to the mark to the wave that follows your scroll. If you want to know what we'd make for you, the most honest answer available is what we make for ourselves.",
  ],
  links: [
    { label: 'See the apps', href: '/#apps' },
    { label: 'See the games', href: 'https://studio.ffluxx.com' },
  ],
};

export const quote = {
  eyebrow: 'Get a quote',
  title: 'Tell us what you need',
  note: "You'll hear back within two working days with either a price or a question. If it isn't something we should be building for you, we'll say so.",
  fineprint: 'Half the fee starts the work, half on launch. Nothing is owed for the scoping conversation, and the quote you approve is the price you pay.',
  // INTEGRATION POINT: a handler accepting POST
  // {name,email,company,type,budget,when,detail}. While empty the form
  // validates, then tells the visitor nothing was sent.
  endpoint: '',
  types: [
    ['landing', 'Landing page'],
    ['site', 'Small business site'],
    ['functional', 'Site with functionality'],
    ['app', 'App or custom software'],
    ['care', 'Care plan for an existing site'],
    ['hourly', 'Ad-hoc work by the hour'],
    ['unsure', 'Not sure yet'],
  ],
  budgets: [
    ['under-1500', 'Under $1,500'],
    ['1500-3500', '$1,500 – $3,500'],
    ['3500-7500', '$3,500 – $7,500'],
    ['7500-20000', '$7,500 – $20,000'],
    ['20000-plus', '$20,000+'],
    ['unsure', 'Not sure yet'],
  ],
  timings: [
    ['asap', 'As soon as possible'],
    ['1-3m', 'In the next month or two'],
    ['3m-plus', 'Three months or more'],
    ['exploring', 'Just exploring'],
  ],
};
