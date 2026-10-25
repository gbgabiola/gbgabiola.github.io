import Link from 'next/link';

import { pageMetadata } from '../lib/metadata';
import { profile } from '../data/profile';
import ResumeLink from '../components/resume-link';
import Typewriter from '../components/typewriter';

export const metadata = pageMetadata('Home');

export default function HomePage() {
  return (
    <>
      <section className="hero" aria-labelledby="intro-heading">
        <p id="intro-heading">
          {profile.role} · {profile.specialization}
        </p>

        <Typewriter />

        <p>{profile.summary}</p>
        <p>{profile.availability}</p>

        <Link href="/works" className="button">
          Explore my work
        </Link>

        <ResumeLink />

        <Link href="/contact">Discuss a project</Link>
      </section>

      <section aria-labelledby="approach-heading">
        <h2 id="approach-heading">From interface to delivery</h2>

        <p>
          My work spans React interfaces, backend development, shared npm packages, API documentation, and automated
          deployment workflows. I care about software that is useful to people and maintainable for the teams behind it.
        </p>

        <Link href="/about">Explore my experience and skills</Link>
      </section>
    </>
  );
}
