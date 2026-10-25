'use client';

import { useTheme } from 'next-themes';

export default function ThemeSwitch() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      onClick={() => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
      }}
    >
      <span className="theme-dark">Switch to light</span>
      <span className="theme-light">Switch to dark</span>
    </button>
  );
}
