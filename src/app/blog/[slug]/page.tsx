import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Markdown from 'react-markdown';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { site } from '@/config/site';
import { blogTags, formatPostDate, posts } from '@/content/posts';
import { pageMetadata } from '@/lib/metadata';
import BlogBreadcrumbs from '../breadcrumbs';
import styles from '../page.module.css';
import articleLayout from './article-layout';
import ScrollableTable from './scrollable-table';

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
    <article className={styles.article}>
      <header className={`${styles.column} ${styles.intro}`}>
        <Link href="/blog" className={styles.mobileBack}>← All posts</Link>
        <BlogBreadcrumbs />
        <h1>{post.title}</h1>
        <div className={styles.byline}>
          <span>By <Link href="/about">{site.brand}</Link></span>
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
        </div>
        <div className={styles.tagged}>
          <span>Tagged:</span>
          <ul className={styles.tags}>
            {post.tags.map((tag) => (
              <li key={tag}><Link href={`/blog/tags/${tag}`}>{blogTags[tag]}</Link></li>
            ))}
          </ul>
        </div>
      </header>
      <div className={styles.content}>
        <Markdown
          remarkPlugins={[remarkGfm]}
          components={{
            aside: ({ children }) => (
              <aside className={styles.sidebar} aria-label="Article navigation">
                <Link href="/blog">← All posts</Link>
                <p className={styles.sidebarTitle}>{post.title}</p>
                {children}
              </aside>
            ),
            table: ({ children }) => <ScrollableTable>{children}</ScrollableTable>,
          }}
          rehypePlugins={[[rehypeSlug, { prefix: 'post-' }], articleLayout]}
        >
          {content}
        </Markdown>
      </div>
    </article>
  );
}
