import type { StaticImageData } from 'next/image';
import caffeinawa from '@/assets/images/caffeinawa.png';
import omnifood from '@/assets/images/omnifood.png';
import uniflix from '@/assets/images/uniflix.png';

export type Project = {
  name: string;
  image: StaticImageData;
  summary: string;
  source: `https://${string}`;
  href: `https://${string}`;
};

export const projects = [
  {
    name: 'Caffeinawa',
    image: caffeinawa,
    href: 'https://caffeinawa.pages.dev',
    summary: 'A coffee-themed website built around the Caffeinawa brand.',
    source: 'https://github.com/gbgabiola/caffeinawa',
  },
  {
    name: 'Omnifood',
    image: omnifood,
    href: 'https://gbgabiola.github.io/omnifood',
    summary: 'A landing page for a fictional premium meal delivery service.',
    source: 'https://github.com/gbgabiola/omnifood',
  },
  {
    name: 'UniFlix',
    image: uniflix,
    href: 'https://gbgabiola.github.io/uniflix',
    summary: 'A responsive landing page for a fictional digital entertainment service.',
    source: 'https://github.com/gbgabiola/uniflix',
  },
] satisfies Project[];
