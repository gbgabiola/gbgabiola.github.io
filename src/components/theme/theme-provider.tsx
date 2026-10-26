'use client';

import type { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';

export default function PortfolioThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="dark"
      enableSystem={false}
    >
      {children}
    </ThemeProvider>
  );
}
