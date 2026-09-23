/* ffluxx.com — every page on the site, with its <head> metadata.
   To add a page: add an entry here, a src/pages/X.jsx, a src/entries/x.jsx
   and an x/index.html (copy index.html, change the script src). */
import { word } from '../../shared/lib/copy.js';

export const site = {
  url: 'https://ffluxx.com',
  siteName: 'ffluxx',
  imageAlt: "The ffluxx mark: two mirrored waves crossing to form two X's.",
};

export const pages = [
  {
    path: '/', html: 'index.html', entry: 'home',
    // a function, so the counts follow content/projects/
    meta: ({ projects }) => {
      const n = word(projects.length);
      const live = projects.filter((p) => p.status === 'live').length;
      const status = live ? `${word(live)} of them live` : 'all in development';
      return {
      title: 'ffluxx — everything we make, in one place',
      description: `ffluxx builds software and video games. Two divisions — ffluxxSoft and ffluxxStudio — ${n} projects, ${status}, all in one place.`,
      ogDescription: `Software and video games. Two divisions, ${n} projects, ${status}.`,
      };
    },
  },
];
