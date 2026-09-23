/* One Vite config, parameterised by site: 'parent' | 'soft' | 'studio'. */
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import react from '@vitejs/plugin-react';
import { renderHead } from '../shared/lib/head.js';

export const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const SITES = ['parent', 'soft', 'studio'];

export async function loadPages(site) {
  return import(pathToFileURL(path.join(REPO, 'sites', site, 'pages.js')).href);
}

/* fills <!--head--> in each page's index.html from pages.js */
function headPlugin(siteInfo, pages) {
  return {
    name: 'ffluxx-head',
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        const page = pages.find((p) => '/' + p.html === ctx.path);
        if (!page) throw new Error(`No entry in pages.js for ${ctx.path}`);
        return html
          .replace(/<!-- tags come from.*?-->\n?/, '')
          .replace('<!--head-->', renderHead(siteInfo, page));
      },
    },
  };
}

export async function siteConfig(site) {
  if (!SITES.includes(site)) throw new Error(`Unknown site "${site}". Use one of: ${SITES.join(', ')}`);
  const { site: siteInfo, pages } = await loadPages(site);
  const root = path.join(REPO, 'sites', site);
  return {
    configFile: false,
    root,
    appType: 'mpa',
    publicDir: path.join(root, 'public'),
    plugins: [react(), headPlugin(siteInfo, pages)],
    resolve: { alias: { '@shared': path.join(REPO, 'shared') } },
    server: { fs: { allow: [REPO] } },
    build: {
      outDir: path.join(REPO, 'dist', site),
      emptyOutDir: true,
      rollupOptions: {
        input: pages.map((p) => path.join(root, p.html)),
        output: {
          // React in one cacheable file, code shared between pages in another
          manualChunks: (id) => id.includes('node_modules') ? 'react'
                              : id.includes(`${path.sep}shared${path.sep}`) || id.endsWith('theme.css') ? 'shared' : undefined,
        },
      },
    },
  };
}
