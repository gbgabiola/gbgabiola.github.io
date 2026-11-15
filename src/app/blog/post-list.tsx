import Link from 'next/link';
import { formatPostDate, type Post } from '@/content/posts';
import styles from './page.module.css';

export default function BlogPostList({ posts }: { posts: readonly Post[] }) {
  return (
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
  );
}
