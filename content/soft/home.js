/* ============================================================
   soft.ffluxx.com — homepage content.
   Apps themselves live in content/projects/ — one file each.
   **double asterisks** make text bold.
   ============================================================ */

export const nav = [
  { label: 'Our work', href: '#work' },
  { label: 'Services', href: '/services/' },
  { label: 'Get notified', href: '#signup', hideSm: true },
  { label: 'Build notes', href: '#notes', hideSm: true },
];

export const hero = {
  eyebrow: 'ffluxxSoft — division 01',
  title: 'Apps for problems ',
  titleEm: 'nobody bothered to solve.',
  cta: {
    eyebrow: 'Need something built?',
    body: 'We take client work as well as our own. **Websites from $1,400**, apps quoted individually — with the rates and the process published rather than hidden behind a call.',
    button: { label: 'See services and rates', href: '/services/' },
  },
};

export const working = {
  title: "What we're working on",
  eyebrow: 'Two kinds of work',
  cards: [
    {
      href: '#first-party', tag: 'First-party', title: 'Our own software',
      body: '**Our IP.**.',
      // {apps} and {live} are filled in from projects.js
      go: ({ apps, live }) => `${apps} apps, ${live} you can use today`,
    },
    {
      href: '#client-work', tag: 'Third-party', title: 'Built for other companies',
      body: "**Our customer's IP.** We build it under contract and hand over the code and the accounts at the end. It carries their name, and it stays theirs.",
      go: () => 'Taking on new work',
    },
  ],
};

export const firstParty = {
  title: 'What we build for ourselves',
  eyebrow: ({ apps, live }) => `First-party · ${apps} apps · ${live} live`,
  artLabel: 'Screens pending',
};

/* ------------------------------------------------------------
   CLIENT WORK — add one entry per live client project.
   While the list is empty, the "Nothing here yet" panel shows.
     { who: 'Client name' or 'Confidential', title: 'What it is',
       body: 'One or two lines on what we built.', tags: ['Website', '2026'] }
   ------------------------------------------------------------ */
export const clients = [];

export const clientWork = {
  title: 'What we build for other people',
  eyebrow: 'Third-party · under contract',
  empty: {
    title: 'Nothing here yet',
    body: "Client projects appear on this page once they're live and the client is happy to be named. If you'd like the first one to be yours, the rates and the process are published rather than hidden behind a call.",
    button: { label: 'See services and rates', href: '/services/' },
  },
};

export const signup = {
  eyebrow: 'Stay in the loop',
  title: 'Hear about it first',
  note: 'One email when an app opens for testing, and one when it ships. Nothing else. Unsubscribe whenever you like.',
  // INTEGRATION POINT: a handler accepting POST {email, apps[]}.
  // While empty the form validates, then says nothing was saved.
  endpoint: '',
  success: 'Signed up. We\u2019ll be in touch when there\u2019s something to try.',
  // heading of the signup form on each app's own page
  projectTitle: 'Hear when {name} is ready',
};

/* Each app's own page (soft.ffluxx.com/apps/<name>/) — header links. */
export const projectPage = {
  listHref: '/#first-party',
  nav: [
    { label: 'All apps', href: '/#first-party' },
    { label: 'Services', href: '/services/' },
    { label: 'Updates', href: '#updates', hideSm: true },
  ],
};

/* BUILD NOTES — division-wide notes only. date is YYYY-MM-DD.
   Notes about one app go in that app's `updates` in content/projects/ —
   they're merged in here automatically, newest first. */
export const buildNotes = [
  { date: '2026-08-26', body: 'division site is up. Both apps now have a home of their own to grow into.' },
];
