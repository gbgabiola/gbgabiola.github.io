import Image from 'next/image';
import Link from 'next/link';

import photo from '../images/my-image.jpg';
import Navigation from '../components/navigation';
import ThemeProvider from '../components/theme-provider';
import ThemeSwitch from '../components/theme-switch';

import './globals.css';

const title = 'Genesis Gabiola - Software Engineer';

const description =
  'Genesis Gabiola, a Software Engineer specializing in Full Stack Development, builds aesthetic and performant websites and web applications for your business or personal needs.';

export const metadata = {
  title: {
    default: title,
    template: `%s | ${title}`,
  },
  description,
  authors: [{ name: 'Genesis Gabiola' }],
  openGraph: {
    title,
    description,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    creator: '@gbgabiola',
    title,
    description,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <a className="skip-link" href="#main">
            Skip to content
          </a>

          <header className="header">
            <div className="header-inner">
              <Link href="/" className="brand" aria-label="Genesis Gabiola home">
                <Image src={photo} alt="" width={48} height={48} className="avatar" />
                <span>Genesis Gabiola</span>
              </Link>

              <Navigation />
              <ThemeSwitch />
            </div>
          </header>

          <main id="main" className="content" tabIndex={-1}>
            {children}
          </main>

          <footer className="footer">
            <p>
              Made with{' '}
              <span role="img" aria-label="love">
                ❤️
              </span>{' '}
              by Genesis Gabiola using <a href="https://react.dev/">React</a> and{' '}
              <a href="https://nextjs.org/">Next.js</a>.
            </p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
