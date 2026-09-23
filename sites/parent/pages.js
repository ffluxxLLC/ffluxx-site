/* ffluxx.com — every page on the site, with its <head> metadata.
   To add a page: add an entry here, a src/pages/X.jsx, a src/entries/x.jsx
   and an x/index.html (copy index.html, change the script src). */
export const site = {
  url: 'https://ffluxx.com',
  siteName: 'ffluxx',
  imageAlt: "The ffluxx mark: two mirrored waves crossing to form two X's.",
};

export const pages = [
  {
    path: '/', html: 'index.html', entry: 'home',
    meta: {
      title: 'ffluxx — everything we make, in one place',
      description: 'ffluxx builds software and video games. Two divisions — ffluxxSoft and ffluxxStudio — four projects in development, all in one place.',
      ogDescription: 'Software and video games. Two divisions, four projects in development.',
    },
  },
];
