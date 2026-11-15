import type { Metadata } from 'next';
import { site } from '@/config/site';

export function pageMetadata(
  title: string,
  description = site.description,
): Metadata {
  const fullTitle = `${title} | ${site.title}`;
  return {
    title: { absolute: fullTitle },
    description,
    openGraph: { title: fullTitle, description, type: 'website' },
    twitter: { card: 'summary', title: fullTitle, description },
  };
}
