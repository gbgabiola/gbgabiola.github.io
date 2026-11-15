'use client';

import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';
import styles from './theme-switch.module.css';

const subscribe = () => () => {};

export default function ThemeSwitch() {
  const { resolvedTheme, setTheme } = useTheme();
  // The saved theme is available only in the browser.
  const hydrated = useSyncExternalStore(subscribe, () => true, () => false);
  const dark = !hydrated || resolvedTheme !== 'light';

  return (
    <button
      className={styles.toggle}
      type="button"
      aria-label="Dark mode"
      aria-pressed={dark}
      title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={() => setTheme(dark ? 'light' : 'dark')}
    >
      <svg
        className={styles.sun}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        aria-hidden="true"
        focusable="false"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
      <svg
        className={styles.moon}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M20.5 13.3A8.5 8.5 0 0 1 10.7 3.5a8.5 8.5 0 1 0 9.8 9.8Z" />
      </svg>
    </button>
  );
}
