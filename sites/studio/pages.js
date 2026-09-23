/* studio.ffluxx.com — every page on the site, with its <head> metadata.
   To add a page: add an entry here, a src/pages/X.jsx, a src/entries/x.jsx
   and an x/index.html (copy index.html, change the script src). */
export const site = {
  url: 'https://studio.ffluxx.com',
  siteName: 'ffluxxStudio',
  imageAlt: "The ffluxxStudio mark: two mirrored sulfur waves crossing to form two X's.",
};

export const pages = [
  {
    path: '/', html: 'index.html', entry: 'home',
    meta: {
      title: 'ffluxxStudio — video games, worlds worth staying in',
      description: 'ffluxxStudio builds video games. Hellenica and Business Tycoon, both in development. Part of ffluxx.',
      ogDescription: 'Two games in development: Hellenica and Business Tycoon. Part of ffluxx.',
    },
  },
];
