import { expect, test } from '@playwright/test';
import { posts } from '../src/content/posts';
import { renderBlogFeed } from '../src/lib/blog-feed';

const origin = 'https://gbgabiola.vercel.app';

test('blog readers can discover a valid RSS item for every published post', async ({ page, request }) => {
  await page.goto('/blog');
  await expect(page.getByRole('link', { name: 'RSS feed', exact: true })).toHaveAttribute('href', '/feed.xml');
  await expect(page.locator('head link[rel="alternate"][type="application/rss+xml"]'))
    .toHaveAttribute('href', origin + '/feed.xml');

  const response = await request.get('/feed.xml');
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toBe('application/rss+xml; charset=utf-8');

  const feed = await page.evaluate((xml) => {
    const doc = new DOMParser().parseFromString(xml, 'application/xml');
    return {
      parseError: doc.querySelector('parsererror')?.textContent,
      version: doc.documentElement.getAttribute('version'),
      channel: doc.querySelector('channel > link')?.textContent,
      self: doc.getElementsByTagNameNS('http://www.w3.org/2005/Atom', 'link')[0]?.getAttribute('href'),
      items: Array.from(doc.querySelectorAll('channel > item'), (item) => ({
        title: item.querySelector('title')?.textContent,
        url: item.querySelector('link')?.textContent,
        guid: item.querySelector('guid')?.textContent,
        permalink: item.querySelector('guid')?.getAttribute('isPermaLink'),
        summary: item.querySelector('description')?.textContent,
        date: item.querySelector('pubDate')?.textContent,
      })),
    };
  }, await response.text());

  expect(feed.parseError).toBeUndefined();
  expect(feed.version).toBe('2.0');
  expect(feed.channel).toBe(origin + '/blog');
  expect(feed.self).toBe(origin + '/feed.xml');
  expect(feed.items).toEqual(
    [...posts].sort((a, b) => b.date.localeCompare(a.date)).map((post) => {
      const url = origin + '/blog/' + post.slug;
      return {
        title: post.title,
        url,
        guid: url,
        permalink: 'true',
        summary: post.summary,
        date: new Date(post.date + 'T00:00:00Z').toUTCString(),
      };
    }),
  );
});

test('RSS text with XML characters survives parsing', async ({ page }) => {
  const title = 'Tips & tricks <examples>';
  const summary = 'Keep quotes "as-is" & preserve <tags>';
  const xml = renderBlogFeed({
    origin,
    title,
    description: summary,
    posts: [{ slug: 'example', title, summary, date: '2026-10-10', tags: ['git'] }],
  });

  const decoded = await page.evaluate((xml) => {
    const doc = new DOMParser().parseFromString(xml, 'application/xml');
    return {
      parseError: doc.querySelector('parsererror')?.textContent,
      titles: Array.from(doc.querySelectorAll('title'), (title) => title.textContent),
      summaries: Array.from(doc.querySelectorAll('description'), (description) => description.textContent),
    };
  }, xml);

  expect(decoded.parseError).toBeUndefined();
  expect(decoded.titles).toEqual([title, title]);
  expect(decoded.summaries).toEqual([summary, summary]);
});
