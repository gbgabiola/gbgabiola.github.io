import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { blogTags, posts } from '../src/content/posts.ts';

const { version } = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));

const base = process.env.SMOKE_BASE_URL || 'http://127.0.0.1:3000';
const requestTimeoutMs = 15_000;

const productionOrigin = 'https://gbgabiola.vercel.app';

const routes = [
  ['/', 'Home', 'Full Stack Developer'],
  ['/about', 'About', 'Professional Experience'],
  ['/works', 'Works', 'Caffeinawa'],
  ['/contact', 'Contact', 'mailto:gbgabiola@gmail.com'],
  ['/blog', 'Blog', 'Notes on building for the web'],
  ['/blog/tags', 'Blog tags', 'Browse blog posts by topic.'],
  ...posts.map(({ slug, title }) => [`/blog/${slug}`, title, title]),
  ...Object.entries(blogTags).map(([tag, label]) => [
    `/blog/tags/${tag}`,
    `Posts tagged ${label}`,
    posts.find((post) => post.tags.includes(tag))?.title,
  ]),
];

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#x27;');
}

async function request(path, expectedStatus = 200) {
  const url = new URL(path, base);
  const signal = AbortSignal.timeout(requestTimeoutMs);

  try {
    const response = await fetch(url, { signal, redirect: 'manual' });
    assert.equal(response.status, expectedStatus, url.href);

    return { body: Buffer.from(await response.arrayBuffer()), headers: response.headers };
  } catch (error) {
    if (signal.aborted) {
      throw new Error('Smoke request timed out after ' + requestTimeoutMs + ' ms: ' + url.href, { cause: error });
    }
    throw new Error('Smoke request failed: ' + url.href, { cause: error });
  }
}

for (const [path, title, content] of routes) {
  const { body: responseBody, headers } = await request(path);
  const html = responseBody.toString('utf8');

  const policies = (headers.get('content-security-policy') ?? '').split(/[;,]/);
  assert.ok(policies.some((policy) => policy.trim() === "frame-ancestors 'none'"), path + ': framing policy');
  assert.equal(headers.get('referrer-policy'), 'strict-origin-when-cross-origin', path + ': referrer policy');
  assert.equal(headers.get('x-content-type-options'), 'nosniff', path + ': MIME sniffing policy');

  assert.ok(html.includes(`<title>${escapeHtml(title)} | G - Software Engineer</title>`), `${path}: title`);

  const canonical = html.match(/rel="canonical" href="([^"]+)"/)?.[1];
  assert.ok(canonical, `${path}: canonical URL exists`);
  assert.equal(
    new URL(canonical).href,
    new URL(path, productionOrigin).href,
    `${path}: production canonical URL`,
  );
  const socialImage = html.match(/property="og:image" content="([^"]+)"/)?.[1];
  assert.ok(socialImage, `${path}: social preview image metadata exists`);
  const socialImageUrl = new URL(socialImage);
  assert.equal(socialImageUrl.origin, productionOrigin, `${path}: social preview image origin`);
  assert.equal(socialImageUrl.pathname, '/opengraph-image', `${path}: social preview image path`);
  assert.doesNotMatch(html, /Genesis Gabiola/i, `${path}: public nickname`);
  const body = html.slice(html.indexOf('<body'));
  if (content) assert.ok(body.includes(escapeHtml(content)), `${path}: content`);
  assert.ok(html.includes(`>Portfolio v${version}</p>`), `${path}: portfolio version`);

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

const missing = await request('/this-page-does-not-exist', 404);
assert.ok(missing.body.toString('utf8').includes('Page not found'));

await request('/blog/portfolio-pages-that-fit', 404);
await request('/blog/tags/unknown-tag', 404);

const manifestResponse = await request('/manifest.webmanifest');
const manifest = JSON.parse(manifestResponse.body.toString('utf8'));
assert.equal(manifest.start_url, '/');
assert.equal(manifest.short_name, 'G');

const keybase = await request('/keybase.txt');
assert.ok(keybase.body.toString('utf8').includes('keybase'));

const googlePath = '/google88fb68dc55bbcb2f.html';
const google = await request(googlePath);
const verificationFile = readFileSync(new URL('../public' + googlePath, import.meta.url));
assert.ok(google.body.equals(verificationFile), googlePath + ': Google verification file differs from the repository');

console.log('PASS 404, manifest, Keybase, and Google ownership verification');

const sitemap = await request('/sitemap.xml');
const sitemapXml = sitemap.body.toString('utf8');
for (const [path] of routes) {
  assert.ok(sitemapXml.includes(`<loc>${new URL(path, productionOrigin).href}</loc>`));
}

const robots = await request('/robots.txt');
const robotsLines = robots.body.toString('utf8').split(/\r?\n/);
assert.ok(robotsLines.includes(`Sitemap: ${new URL('/sitemap.xml', productionOrigin).href}`));

const previewImage = await request('/opengraph-image');
assert.match(previewImage.headers.get('content-type'), /^image\/png/);
console.log('PASS sitemap, robots, and social preview image');

const feed = await request('/feed.xml');
assert.match(feed.headers.get('content-type'), /^application\/rss\+xml\b/, '/feed.xml: RSS content type');
assert.match(feed.body.toString('utf8'), /<rss\b[^>]*version="2\.0"/, '/feed.xml: RSS 2.0 document');
console.log('PASS blog RSS feed');
