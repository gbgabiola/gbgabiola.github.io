import { version } from '../../package.json';
import { profile } from '@/content/profile';

export const site = {
  version,
  title: `${profile.nickname} - ${profile.role}`,
  description: `Portfolio of ${profile.nickname}, a software engineer and full stack developer working across web interfaces and backend APIs.`,
  navigation: [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/works', label: 'Works' },
    { href: '/contact', label: 'Contact' },
  ],
};
