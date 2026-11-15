import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { site } from '@/config/site';
import { profile } from '@/content/profile';
import SiteHeader from '@/components/layout/site-header';
import SiteFooter from '@/components/layout/site-footer';
import ThemeProvider from '@/components/theme/theme-provider';
import './globals.css';

export const metadata: Metadata = {
  title: { default: site.title, template: `%s | ${site.title}` },
  description: site.description,
  authors: [{ name: profile.name }],
  openGraph: {
    title: site.title,
    description: site.description,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: site.title,
    description: site.description,
    creator: '@gbgabiola',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <SiteHeader />
          <main id="main" className="container" tabIndex={-1}>
            {children}
          </main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
