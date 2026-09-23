/* One Vite config, parameterised by site: 'parent' | 'soft' | 'studio'. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import react from '@vitejs/plugin-react';
import { renderHead } from '../shared/lib/head.js';
import { buildProjects, projectPath } from '../shared/lib/projects-core.js';
import { divisions } from '../content/company.js';

export const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const SITES = ['parent', 'soft', 'studio'];
const PROJECTS_DIR = path.join(REPO, 'content', 'projects');

export async function loadPages(site) {
  return import(pathToFileURL(path.join(REPO, 'sites', site, 'pages.js')).href);
}

/* Reads content/projects/*.js from disk (the site bundle does the same
   with import.meta.glob). `fresh` re-reads edited files in dev. */
export async function loadProjects({ fresh = false } = {}) {
  const files = fs.readdirSync(PROJECTS_DIR).filter((f) => f.endsWith('.js') && !f.startsWith('_'));
  const entries = await Promise.all(files.map(async (f) => {
    const url = pathToFileURL(path.join(PROJECTS_DIR, f)).href + (fresh ? `?t=${Date.now()}` : '');
    return [f.replace(/\.js$/, ''), (await import(url)).default];
  }));
  return buildProjects(entries);
}

const plain = (s) => s.replace(/\*\*/g, '');

/* Head metadata for one project's page. */
export function projectMeta(p) {
  const d = divisions[p.division];
  return {
    path: projectPath(p),
    meta: {
      title: `${p.name} — ${d.fullName}`,
      description: plain(p.summary),
      ogDescription: plain(p.summary),
    },
  };
}

/* pages.js `meta` may be a plain object or a function of the project list */
export const resolveMeta = (page, projects) =>
  ({ ...page, meta: typeof page.meta === 'function' ? page.meta({ projects }) : page.meta });

/* fills <!--head--> in each page's html from pages.js / the project files */
function headPlugin(site, siteInfo, pages) {
  return {
    name: 'ffluxx-head',
    transformIndexHtml: {
      order: 'pre',
      async handler(html, ctx) {
        html = html.replace(/<!-- (tags come from|one template for).*?-->\n?/, '');
        if (ctx.path === '/project.html') {
          if (!ctx.server) return html;              // build: filled per project afterwards
          const id = (ctx.originalUrl || '').split('?')[0].split('/').filter(Boolean).pop();
          const p = (await loadProjects({ fresh: true })).find((x) => x.id === id);
          return p ? html.replace('<!--head-->', renderHead(siteInfo, projectMeta(p))) : html;
        }
        const page = pages.find((p) => '/' + p.html === ctx.path);
        if (!page) throw new Error(`No entry in pages.js for ${ctx.path}`);
        const projects = await loadProjects({ fresh: !!ctx.server });
        return html.replace('<!--head-->', renderHead(siteInfo, resolveMeta(page, projects)));
      },
    },
    // dev server: /apps/<id>/ and /games/<id>/ are served by the one project template
    configureServer(server) {
      const d = divisions[site];
      if (!d) return;
      const re = new RegExp(`^/${d.projectPath}/[a-z0-9-]+/?(\\?.*)?$`);
      server.middlewares.use((req, _res, next) => {
        if (re.test(req.url)) req.url = '/project.html';
        next();
      });
    },
  };
}

export async function siteConfig(site) {
  if (!SITES.includes(site)) throw new Error(`Unknown site "${site}". Use one of: ${SITES.join(', ')}`);
  const { site: siteInfo, pages } = await loadPages(site);
  const root = path.join(REPO, 'sites', site);
  const inputs = pages.map((p) => path.join(root, p.html));
  if (divisions[site]) inputs.push(path.join(root, 'project.html'));
  return {
    configFile: false,
    root,
    appType: 'mpa',
    publicDir: path.join(root, 'public'),
    plugins: [react(), headPlugin(site, siteInfo, pages)],
    resolve: { alias: { '@shared': path.join(REPO, 'shared'), '@content': path.join(REPO, 'content') } },
    server: { fs: { allow: [REPO] } },
    build: {
      outDir: path.join(REPO, 'dist', site),
      emptyOutDir: true,
      rollupOptions: {
        input: inputs,
        output: {
          // React in one cacheable file, code shared between pages in another
          manualChunks: (id) => id.includes('node_modules') ? 'react'
                              : id.includes(`${path.sep}shared${path.sep}`) || id.endsWith('theme.css') ? 'shared' : undefined,
        },
      },
    },
  };
}
