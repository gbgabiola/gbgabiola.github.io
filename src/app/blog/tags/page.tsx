import Link from 'next/link';
import { blogTags } from '@/content/posts';
import { pageMetadata } from '@/lib/metadata';
import BlogBreadcrumbs from '../breadcrumbs';
import styles from '../page.module.css';

export const metadata = pageMetadata('/blog/tags', 'Blog tags', 'Browse blog posts by topic.');

export default function BlogTagsPage() {
  return (
    <div className={styles.column}>
      <header className={styles.intro}>
        <Link href="/blog">← All posts</Link>
        <BlogBreadcrumbs current={{ label: 'Tags', isTagsIndex: true }} />
        <h1>Tags</h1>
      </header>
      <ul className={styles.tags}>
        {Object.entries(blogTags).map(([slug, label]) => (
          <li key={slug}><Link href={`/blog/tags/${slug}`}>{label}</Link></li>
        ))}
      </ul>
    </div>
  );
}
