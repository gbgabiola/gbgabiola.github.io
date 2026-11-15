import { faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, type IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { pageMetadata } from '@/lib/metadata';
import { profile } from '@/content/profile';
import ResumeLink from '@/components/ui/resume-link';
import styles from './page.module.css';

export const metadata = pageMetadata(
  '/contact',
  'Contact',
  'Get in touch with G about part-time remote work and web projects.',
);

const socialIcons = {
  linkedin: faLinkedin,
  twitter: faTwitter,
  github: faGithub,
};

function ContactIcon({ definition }: { definition: IconDefinition }) {
  const [width, height, , , data] = definition.icon;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={styles.icon}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      {[data].flat().map((path) => <path key={path} d={path} />)}
    </svg>
  );
}

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
          <ul className={styles.links}>
            <li>
              <a href={`mailto:${profile.email}`}>
                <ContactIcon definition={faEnvelope} />
                {profile.email}
              </a>
            </li>
            {profile.socialLinks.map(({ platform, label, username, href }) => (
              <li key={platform}>
                <a href={href} aria-label={`${label}: ${username}`}>
                  <ContactIcon definition={socialIcons[platform]} />
                  {username}
                </a>
              </li>
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
