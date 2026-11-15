import type { MetadataRoute } from 'next';
import { site } from '@/config/site';
import { posts } from '@/content/posts';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...site.navigation.map(({ href }) => ({ url: new URL(href, site.url).href })),
    ...posts.map(({ slug }) => ({ url: new URL(`/blog/${slug}`, site.url).href })),
  ];
}
