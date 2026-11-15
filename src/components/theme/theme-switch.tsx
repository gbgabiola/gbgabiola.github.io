'use client';

import { useTheme } from 'next-themes';
import styles from './theme-switch.module.css';

export default function ThemeSwitch() {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <button
      className={styles.toggle}
      type="button"
      aria-label="Toggle color theme"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      <span className={styles.dark}>Switch to light</span>
      <span className={styles.light}>Switch to dark</span>
    </button>
  );
}
