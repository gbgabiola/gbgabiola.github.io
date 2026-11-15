'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { site } from '@/config/site';
import styles from './site-header.module.css';

export default function Navigation() {
  const pathname = usePathname();
  return (
    <nav className={styles.nav} aria-label="Main navigation">
      <ul>
        {site.navigation.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              aria-current={pathname === href ? 'page' : undefined}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
