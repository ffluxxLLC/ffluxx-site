/* soft.ffluxx.com — every page on the site, with its <head> metadata.
   To add a page: add an entry here, a src/pages/X.jsx, a src/entries/x.jsx
   and an x/index.html (copy index.html, change the script src). */
export const site = {
  url: 'https://soft.ffluxx.com',
  siteName: 'ffluxxSoft',
  imageAlt: "The ffluxxSoft mark: two mirrored violet waves crossing to form two X's.",
};

export const pages = [
  {
    path: '/', html: 'index.html', entry: 'home',
    meta: {
      title: 'ffluxxSoft — apps for problems nobody bothered to solve',
      description: 'ffluxxSoft builds its own apps and software for other companies. Websites from $1,400, apps quoted individually. Part of ffluxx.',
      ogDescription: 'Our own apps, and software built for other companies. Websites from $1,400.',
    },
  },
  {
    path: '/services/', html: 'services/index.html', entry: 'services',
    meta: {
      title: 'Services — ffluxxSoft builds websites and apps for other people',
      description: 'Websites from $1,400 and apps built to order. Clear rates, a fixed quote before work starts, and you own everything at the end.',
      ogDescription: 'Websites from $1,400. Clear rates, a fixed quote before work starts, and you own everything at the end.',
      twitterTitle: 'Services — ffluxxSoft',
      twitterDescription: 'Websites from $1,400. Clear rates, and you own everything at the end.',
      imageAlt: null,
    },
  },
];
