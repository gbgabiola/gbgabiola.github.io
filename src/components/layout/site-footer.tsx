import Link from 'next/link';
import { site } from '@/config/site';
import styles from './site-footer.module.css';

export default function SiteFooter() {
  const year = new Date().getUTCFullYear();
  const githubUrl = `https://github.com/${site.brand}`;

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.copyright}>
          © {site.establishedYear}–{year}{' '}
          <a className={styles.brand} href={githubUrl}>{site.brand}</a>
        </p>
        <nav aria-label="Footer" className={styles.links}>
          <a href={githubUrl}>
            GitHub <span aria-hidden="true">↗</span>
          </a>
          <Link href="/contact">Get in touch</Link>
        </nav>
      </div>
    </footer>
  );
}
