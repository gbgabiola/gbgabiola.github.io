import type { MetadataRoute } from 'next';
import { site } from '@/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: new URL('/', site.url).href },
    ...site.navigation.map(({ href }) => ({ url: new URL(href, site.url).href })),
  ];
}
