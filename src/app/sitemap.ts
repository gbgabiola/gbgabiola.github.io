import type { MetadataRoute } from 'next';
import { site } from '@/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return site.navigation.map(({ href }) => ({ url: new URL(href, site.url).href }));
}
