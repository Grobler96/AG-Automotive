// Post-build step for static hosting (GitHub Pages). Runs after `vite build` and `vite build --ssr`.
//  1. Renders every route to real HTML (the page text, headings, links and FAQ), so search engines and slow
//     connections get the content straight away; the browser then hydrates it.
//  2. Gives each route its own title, description, canonical URL, social tags and structured data.
//  3. Writes sitemap.xml and robots.txt, and keeps 404.html for unknown addresses.
// Routes come from src/App.tsx; titles and descriptions from src/data/seo.json (also used by the in-app useSEO hook).
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const SITE_URL = (process.env.SITE_URL || 'https://grobler96.github.io/AG-Automotive').replace(/\/+$/, '');
const seo = JSON.parse(readFileSync('src/data/seo.json', 'utf8'));
const app = readFileSync('src/App.tsx', 'utf8');
const routes = [...app.matchAll(/path="\/([a-z0-9-]+)"/g)].map((m) => `/${m[1]}`);
if (routes.length === 0) throw new Error('No routes found in src/App.tsx');

const { render, businessSchema } = await import(pathToFileURL('dist-ssr/entry-server.js').href);
const template = readFileSync('dist/index.html', 'utf8');
if (!template.includes('<div id="root"></div>')) throw new Error('dist/index.html is missing the empty root element');
if (!template.includes('<!--business-schema-->')) throw new Error('index.html is missing the business-schema marker');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
// GitHub Pages serves every page from a folder, so the real address ends in a slash
const pageUrl = (path) => `${SITE_URL}${path === '/' ? '/' : `${path}/`}`;

/** Structured data that belongs to one page: breadcrumbs, and the service for a town page. */
function jsonLd(path, meta) {
  const blocks = [];
  if (path !== '/' && meta.crumb) {
    blocks.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: meta.crumb, item: pageUrl(path) },
      ],
    });
  }
  if (meta.service) {
    blocks.push({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: meta.service,
      serviceType: meta.service,
      url: pageUrl(path),
      provider: { '@id': `${SITE_URL}/#business` },
      areaServed: { '@type': 'AdministrativeArea', name: 'West Yorkshire' },
    });
  }
  if (meta.city) {
    blocks.push({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: `Mobile mechanic in ${meta.city}`,
      serviceType: 'Mobile mechanic and wet belt changes',
      url: pageUrl(path),
      provider: { '@id': `${SITE_URL}/#business` },
      areaServed: { '@type': 'City', name: meta.city },
    });
  }
  return blocks.map((b) => `<script type="application/ld+json">${JSON.stringify(b)}</script>`).join('\n    ');
}

function page(path, meta, route) {
  const url = pageUrl(path);
  let html = template;
  const swap = (re, to) => {
    if (!re.test(html)) throw new Error(`index.html is missing a tag matching ${re}`);
    html = html.replace(re, () => to);
  };
  swap(/<title>[^<]*<\/title>/, `<title>${esc(meta.title)}</title>`);
  swap(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${esc(meta.description)}" />`);
  swap(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${url}" />`);
  swap(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${url}" />`);
  swap(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${esc(meta.title)}" />`);
  swap(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${esc(meta.description)}" />`);
  if (meta.noindex) html = html.replace('<meta charset="UTF-8" />', '<meta charset="UTF-8" />\n    <meta name="robots" content="noindex" />');
  // the business data comes from src/config/site.ts, so the hours, phone and services in Google always match the page
  html = html.replace('<!--business-schema-->', () => `<script type="application/ld+json">${JSON.stringify(businessSchema(SITE_URL))}</script>`);
  const extra = jsonLd(path, meta);
  if (extra) html = html.replace('</head>', () => `    ${extra}\n  </head>`);
  html = html.replace('<div id="root"></div>', () => `<div id="root">${render(route)}</div>`);
  return html.replaceAll('__SITE_URL__', SITE_URL);
}

writeFileSync('dist/index.html', page('/', seo['/'], '/'));
for (const route of routes) {
  const meta = seo[route];
  if (!meta) throw new Error(`Add "${route}" to src/data/seo.json`);
  mkdirSync(`dist${route}`, { recursive: true });
  writeFileSync(`dist${route}/index.html`, page(route, meta, route));
}
writeFileSync('dist/404.html', page('/404', seo['404'], '/page-not-found'));
rmSync('dist-ssr', { recursive: true, force: true });

const indexable = ['/', ...routes.filter((r) => !seo[r].noindex)];
const today = new Date().toISOString().slice(0, 10);
writeFileSync(
  'dist/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexable
    .map((r) => `  <url><loc>${pageUrl(r)}</loc><lastmod>${today}</lastmod></url>`)
    .join('\n')}\n</urlset>\n`,
);
writeFileSync('dist/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);

console.log(`Prerendered ${routes.length + 1} pages + 404, sitemap.xml (${indexable.length} URLs) and robots.txt for ${SITE_URL}`);
