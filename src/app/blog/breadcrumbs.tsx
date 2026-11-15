import Link from 'next/link';
import styles from './page.module.css';

export default function BlogBreadcrumbs({
  current,
}: {
  current?: { label: string; isTagsIndex?: boolean };
}) {
  return (
    <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
      <ol>
        <li><Link href="/">Home</Link></li>
        <li>
          <span aria-hidden="true">/</span>
          {current?.isTagsIndex
            ? <span aria-current="page">Tags</span>
            : <Link href="/blog/tags">Tags</Link>}
        </li>
        {current && !current.isTagsIndex && (
          <li>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{current.label}</span>
          </li>
        )}
      </ol>
    </nav>
  );
}
