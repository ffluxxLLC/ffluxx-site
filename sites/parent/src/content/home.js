/* ============================================================
   ffluxx.com — homepage content.
   The project list comes from shared/data/projects.js, and the
   division cards from shared/data/company.js.
   **double asterisks** make text bold.
   ============================================================ */

export const nav = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#flux', hideSm: true },
];

export const hero = {
  eyebrow: 'ffluxx — portfolio',
  title: 'Everything we make, ',
  titleEm: 'in one place.',
  body: 'ffluxx builds software and video games. **Two divisions, five projects, one of them you can use right now.** This is where you can watch the rest take shape.',
};

export const work = {
  title: 'The work',
  // placeholder art label per division
  artLabel: { soft: 'Cover art pending', studio: 'Key art pending' },
};

export const statement = {
  eyebrow: 'The name',
  title: 'Flux',
  body: "Nothing worth making sits still. Software and games pull in different directions — different tools, different audiences, different rhythms — and ffluxx exists to hold both without pretending they're the same thing.",
  sub: "The mark is two waves, mirrored. They run apart, cross, run apart again, and cross once more: two lines, two X's, one word. Range, not restlessness.",
};
