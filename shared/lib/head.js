/* Builds each page's <head> tags from the `meta` in sites/<site>/pages.js,
   so the icon, social-card and font tags aren't repeated in every file. */
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

export function renderHead(site, page) {
  const m = page.meta;
  const url = site.url + page.path;
  const image = site.url + '/og.png';
  const ogTitle = m.ogTitle ?? m.title;
  const twTitle = m.twitterTitle ?? ogTitle;
  const twDesc = m.twitterDescription ?? m.ogDescription;
  const alt = m.imageAlt === undefined ? site.imageAlt : m.imageAlt;
  return [
    '<meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1">',
    `<title>${esc(m.title)}</title>`,
    `<meta name="description" content="${esc(m.description)}">`,
    `<meta name="theme-color" content="${site.themeColor ?? '#0E1220'}">`,
    '<link rel="icon" href="/favicon.svg" type="image/svg+xml">',
    '<link rel="icon" href="/favicon.ico" sizes="any">',
    '<link rel="apple-touch-icon" href="/apple-touch-icon.png">',
    '<meta property="og:type" content="website">',
    `<meta property="og:site_name" content="${esc(site.siteName)}">`,
    `<meta property="og:title" content="${esc(ogTitle)}">`,
    `<meta property="og:description" content="${esc(m.ogDescription)}">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:image" content="${image}">`,
    '<meta property="og:image:width" content="1200">',
    '<meta property="og:image:height" content="630">',
    alt && `<meta property="og:image:alt" content="${esc(alt)}">`,
    '<meta name="twitter:card" content="summary_large_image">',
    `<meta name="twitter:title" content="${esc(twTitle)}">`,
    `<meta name="twitter:description" content="${esc(twDesc)}">`,
    `<meta name="twitter:image" content="${image}">`,
    `<link rel="canonical" href="${url}">`,
    '<link rel="preconnect" href="https://fonts.googleapis.com">',
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
    '<link href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Archivo:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">',
  ].filter(Boolean).join('\n');
}
