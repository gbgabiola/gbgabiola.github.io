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
        strokeWidth="1.75"
        strokeLinecap="round"
        aria-hidden="true"
        focusable="false"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
      </svg>
      <svg
        className={styles.moon}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M20.5 15A8.5 8.5 0 0 1 9 3.5 8.5 8.5 0 1 0 20.5 15Z" />
      </svg>
    </button>
  );
}
