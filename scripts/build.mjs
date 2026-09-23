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
import { siteConfig, loadPages, REPO } from './site-config.mjs';

const site = process.argv[2];
const config = await siteConfig(site);
const { pages } = await loadPages(site);
const ssrDir = path.join(REPO, '.ssr', site);

await build({ ...config, logLevel: 'warn' });
await build({
  ...config,
  logLevel: 'warn',
  publicDir: false,
  build: { ssr: path.join(config.root, 'src/server.jsx'), outDir: ssrDir, emptyOutDir: true },
});

const { render } = await import(pathToFileURL(path.join(ssrDir, 'server.js')).href);
for (const page of pages) {
  const file = path.join(config.build.outDir, page.html);
  const html = fs.readFileSync(file, 'utf8');
  if (!html.includes('<!--app-->')) throw new Error(`${page.html} is missing <!--app-->`);
  fs.writeFileSync(file, html.replace('<!--app-->', render(page.entry)));
  console.log(`  ✓ ${site}${page.path}`);
}
fs.rmSync(path.join(REPO, '.ssr'), { recursive: true, force: true });
