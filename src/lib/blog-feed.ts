import type { Post } from '@/content/posts';

export const blogFeedPath = '/feed.xml';
export const blogFeedType = 'application/rss+xml';

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

type FeedOptions = {
  origin: string;
  title: string;
  description: string;
  posts: readonly Post[];
};

export function renderBlogFeed({ origin, title, description, posts }: FeedOptions): string {
  const blogUrl = escapeXml(new URL('/blog', origin).href);
  const feedUrl = escapeXml(new URL(blogFeedPath, origin).href);
  const items = [...posts].sort((a, b) => b.date.localeCompare(a.date)).map((post) => {
    const postUrl = escapeXml(new URL('/blog/' + post.slug, origin).href);
    const date = new Date(post.date + 'T00:00:00Z').toUTCString();

    return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description>${escapeXml(post.summary)}</description>
      <pubDate>${date}</pubDate>
    </item>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(title)}</title>
    <link>${blogUrl}</link>
    <description>${escapeXml(description)}</description>
    <atom:link href="${feedUrl}" rel="self" type="${blogFeedType}" />
${items.join('\n')}
  </channel>
</rss>
`;
}
