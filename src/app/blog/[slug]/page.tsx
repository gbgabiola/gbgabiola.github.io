import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Markdown from 'react-markdown';
import { formatPostDate, posts } from '@/content/posts';
import { pageMetadata } from '@/lib/metadata';
import styles from '../page.module.css';

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((entry) => entry.slug === slug);
  if (!post) notFound();

  return pageMetadata(`/blog/${post.slug}`, post.title, post.summary);
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((entry) => entry.slug === slug);
  if (!post) notFound();

  const content = await readFile(
    join(process.cwd(), 'src/content/blog', `${post.slug}.md`),
    'utf8',
  );

  return (
    <article className={styles.column}>
      <header className={styles.intro}>
        <Link href="/blog">← All posts</Link>
        <h1>{post.title}</h1>
        <time dateTime={post.date}>{formatPostDate(post.date)}</time>
      </header>
      <div className={styles.content}>
        <Markdown>{content}</Markdown>
      </div>
    </article>
  );
}
