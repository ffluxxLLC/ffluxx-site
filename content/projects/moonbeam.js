/* ============================================================
   PROJECT TEMPLATE — copy this file to add a project.

   1. Copy it to content/projects/<name>.js, e.g. moonbeam.js.
      The file name becomes the web address:
        soft   → soft.ffluxx.com/apps/moonbeam/
        studio → studio.ffluxx.com/games/moonbeam/
      Use lowercase letters, numbers and dashes only.
   2. Fill in the fields below and push. That's all: the card appears on
      ffluxx.com and on the division homepage, the project page is built,
      and counts like "3 apps · one live" update themselves.

   Files starting with _ (like this one) are ignored.
   **double asterisks** make text bold anywhere text is shown.
   ============================================================ */

export default {
  name: 'Moonbeam Website',
  division: 'soft',            // 'soft' or 'studio'
  status: 'dev',               // 'dev' → "In development", 'live' → "Available now"
  order: 1,                   // position in every list, lowest first

  // one or two sentences — shown on every card and at the top of the page
  summary: 'Moon-beam.us is the company homepage of Moonbeam.',

  // the small pill beside the status: platform for apps, genre for games
  tag: 'Website',

  // ---- project page -------------------------------------------------
  // longer description, one string per paragraph.
  // (studio cards also show the first paragraph under the summary)
  about: [
    'Moonbeam is an entertainment promotion company. This website is the company homepage, built with ffluxxSoft tools and design. It is a single-page site with a simple layout, and it is designed to be responsive and accessible on all devices.',
  ],

  // "What it does" — short lines, shown as a checklist
  features: [
    'Shows company information and services.',
    'Has a fun interactive scrolling element designed to engage visitors, and keep them on the page longer.',
  ],

  // the fact sheet: [label, value] pairs
  facts: [
    ['Platform', 'Web'],
    ['Status', 'Live'],
    ['Availability', 'In early access'],
  ],

  // main button. Leave out href while there's nothing to link to and it
  // shows as a greyed-out "not up yet" button. Leave out `link` entirely
  // for no button. Projects that aren't live also get a "notify me" button.
  link: { label: 'Visit Moonbeam.us', href: 'https://moon-beam.us' },

  // artwork: put the file in sites/<soft|studio>/public/projects/ and write
  // its path here, e.g. '/projects/project-name.png'. Leave out for the
  // placeholder wave art (`seed` picks its shape — any number).
  // image: '/projects/project-name.png',
  seed: 1,

  // updates, newest first. They also appear in the division's Build notes
  // (soft) or Devlog (studio). date is YYYY-MM-DD; title is optional.
  updates: [
    // { date: '2026-10-01', title: 'A short headline', body: 'What changed.' },
  ],
};