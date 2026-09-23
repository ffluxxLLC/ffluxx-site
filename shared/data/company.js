/* ============================================================
   COMPANY — facts that appear on more than one site.
   Change a domain, colour or email here and every site follows.
   ============================================================ */

export const company = {
  name: 'ffluxx',
  url: 'https://ffluxx.com',
  domain: 'ffluxx.com',
  email: 'hello@ffluxx.com',
  copyright: '© 2026 ffluxx',
  // the parent mark is the two divisions' lead waves together
  wave: ['#7B5CFF', '#E9DC4E'],
};

export const divisions = {
  soft: {
    key: 'soft',
    name: 'Soft',
    fullName: 'ffluxxSoft',
    number: '01',
    url: 'https://soft.ffluxx.com',
    domain: 'soft.ffluxx.com',
    wave: ['#7B5CFF', '#B9A8FF'],   // primary, second
    accent: '#A38FFF',              // UI accent (--violet-lt)
    accentVar: 'var(--violet-lt)',
    fieldColor: '#7B5CFF',          // placeholder art
    blurb: 'Apps and tools for everyday problems that nobody has bothered to solve properly.',
    headerLabel: 'ffluxxSoft — apps and websites',
    // the links ffluxx.com swaps in while it hands off to this division
    handoffNav: [
      ['Our work', 'https://soft.ffluxx.com/#work'],
      ['Services', 'https://soft.ffluxx.com/services/'],
    ],
  },
  studio: {
    key: 'studio',
    name: 'Studio',
    fullName: 'ffluxxStudio',
    number: '02',
    url: 'https://studio.ffluxx.com',
    domain: 'studio.ffluxx.com',
    wave: ['#E4A93F', '#E9DC4E'],
    accent: '#E9DC4E',
    accentVar: 'var(--sulfur)',
    fieldColor: '#E9DC4E',
    blurb: 'Video games — systems you can turn over in your hands and worlds worth staying in.',
    headerLabel: 'ffluxxStudio — video games',
    footerEmail: false,   // studio's footer has never listed the email address
    handoffNav: [
      ['Games', 'https://studio.ffluxx.com/#games'],
      ['Devlog', 'https://studio.ffluxx.com/#devlog'],
    ],
  },
};

/* Footer domain list, in order. */
export const footerLinks = [
  { label: 'ffluxx.com',        href: 'https://ffluxx.com' },
  { label: 'soft.ffluxx.com',   href: 'https://soft.ffluxx.com',   division: 'soft' },
  { label: 'studio.ffluxx.com', href: 'https://studio.ffluxx.com', division: 'studio' },
  { label: 'hello@ffluxx.com',  href: 'mailto:hello@ffluxx.com', email: true },
];
