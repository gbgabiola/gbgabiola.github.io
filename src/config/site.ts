import { profile } from '@/content/profile';

export const site = {
  title: `${profile.name} - ${profile.role}`,
  description: `${profile.name} is a Software Engineer specializing in Full Stack Development, building thoughtful interfaces and reliable web applications.`,
  navigation: [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/works', label: 'Works' },
    { href: '/contact', label: 'Contact' },
  ],
};
