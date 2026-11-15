import Link from 'next/link';
import { posts } from '@/content/posts';
import { pageMetadata } from '@/lib/metadata';
import BlogPostList from './post-list';
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
        <Link href="/blog/tags">Browse tags</Link>
      </header>
      <BlogPostList posts={posts} />
    </div>
  );
}
