/* ============================================================
   studio.ffluxx.com — homepage content.
   Games themselves live in content/projects/ — one file each.
   **double asterisks** make text bold.
   ============================================================ */

export const nav = [
  { label: 'Games', href: '#games' },
  { label: 'Follow', href: '#follow', hideSm: true },
  { label: 'Devlog', href: '#devlog', hideSm: true },
];

export const hero = {
  eyebrow: 'ffluxxStudio — division 02',
  title: 'Two games, built ',
  titleEm: 'in the open.',
  body: 'One is a grand strategy game spanning a thousand years. The other is a clicker about compound interest. **Neither is playable yet** — but the work is public, and you can follow it from here.',
};

export const games = {
  title: 'The games',
  artLabel: 'Key art pending',
};

export const follow = {
  eyebrow: 'Follow the work',
  title: "Know when it's playable",
  note: 'One email when a game opens for testing, and one when it launches. No marketing in between. Unsubscribe whenever you like.',
  // INTEGRATION POINT: a handler accepting POST {email, games[]}.
  // While empty the form validates, then says nothing was saved.
  endpoint: '',
  success: 'Signed up. We\u2019ll be in touch when there\u2019s something to play.',
  // heading of the signup form on each game's own page
  projectTitle: 'Know when {name} is playable',
};

/* Each game's own page (studio.ffluxx.com/games/<name>/) — header links. */
export const projectPage = {
  listHref: '/#games',
  nav: [
    { label: 'All games', href: '/#games' },
    { label: 'Updates', href: '#updates', hideSm: true },
    { label: 'Devlog', href: '/#devlog', hideSm: true },
  ],
};

/* DEVLOG — studio-wide entries only. date is YYYY-MM-DD.
   Entries about one game go in that game's `updates` in content/projects/ —
   they're merged in here automatically, newest first. */
export const devlog = [
  {
    date: '2026-08-26',
    title: 'The studio has a front door',
    body: "studio.ffluxx.com is live. Both games now have somewhere to be seen while they're being made, rather than waiting until there's something to sell.",
  },
];
