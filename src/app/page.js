import Link from 'next/link';

import { pageMetadata } from '../lib/metadata';
import Typewriter from '../components/typewriter';

export const metadata = pageMetadata('Home');

export default function HomePage() {
  return (
    <section className="hero">
      <Typewriter />

      <p>Want an app? Let’s work together and make your dream a reality.</p>

      <Link href="/contact" className="button">
        Yes! I am available to hire →
      </Link>

      <Link href="/about">Learn more about me</Link>
    </section>
  );
}
