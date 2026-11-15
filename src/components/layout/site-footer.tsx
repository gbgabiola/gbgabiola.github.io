import { site } from '@/config/site';
import styles from './site-footer.module.css';

export default function SiteFooter() {
  const year = new Date().getUTCFullYear();

  return (
    <footer className={styles.footer}>
      <p>
        © {year}{' '}
        <a className={styles.brand} href={`https://github.com/${site.brand}`}>
          {site.brand}
        </a>
      </p>
      <p>{`Portfolio v${site.version}`}</p>
    </footer>
  );
}
