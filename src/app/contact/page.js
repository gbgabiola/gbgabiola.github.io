import Link from 'next/link';

import { pageMetadata } from '../../lib/metadata';
import { profile } from '../../data/profile';
import ResumeLink from '../../components/resume-link';

export const metadata = pageMetadata('Contact');

export default function ContactPage() {
  return (
    <>
      <h1>Let’s build something useful.</h1>

      <p>{profile.availability}</p>

      <p>
        Tell me about your project, the problem you want to solve, and where you need support. I’m interested in work
        across frontend and backend development.
      </p>

      <section aria-labelledby="contact-heading">
        <h2 id="contact-heading">Get in touch</h2>

        <p>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </p>

        <ul className="contacts">
          {profile.socialLinks.map(link => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="resume-heading">
        <h2 id="resume-heading">Experience at a glance</h2>

        <p>Download my resume for an overview of my experience and technical background.</p>

        <ResumeLink />

        <p>
          Prefer to read it online? <a href={profile.resume.viewUrl}>View resume on Google Drive</a>.
        </p>
      </section>

      <p>
        Learn more <Link href="/about">about my experience</Link> or explore <Link href="/works">my projects</Link>.
      </p>
    </>
  );
}
