/* ============================================================
   PROJECTS — every product ffluxx makes, in the order ffluxx.com
   lists them. Each entry feeds BOTH ffluxx.com and its division
   site, so a change here shows up in both places.

   status:  'live'  → "Available now" pill
            'dev'   → "In development" pill
   seed:    picks the shape of the placeholder wave art (any number)

   Soft apps use:     platform, does[], release[], link
   Studio games use:  genre, more, facts[], store
   ============================================================ */

export const projects = [
  {
    id: 'fi',
    name: 'fi',
    division: 'soft',
    status: 'live',
    seed: 4,
    summary: 'A financial independence calculator. Put in what you have, what you add each month and what you spend in a year, and it tells you how long until the investments cover the expenses.',
    platform: 'Web',
    does: [
      'See the year your portfolio starts outgrowing your contributions',
      'Model taking some income early instead of waiting for the finish line',
      'Change your contribution in phases as your circumstances change',
      'Runs entirely in your browser — no account, nothing sent anywhere',
    ],
    release: [
      ['Platform', 'Web, any browser'],
      ['Status', 'Live'],
      ['Availability', 'Free, no sign-up'],
    ],
    // live projects link to the thing itself
    link: { href: '/FI/', label: 'Open fi', url: 'https://soft.ffluxx.com/FI/', display: 'soft.ffluxx.com/fi' },
  },
  {
    id: 'second-home',
    name: 'Second Home',
    division: 'soft',
    status: 'dev',
    seed: 1,
    summary: "A marketplace for the other half. Lost the right shoe, missing one earring, one card short of the set — list what you've got and find whoever has the piece you're missing.",
    platform: 'iOS first',
    does: [
      'List a single item, not a pair or a set',
      'Get matched to people looking for exactly what you have',
      "Search by what's missing rather than by category",
      'Trade, sell, or give it away — your call',
    ],
    release: [
      ['Platform', 'iOS, with Android to follow'],
      ['Status', 'Core matching in progress'],
      ['Availability', 'No date yet'],
    ],
  },
  {
    id: 'plant-guide',
    name: 'Plant Guide',
    division: 'soft',
    status: 'dev',
    seed: 2,
    summary: 'Step-by-step care for everything in your garden, tuned to where you actually live. Your soil, your light, your climate — not generic advice for a plant in the abstract.',
    platform: 'iOS first',
    does: [
      'Care steps adjusted to your location and season',
      'Track each plant individually, not by species',
      'Know what to do this week, not a wall of general tips',
      'Works for a windowsill or a full plot',
    ],
    release: [
      ['Platform', 'iOS, with Android to follow'],
      ['Status', 'Care model in progress'],
      ['Availability', 'No date yet'],
    ],
  },
  {
    id: 'hellenica',
    name: 'Hellenica',
    division: 'studio',
    status: 'dev',
    seed: 3,
    summary: 'Real-time grand strategy from the Hellenic city-states to the founding of the Roman Empire in the wake of Caesar.',
    genre: 'Grand strategy',
    more: 'A thousand years of the ancient Mediterranean, played out in real time. Start as one polis among many and see how far your version of history diverges from the one that happened.',
    store: 'Steam page not up yet',
    facts: [
      ['Genre', 'Real-time grand strategy'],
      ['Setting', 'The Hellenic world to the early Roman Empire'],
      ['Platform', 'PC'],
      ['Status', 'In development'],
      ['Release', 'No date yet'],
    ],
  },
  {
    id: 'business-tycoon',
    name: 'Business Tycoon',
    division: 'studio',
    status: 'dev',
    seed: 5,
    summary: "A clicker about compounding. Start with one business, reinvest what it earns, and buy your way into assets that keep earning while you're not looking.",
    genre: 'Idle / clicker',
    more: 'The whole game is one idea taken seriously: money that makes money. Every upgrade is a bet on how patient you are.',
    store: 'Store page not up yet',
    facts: [
      ['Genre', 'Idle / clicker'],
      ['Setting', 'Contemporary, abstract'],
      ['Platform', 'Not decided yet'],
      ['Status', 'In development'],
      ['Release', 'No date yet'],
    ],
  },
];

export const projectsIn = (division) => projects.filter((p) => p.division === division);
export const liveCount = (list) => list.filter((p) => p.status === 'live').length;
