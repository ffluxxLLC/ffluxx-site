/* ============================================================
   studio.ffluxx.com — homepage content.
   Games themselves live in shared/data/projects.js.
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
  notifyLabel: 'Tell me when it is',
};

export const follow = {
  eyebrow: 'Follow the work',
  title: "Know when it's playable",
  note: 'One email when a game opens for testing, and one when it launches. No marketing in between. Unsubscribe whenever you like.',
  // INTEGRATION POINT: a handler accepting POST {email, games[]}.
  // While empty the form validates, then says nothing was saved.
  endpoint: '',
  success: 'Signed up. We\u2019ll be in touch when there\u2019s something to play.',
};

/* DEVLOG — newest first. date is YYYY-MM-DD; tag is a game name or 'ffluxxStudio'. */
export const devlog = [
  {
    date: '2026-08-26', tag: 'ffluxxStudio',
    title: 'The studio has a front door',
    body: "studio.ffluxx.com is live. Both games now have somewhere to be seen while they're being made, rather than waiting until there's something to sell.",
  },
  {
    date: '2026-08-18', tag: 'Hellenica',
    title: 'Time, and how much of it to simulate',
    body: 'A thousand years is a long time to hold in a real-time game. Working out which centuries deserve detail and which can move quickly.',
  },
  {
    date: '2026-08-09', tag: 'Business Tycoon',
    title: 'Making patience feel like a choice',
    body: 'An idle game lives or dies on the shape of its curve. Tuning the early upgrades so reinvesting feels like a decision rather than the only option.',
  },
];
