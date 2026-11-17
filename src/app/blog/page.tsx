import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/config/site';
import { posts } from '@/content/posts';
import { blogFeedPath, blogFeedType } from '@/lib/blog-feed';
import { pageMetadata } from '@/lib/metadata';
import BlogPostList from './post-list';
import styles from './page.module.css';

const blogMetadata = pageMetadata(
  '/blog',
  'Blog',
  'Notes from G on building web applications and maintaining this portfolio.',
);

export const metadata: Metadata = {
  ...blogMetadata,
  alternates: {
    ...blogMetadata.alternates,
    types: { [blogFeedType]: new URL(blogFeedPath, site.url).href },
  },
};

export default function BlogPage() {
  return (
    <div className={styles.column}>
      <header className={styles.intro}>
        <h1>Blog</h1>
        <p>Notes on building for the web and maintaining this portfolio.</p>
        <Link href="/blog/tags">Browse tags</Link>
        <span aria-hidden="true"> · </span>
        <a href={blogFeedPath}>RSS feed</a>
      </header>
      <BlogPostList posts={posts} />
    </div>
  );
}
