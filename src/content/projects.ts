import type { StaticImageData } from 'next/image';
import caffeinawa from '@/assets/images/caffeinawa.png';
import omnifood from '@/assets/images/omnifood.png';
import uniflix from '@/assets/images/uniflix.png';

export type Project = {
  name: string;
  image: StaticImageData;
  href: `https://${string}`;
};

export const projects = [
  {
    name: 'Caffeinawa',
    image: caffeinawa,
    href: 'https://caffeinawa.pages.dev',
  },
  {
    name: 'Omnifood',
    image: omnifood,
    href: 'https://gbgabiola.github.io/omnifood',
  },
  {
    name: 'UniFlix',
    image: uniflix,
    href: 'https://gbgabiola.github.io/uniflix',
  },
] satisfies Project[];
