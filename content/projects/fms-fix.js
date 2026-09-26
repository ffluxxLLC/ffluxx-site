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
  name: 'Falcon Mobile Services Website',
  division: 'soft',            // 'soft' or 'studio'
  status: 'live',               // 'dev' → "In development", 'live' → "Available now"
  // optional: where it's at, in your words. Shown as the Status line in the
  // details box instead of plain "In development" / "Live".
  progress: 'Working on setting up quote form email services',
  order: 2,                   // position in every list, lowest first

  // one or two sentences — shown on every card and at the top of the page
  summary: 'The company homepage for Falcon Mobile Services.',

  // the small pill beside the status: platform for apps, genre for games
  tag: 'Website',

  // ---- project page -------------------------------------------------
  // longer description, one string per paragraph.
  // (studio cards also show the first paragraph under the summary)
  about: [
    'Falcon Mobile Services is a company that provides mobile heavy equipment repair services along with other related services. This website is the company homepage, built with ffluxxSoft tools and design. It is a single-page site with a simple layout, and it is designed to be responsive and accessible on all devices',
  ],

  // "What it does" — short lines, shown as a checklist
  features: [
    'Shows company information and services.',
    'Has a contact form for inquiries.',
  ],

  // the details box: [label, value] pairs. Don't add a Status row — it's
  // filled in automatically from `status` and `progress` above.
  facts: [
    ['Platform', 'Website'],
    ['Availability', 'Available now'],
  ],

  // main button. Leave out href while there's nothing to link to and it
  // shows as a greyed-out "not up yet" button. Leave out `link` entirely
  // for no button. Projects that aren't live also get a "notify me" button.
  link: { label: 'Visit fms-fix.com here' , href: 'https://fms-fix.com'  },

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
