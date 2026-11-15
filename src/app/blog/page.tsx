import Link from 'next/link';
import { formatPostDate, posts } from '@/content/posts';
import { pageMetadata } from '@/lib/metadata';
import styles from './page.module.css';

export const metadata = pageMetadata(
  '/blog',
  'Blog',
  'Notes from G on building web applications and maintaining this portfolio.',
);

export default function BlogPage() {
  return (
    <div className={styles.column}>
      <header className={styles.intro}>
        <h1>Blog</h1>
        <p>Notes on building for the web and maintaining this portfolio.</p>
      </header>
      <ul className={styles.posts}>
        {[...posts].sort((a, b) => b.date.localeCompare(a.date)).map((post) => (
          <li key={post.slug}>
            <article>
              <time dateTime={post.date}>{formatPostDate(post.date)}</time>
              <h2><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2>
              <p>{post.summary}</p>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
