import { site } from '@/config/site';
import { blogTags, posts } from '@/content/posts';
export function GET() {
  const paths = [
    '/',
    ...site.navigation.map((x) => x.href),
    '/blog/tags',
    ...Object.keys(blogTags).map((tag) => '/blog/tags/' + tag),
    ...posts.map((post) => '/blog/' + post.slug),
  ];
  return new Response(
    '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
      paths
        .map(
          (path) =>
            '<url><loc>' + new URL(path, site.url).href + '</loc></url>',
        )
        .join('') +
      '</urlset>',
    { headers: { 'Content-Type': 'application/xml' } },
  );
}
