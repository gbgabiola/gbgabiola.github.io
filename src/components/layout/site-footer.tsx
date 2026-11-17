import Link from 'next/link';
import { site } from '@/config/site';
import styles from './site-footer.module.css';

export default function SiteFooter() {
  const year = new Date().getUTCFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.copyright}>
          © {site.establishedYear}–{year} <span className={styles.brand}>{site.brand}</span>
        </p>
        <nav aria-label="Footer" className={styles.links}>
          <a href={`https://github.com/${site.brand}`}>
            GitHub <span aria-hidden="true">↗</span>
          </a>
          <Link href="/contact">Get in touch</Link>
        </nav>
      </div>
    </footer>
  );
}
