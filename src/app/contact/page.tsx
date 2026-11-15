import { pageMetadata } from '@/lib/metadata';
import { profile } from '@/content/profile';
import ResumeLink from '@/components/ui/resume-link';
import styles from './page.module.css';

export const metadata = pageMetadata(
  'Contact',
  'Get in touch with G about part-time remote work and web projects.',
);

export default function ContactPage() {
  return (
    <div className="viewport-page">
      <header>
        <h1>Let’s build something useful.</h1>
        <p className="intro-copy">{profile.availability} Tell me what you’re building.</p>
      </header>

      <div className={styles.grid}>
        <section className={styles.card} aria-labelledby="contact-heading">
          <h2 id="contact-heading">Get in touch</h2>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <ul className={styles.links}>
            {profile.socialLinks.map(({ label, href }) => (
              <li key={href}><a href={href}>{label}</a></li>
            ))}
          </ul>
        </section>

        <section className={styles.card} aria-labelledby="resume-heading">
          <h2 id="resume-heading">Experience at a glance</h2>
          <div className={styles.actions}>
            <ResumeLink />
            <a href={profile.resume.viewUrl}>View online</a>
          </div>
        </section>
      </div>
    </div>
  );
}
