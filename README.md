# ffluxx sites

ffluxx.com, soft.ffluxx.com and studio.ffluxx.com — one repo, built with
React + Vite. Every page is pre-rendered to plain HTML at build time, then
React takes over in the browser for the animations and forms.

```
shared/                 used by every site
  data/company.js       domains, division colours, footer links, email
  data/projects.js      every product — feeds ffluxx.com AND its division site
  components/           header, footer, wave mark, signup form, …
  lib/                  wave maths, motion engine, helpers
  styles/               tokens, base, division CSS
sites/<site>/           parent (ffluxx.com), soft, studio
  pages.js              list of pages + each page's <head> (title, description, …)
  src/content/*.js      that site's words: hero, devlog, build notes, rates, …
  src/pages/            one component per page
  src/components/       pieces only that site uses
  public/               copied as-is: favicons, og.png, robots.txt, sitemap.xml, FI/
```

## Editing content — you shouldn't need to touch JSX

| To change… | Edit |
| --- | --- |
| A project's name, description, status, features, facts | `shared/data/projects.js` (updates ffluxx.com **and** the division page) |
| Add a project | add an entry to `shared/data/projects.js` — the cards, counts ("5 projects · one live") and signup checkboxes follow |
| Mark something live | set `status: 'live'` and give it a `link` |
| Build notes | `sites/soft/src/content/home.js` → `buildNotes` |
| Devlog | `sites/studio/src/content/home.js` → `devlog` |
| Client work | `sites/soft/src/content/home.js` → `clients` (the "Nothing here yet" panel disappears once there's one) |
| Rates, process, quote form options | `sites/soft/src/content/services.js` |
| Page titles and social previews | `sites/<site>/pages.js` |
| Signup / quote form endpoints | `endpoint: ''` in the content file for that page |

`**double asterisks**` in content files make text bold. Hero sentences that
mention counts in words ("Two divisions, five projects…") are plain copy —
update those by hand when the numbers change.

## Running it

```
npm install
npm run dev:soft        # or dev:parent, dev:studio — live preview while you edit
npm run build:soft      # writes dist/soft/
npm run build           # all three
```

Node 20 or newer (`.nvmrc` says 22).

## Cloudflare Pages settings

All three projects now build from the repo root. For each project, in
**Settings → Builds & deployments**:

| Project | Root directory | Build command | Output directory | Watch paths (include) |
| --- | --- | --- | --- | --- |
| ffluxx.com | `/` | `npm run build:parent` | `dist/parent` | `sites/parent/*`, `shared/*`, `package*.json` |
| ffluxx-soft | `/` | `npm run build:soft` | `dist/soft` | `sites/soft/*`, `shared/*`, `package*.json` |
| ffluxx-studio | `/` | `npm run build:studio` | `dist/studio` | `sites/studio/*`, `shared/*`, `package*.json` |

Also add the environment variable `NODE_VERSION` = `22` to each project.

Changing these settings does not redeploy anything by itself. Change them,
then push the migration branch: Cloudflare builds a preview for each project
to check before merging to main.

## Adding a page

1. Add an entry to `sites/<site>/pages.js` (`path`, `html`, `entry`, `meta`).
2. Copy `sites/<site>/index.html` to the new path (e.g. `about/index.html`) and point its script at `/src/entries/about.jsx`.
3. Create `src/pages/About.jsx` and `src/entries/about.jsx` (copy an existing entry, change the import).
4. Register it in `src/server.jsx`.

## Notes

- **CSS order matters.** Shared styles load before page styles, so a page rule
  beats a shared rule with the same selector. A media query overriding a page
  rule must sit in the page file, after that rule.
- `sites/soft/public/FI/` is the pre-built fi calculator, copied untouched.
- `brand/` is source artwork; it isn't deployed.
