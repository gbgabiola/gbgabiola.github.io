import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogTags, posts } from '@/content/posts';
import { pageMetadata } from '@/lib/metadata';
import BlogBreadcrumbs from '../../breadcrumbs';
import BlogPostList from '../../post-list';
import styles from '../../page.module.css';

export const dynamicParams = false;

type Props = { params: Promise<{ tag: string }> };

export function generateStaticParams() {
  return Object.keys(blogTags).map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: Props) {
  const { tag } = await params;
  if (!Object.hasOwn(blogTags, tag)) notFound();

  const label = blogTags[tag as keyof typeof blogTags];
  return pageMetadata(`/blog/tags/${tag}`, `Posts tagged ${label}`, `Blog posts about ${label}.`);
}

export default async function BlogTagPage({ params }: Props) {
  const { tag } = await params;
  if (!Object.hasOwn(blogTags, tag)) notFound();

  const tagKey = tag as keyof typeof blogTags;
  const label = blogTags[tagKey];

  return (
    <div className={styles.column}>
      <header className={styles.intro}>
        <Link href="/blog">← All posts</Link>
        <BlogBreadcrumbs current={{ label }} />
        <h1>Posts tagged {label}</h1>
      </header>
      <BlogPostList posts={posts.filter((post) => post.tags.includes(tagKey))} />
    </div>
  );
}
