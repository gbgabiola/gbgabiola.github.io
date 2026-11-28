import type { ImageMetadata } from 'astro';
import caffeinawa from '@/assets/images/caffeinawa.jpg';
import emCarpentry from '@/assets/images/em-carpentry.jpg';
import fbcsi from '@/assets/images/fbcsi.jpg';

export type Project = {
  name: string;
  image: ImageMetadata;
  summary: string;
  href: `https://${string}`;
  source: `https://${string}`;
};

export const projects = [
  {
    name: 'Caffeinawa',
    image: caffeinawa,
    summary: 'A coffee shop website with a digital menu and customer accounts.',
    href: 'https://caffeinawa.pages.dev/',
    source: 'https://github.com/gbgabiola/caffeinawa',
  },
  {
    name: 'EM Carpentry',
    image: emCarpentry,
    summary: 'A carpentry and home maintenance site with services, past projects, and an enquiry form.',
    href: 'https://em-carpentry.netlify.app/',
    source: 'https://github.com/gbgabiola/em-carpentry',
  },
  {
    name: 'FBCSI',
    image: fbcsi,
    summary: 'A website for Fundamental Baptist Church in San Isidro with service times, directions, and a Bible guide.',
    href: 'https://fbcsi.onrender.com/',
    source: 'https://github.com/gbgabiola/fbcsi',
  },
] satisfies Project[];
