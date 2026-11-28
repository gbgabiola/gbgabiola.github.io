import { name, version } from '../../package.json';
import { profile } from '@/content/profile';

export const site = {
  brand: name,
  establishedYear: 2018,
  version,
  url: 'https://gbgabiola.vercel.app',
  title: `${profile.nickname} - ${profile.role}`,
  description: `Portfolio of ${profile.nickname}, a software engineer and full stack developer working across web interfaces and backend APIs.`,
  navigation: [
    { href: '/about', label: 'About' },
    { href: '/works', label: 'Works' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ],
};
