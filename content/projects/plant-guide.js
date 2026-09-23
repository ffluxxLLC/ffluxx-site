export default {
  name: 'Plant Guide',
  division: 'soft',
  status: 'dev',
  order: 3,

  summary: 'Step-by-step care for everything in your garden, tuned to where you actually live. Your soil, your light, your climate — not generic advice for a plant in the abstract.',
  tag: 'iOS first',

  about: [],

  features: [
    'Care steps adjusted to your location and season',
    'Track each plant individually, not by species',
    'Know what to do this week, not a wall of general tips',
    'Works for a windowsill or a full plot',
  ],

  facts: [
    ['Platform', 'iOS, with Android to follow'],
    ['Status', 'Care model in progress'],
    ['Availability', 'No date yet'],
  ],

  seed: 2,

  updates: [
    { date: '2026-08-11', body: 'care steps now shift with local season instead of a fixed calendar. Same plant, different week, different advice.' },
  ],
};
