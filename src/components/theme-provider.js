'use client';

import { ThemeProvider as NextThemeProvider } from 'next-themes';

export default function ThemeProvider({ children }) {
  return (
    <NextThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false}>
      {children}
    </NextThemeProvider>
  );
}
