import type { Metadata } from 'next';
import { site } from '@/config/site';

const socialImage = '/opengraph-image';

export function pageMetadata(
  path: `/${string}`,
  title: string,
  description = site.description,
): Metadata {
  const fullTitle = `${title} | ${site.title}`;
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      type: 'website',
      images: [socialImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [socialImage],
    },
  };
}
