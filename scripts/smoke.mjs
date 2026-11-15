import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const { version } = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));

const base = process.env.SMOKE_BASE_URL || 'http://127.0.0.1:3000';

const routes = [
  ['/', 'Home', 'Full Stack Developer'],
  ['/about', 'About', 'Professional Experience'],
  ['/works', 'Works', 'Caffeinawa'],
  ['/contact', 'Contact', 'mailto:gbgabiola@gmail.com'],
  ['/blog', 'Blog', 'Designing portfolio pages to fit the viewport'],
  ['/blog/portfolio-pages-that-fit', 'Designing portfolio pages to fit the viewport', 'Test the edges'],
];

for (const [path, title, content] of routes) {
  const response = await fetch(new URL(path, base));

  assert.equal(response.status, 200, path);

  const html = await response.text();

  assert.ok(html.includes(`<title>${title} | G - Software Engineer</title>`), `${path}: title`);

  const canonical = html.match(/rel="canonical" href="([^"]+)"/)?.[1];
  assert.ok(canonical, `${path}: canonical URL exists`);
  assert.equal(
    new URL(canonical).href,
    new URL(path, 'https://genesisgabiola.vercel.app').href,
    `${path}: production canonical URL`,
  );
  assert.ok(
    /property="og:image" content="https:\/\/genesisgabiola\.vercel\.app\/opengraph-image/.test(html),
    `${path}: social preview image metadata`,
  );
  assert.doesNotMatch(html, /Genesis Gabiola/i, `${path}: public nickname`);
  assert.ok(html.includes(content), `${path}: content`);
  assert.ok(html.includes(`>Portfolio v${version}</p>`), `${path}: portfolio version`);

  if (path === '/') {
    assert.match(html, /aria-label="G home" href="\/"/);
  } else {
    const current = path.startsWith('/blog/') ? 'location' : 'page';
    assert.ok(html.includes(`aria-current="${current}"`), `${path}: active navigation`);
  }

  if (['/', '/about', '/contact'].includes(path)) {
    assert.ok(
      html.includes('https://drive.google.com/uc?export=download&amp;id=1hTHzS47SGcKx9G50nIK1U4YjYjQBdCYf'),
      `${path}: resume download`,
    );
  }

  if (path === '/works') {
    assert.ok(html.includes('href="https://github.com/gbgabiola?tab=repositories"'), 'Works links to more repositories');
    for (const repo of ['caffeinawa', 'em-carpentry', 'fbcsi']) {
      assert.ok(html.includes(`href="https://github.com/gbgabiola/${repo}"`), `Works links to ${repo} source`);
    }
  }

  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${path}: one primary heading`);
  if (path === '/' || path === '/works') {
    for (const href of ['https://caffeinawa.pages.dev/', 'https://em-carpentry.netlify.app/', 'https://fbcsi.onrender.com/']) {
      assert.ok(html.includes(`href="${href}"`), `${path}: project link ${href}`);
    }
  }
  console.log(`PASS ${path}`);
}

const missing = await fetch(new URL('/this-page-does-not-exist', base));

assert.equal(missing.status, 404);
assert.ok((await missing.text()).includes('Page not found'));

const missingPost = await fetch(new URL('/blog/unknown-post', base));
assert.equal(missingPost.status, 404);

const manifestResponse = await fetch(new URL('/manifest.webmanifest', base));

assert.equal(manifestResponse.status, 200);

const manifest = await manifestResponse.json();

assert.equal(manifest.start_url, '/');
assert.equal(manifest.short_name, 'G');

const verification = await fetch(new URL('/keybase.txt', base));

assert.equal(verification.status, 200);
assert.ok((await verification.text()).includes('keybase'));

console.log('PASS 404, manifest, and Keybase verification');

const sitemap = await fetch(new URL('/sitemap.xml', base));
assert.equal(sitemap.status, 200);
const sitemapXml = await sitemap.text();
for (const [path] of routes) {
  assert.ok(sitemapXml.includes(`<loc>https://genesisgabiola.vercel.app${path}</loc>`));
}

const robots = await fetch(new URL('/robots.txt', base));
assert.equal(robots.status, 200);
assert.match(await robots.text(), /Sitemap: https:\/\/genesisgabiola\.vercel\.app\/sitemap\.xml/);

const previewImage = await fetch(new URL('/opengraph-image', base));
assert.equal(previewImage.status, 200);
assert.match(previewImage.headers.get('content-type'), /^image\/png/);
console.log('PASS sitemap, robots, and social preview image');
