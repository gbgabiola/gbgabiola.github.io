import assert from 'node:assert/strict';

const base = process.env.SMOKE_BASE_URL || 'http://127.0.0.1:3000';

const routes = [
  ['/', 'Home', 'I am Genesis, a Software Engineer.'],
  ['/about', 'About', 'Professional Experience'],
  ['/works', 'Works', 'Caffeinawa'],
  ['/contact', 'Contact', 'mailto:gbgabiola@gmail.com'],
];

for (const [path, title, content] of routes) {
  const response = await fetch(new URL(path, base));

  assert.equal(response.status, 200, path);

  const html = await response.text();

  assert.ok(html.includes(`<title>${title} | Genesis Gabiola - Software Engineer</title>`), `${path}: title`);

  assert.ok(html.includes(content), `${path}: content`);

  assert.ok(html.includes('aria-current="page"'), `${path}: active navigation`);

  console.log(`PASS ${path}`);
}

const missing = await fetch(new URL('/this-page-does-not-exist', base));

assert.equal(missing.status, 404);
assert.ok((await missing.text()).includes('Page not found'));

const manifestResponse = await fetch(new URL('/manifest.webmanifest', base));

assert.equal(manifestResponse.status, 200);

const manifest = await manifestResponse.json();

assert.equal(manifest.start_url, '/');

const verification = await fetch(new URL('/keybase.txt', base));

assert.equal(verification.status, 200);
assert.ok((await verification.text()).includes('keybase'));

console.log('PASS 404, manifest, and Keybase verification');
