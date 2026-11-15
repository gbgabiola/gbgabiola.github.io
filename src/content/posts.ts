export const blogTags = {
  css: 'CSS',
  accessibility: 'Accessibility',
} as const;

export type Post = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: readonly (keyof typeof blogTags)[];
};

export const posts: readonly Post[] = [
  {
    slug: 'portfolio-pages-that-fit',
    title: 'Designing portfolio pages to fit the viewport',
    date: '2026-11-15',
    tags: ['css', 'accessibility'],
    summary: 'How I kept Home and Contact compact while preserving navigation, project links, and room for larger text.',
  },
];

const dateFormatter = new Intl.DateTimeFormat('en', {
  dateStyle: 'long',
  timeZone: 'UTC',
});

export function formatPostDate(date: string) {
  return dateFormatter.format(new Date(date));
}
