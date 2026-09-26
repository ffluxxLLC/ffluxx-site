# ffluxx sites

ffluxx.com, soft.ffluxx.com and studio.ffluxx.com — one repo, React + Vite.
Every page is pre-rendered to plain HTML at build time; React takes over in
the browser for the animations and forms.

```
content/                  ← EVERYTHING YOU EDIT
  company.js              domains, division colours, footer links, email
  projects/               one file per project → its cards + its own page
    _template.js          copy this to add a project (ignored by the build)
    fi.js  second-home.js  plant-guide.js  hellenica.js  business-tycoon.js
  parent/home.js          ffluxx.com words: hero, statement
  soft/home.js            soft homepage: hero, cards, client work, build notes, signup
  soft/services.js        rates, process, quote form
  studio/home.js          studio homepage: hero, devlog, signup
shared/                   code used by every site
  components/project/     ProjectCard (3 layouts), ProjectPage, art, buttons
  components/             header, footer, wave mark, signup form, …
  data/projects.js        reads content/projects/ — nothing to edit
  styles/                 tokens, base, division, cards, project page
sites/<site>/             parent (ffluxx.com), soft, studio
  pages.js                list of pages + each page's <head>
  src/pages/              one component per page (Project.jsx = every project page)
  public/                 copied as-is: favicons, og.png, robots.txt, fi/
```

## Projects — the main thing you'll edit

Each project is one file in `content/projects/`. That file feeds:

- its **card** on ffluxx.com and on its division homepage — clicking anywhere
  on the card opens the project page
- its **project page**: `soft.ffluxx.com/apps/<file name>/` or
  `studio.ffluxx.com/games/<file name>/`
- the **counts** ("3 apps · one live", ffluxx.com's description)
- **Build notes** (soft) or the **Devlog** (studio), via its `updates`
- the signup form's checkboxes and the **sitemap**

**Add a project:** copy `_template.js` to `content/projects/<name>.js`, fill
it in, push. Nothing else to register.

**Post an update:** add `{ date: '2026-10-01', title: '…', body: '…' }` to the
top of that project's `updates`. It shows on the project page and in Build
notes / Devlog. (Soft's Build notes show it as "Name — body", so the body can
start lowercase; the project page capitalises it.)

**Status:** `status: 'dev'` or `'live'` drives the pill, the buttons and the
signup form. The Status line in the details box comes from it too — add
`progress: 'Core matching in progress'` for your own wording. Don't put a
Status row in `facts`; the build rejects it so the two can't disagree.

**Make something live:** `status: 'live'` and give it a `link` with an `href`.

**Add artwork:** put the image in `sites/soft/public/projects/` (or studio's)
and set `image: '/projects/<file>.png'`. It replaces the wave placeholder on
the cards and the page.

If a project file has a mistake (a typo in `division`, a bad date), the build
stops and names the file and the field.

## Everything else

| To change… | Edit |
| --- | --- |
| Homepage words, build notes, devlog (division-wide entries) | `content/<site>/home.js` |
| Rates, process, quote form options | `content/soft/services.js` |
| Project page header links, signup wording | `projectPage` / `signup` / `follow` in `content/<site>/home.js` |
| Page titles and social previews | `sites/<site>/pages.js` (project pages use the project's name and summary) |
| Forms' endpoints | `endpoint: ''` in `content/soft/home.js`, `content/studio/home.js`, `content/soft/services.js` |

`**double asterisks**` make text bold anywhere text is shown.

## Running it

```
npm install
npm run dev:soft        # or dev:parent, dev:studio — live preview while you edit
npm run build           # all three sites → dist/
```

Node 20 or newer (`.nvmrc` says 22).

## Cloudflare Pages settings

| Project (by custom domain) | Root directory | Build command | Output directory | Watch paths (include) |
| --- | --- | --- | --- | --- |
| ffluxx.com | `/` | `npm run build:parent` | `dist/parent` | `sites/parent/*`, `shared/*`, `content/*`, `package*.json` |
| soft.ffluxx.com | `/` | `npm run build:soft` | `dist/soft` | `sites/soft/*`, `shared/*`, `content/*`, `package*.json` |
| studio.ffluxx.com | `/` | `npm run build:studio` | `dist/studio` | `sites/studio/*`, `shared/*`, `content/*`, `package*.json` |

`content/*` must be in every project's watch paths — a project file change
affects ffluxx.com and its division site.

## Adding an ordinary page

1. Add an entry to `sites/<site>/pages.js` (`path`, `html`, `entry`, `meta`).
2. Copy `sites/<site>/index.html` to the new path (e.g. `about/index.html`) and point its script at `/src/entries/about.jsx`.
3. Create `src/pages/About.jsx` and `src/entries/about.jsx` (copy an existing entry, change the import).
4. Register it in `src/server.jsx`.

## Notes

- **CSS order matters.** Shared styles load before page styles, so a page rule
  beats a shared rule with the same selector. A media query overriding a page
  rule must sit in the page file, after that rule.
- `sites/soft/public/fi/` is the pre-built fi calculator, copied untouched.
  The build also writes a forwarding page at `/FI/` (the old address), only on
  Cloudflare's case-sensitive build machines.
- `sitemap.xml` is generated by the build — don't add one to `public/`.
- Keep folder and file names lowercase. A case-only rename needs two steps:
  `git mv Foo tmp && git mv tmp foo`.
- `brand/` is source artwork; it isn't deployed.
