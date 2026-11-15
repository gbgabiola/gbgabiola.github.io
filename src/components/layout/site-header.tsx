import Link from 'next/link';
import { profile } from '@/content/profile';
import Navigation from './navigation';
import ThemeSwitch from '@/components/theme/theme-switch';
import styles from './site-header.module.css';

export default function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link
          href="/"
          className={styles.brand}
          aria-label={`${profile.nickname} home`}
        >
          {profile.nickname}
        </Link>
        <div className={styles.controls}>
          <Navigation />
          <ThemeSwitch />
        </div>
      </div>
    </header>
  );
}
