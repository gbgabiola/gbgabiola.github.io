import { site } from '@/config/site';
import { posts } from '@/content/posts';
import { blogFeedType, renderBlogFeed } from '@/lib/blog-feed';

export const dynamic = 'force-static';

export function GET() {
  return new Response(renderBlogFeed({
    origin: site.url,
    title: site.brand + ' Blog',
    description: 'Notes on building for the web and maintaining this portfolio.',
    posts,
  }), {
    headers: { 'Content-Type': blogFeedType + '; charset=utf-8' },
  });
}
