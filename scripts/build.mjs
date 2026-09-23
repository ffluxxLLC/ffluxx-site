/* npm run build:<site>
   1. Vite builds the browser bundle and one HTML file per page.
   2. Vite builds the same pages for Node.
   3. Each page is rendered to HTML and written into its file, so the
      shipped pages are complete before any JavaScript runs — search
      engines, link previews and first paint see the real content. */
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'vite';
import { siteConfig, loadPages, loadProjects, projectMeta, resolveMeta, REPO } from './site-config.mjs';
import { renderHead } from '../shared/lib/head.js';
import { divisions } from '../content/company.js';

const site = process.argv[2];
const config = await siteConfig(site);
const { site: siteInfo, pages, redirects = [], sitemapExtra = [] } = await loadPages(site);
const projects = await loadProjects();   // also checks every project file — fails early with the file name
const ssrDir = path.join(REPO, '.ssr', site);

await build({ ...config, logLevel: 'warn' });
await build({
  ...config,
  logLevel: 'warn',
  publicDir: false,
  build: { ssr: path.join(config.root, 'src/server.jsx'), outDir: ssrDir, emptyOutDir: true },
});

const { render } = await import(pathToFileURL(path.join(ssrDir, 'server.js')).href);
const outDir = config.build.outDir;
for (const page of pages) {
  const file = path.join(outDir, page.html);
  const html = fs.readFileSync(file, 'utf8');
  if (!html.includes('<!--app-->')) throw new Error(`${page.html} is missing <!--app-->`);
  fs.writeFileSync(file, html.replace('<!--app-->', render(page.entry)));
  console.log(`  ✓ ${site}${page.path}`);
}

/* One page per project in this division, all from the same template. */
const built = [];
if (divisions[site]) {
  const templateFile = path.join(outDir, 'project.html');
  const template = fs.readFileSync(templateFile, 'utf8');
  for (const p of projects.filter((x) => x.division === site)) {
    const page = projectMeta(p);
    const file = path.join(outDir, page.path, 'index.html');
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, template
      .replace('<!--head-->', renderHead(siteInfo, page))
      .replace('<!--app-->', render('project', p.id)));
    built.push(page.path);
    console.log(`  ✓ ${site}${page.path}`);
  }
  fs.rmSync(templateFile);
}

/* sitemap.xml: every page, every project page, plus sitemapExtra from pages.js */
const urls = [...pages.map((p) => p.path), ...built, ...sitemapExtra];
fs.writeFileSync(path.join(outDir, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${siteInfo.url}${u}</loc><changefreq>monthly</changefreq></url>`).join('\n')}
</urlset>
`);

/* Forwarding pages for old addresses (see `redirects` in pages.js).
   Pages are used instead of a _redirects rule so a case-only change like
   /FI/ → /fi/ can never loop, whatever Cloudflare's matching rules are. */
for (const r of redirects) {
  const file = path.join(config.build.outDir, r.from, 'index.html');
  // On a case-insensitive disk (a Mac or Windows laptop) /FI/ and /fi/ are the
  // same folder — writing here would overwrite the real page. Cloudflare builds
  // on Linux, where they're different, so the forwarder is only needed there.
  if (fs.existsSync(file)) { console.log(`  – ${site}${r.from} skipped (same folder as another page on this disk)`); continue; }
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Moved</title>
<meta name="robots" content="noindex">
<link rel="canonical" href="${r.to}">
<meta http-equiv="refresh" content="0; url=${r.to}">
<script>location.replace(${JSON.stringify(r.to)} + location.search + location.hash);</script>
</head>
<body><p>This page has moved to <a href="${r.to}">${r.to}</a>.</p></body>
</html>
`);
  console.log(`  ↪ ${site}${r.from} → ${r.to}`);
}
fs.rmSync(path.join(REPO, '.ssr'), { recursive: true, force: true });
