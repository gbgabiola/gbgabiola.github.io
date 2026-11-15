import { pageMetadata } from '@/lib/metadata';
import { profile } from '@/content/profile';
import ResumeLink from '@/components/ui/resume-link';
import buttons from '@/components/ui/button.module.css';
import styles from './page.module.css';

export const metadata = pageMetadata(
  'Contact',
  'Contact Genesis Gabiola about part-time remote opportunities and project collaborations, or download his resume.',
);

export default function ContactPage() {
  return (
    <div className="viewport-page">
      <div className={styles.grid}>
        <section aria-labelledby="contact-heading">
          <p className="eyebrow">Contact</p>
          <h1 id="contact-heading" className="display-heading">Let’s talk.</h1>
          <p className="intro-copy">{profile.availability}</p>
          <a className={buttons.primary} href={`mailto:${profile.email}`}>
            Email me <span className={styles.arrow} aria-hidden="true">↗</span>
          </a>
          <p className={styles.address}>{profile.email}</p>
        </section>
        <div className={styles.details}>
          <section aria-labelledby="profiles-heading">
            <h2 id="profiles-heading">Find me online</h2>
            <ul className={styles.links}>
              {profile.socialLinks.map(({ label, href }) => (
                <li key={href}>
                  <a href={href}>{label} <span aria-hidden="true">↗</span></a>
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="resume-heading">
            <h2 id="resume-heading">Resume</h2>
            <div className={styles.actions}>
              <ResumeLink />
              <a href={profile.resume.viewUrl}>View online</a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
