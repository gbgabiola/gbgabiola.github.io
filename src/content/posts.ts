import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';

export const blogTags = {
  cloudflare: 'Cloudflare',
  'command-line': 'Command line',
  deployment: 'Deployment',
  git: 'Git',
  github: 'GitHub',
  nestjs: 'NestJS',
  networking: 'Networking',
  nextjs: 'Next.js',
  payments: 'Payments',
  windows: 'Windows',
} as const;

export type Post = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: readonly (keyof typeof blogTags)[];
};

const directory = join(process.cwd(), 'src/content/blog');

export const posts: readonly Post[] = readdirSync(directory)
  .filter((name) => name.endsWith('.md'))
  .map((name) => {
    const { data } = matter(readFileSync(join(directory, name), 'utf8'));
    return { ...data, slug: name.slice(0, -3) } as Post;
  });

const dateFormatter = new Intl.DateTimeFormat('en', {
  dateStyle: 'long',
  timeZone: 'UTC',
});

export function formatPostDate(date: string) {
  return dateFormatter.format(new Date(date));
}
