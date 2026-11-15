import Image from 'next/image';
import Link from 'next/link';
import { pageMetadata } from '@/lib/metadata';
import { profile } from '@/content/profile';
import { projects } from '@/content/projects';
import photo from '@/assets/images/my-image.jpg';
import ResumeLink from '@/components/ui/resume-link';
import buttons from '@/components/ui/button.module.css';
import styles from './page.module.css';

export const metadata = pageMetadata('Home');

export default function HomePage() {
  return (
    <div className="viewport-page">
      <section className={styles.hero} aria-labelledby="home-heading">
        <div>
          <p className="eyebrow">{profile.role}</p>
          <h1 id="home-heading" className="display-heading">{profile.name}</h1>
          <p className="intro-copy">I build web interfaces and backend APIs.</p>
          <div className={styles.actions}>
            <Link href="/works" className={buttons.primary}>View work</Link>
            <ResumeLink />
          </div>
          <p className={styles.availability}>
            <Link href="/contact">Available for part-time work</Link>
          </p>
        </div>
        <figure className={styles.photo}>
          <Image
            src={photo}
            alt={profile.name}
            width={360}
            height={360}
            sizes="(max-width: 720px) 112px, 360px"
            preload
          />
          <figcaption>{profile.location}</figcaption>
        </figure>
      </section>
      <section className={styles.projects} aria-labelledby="projects-heading">
        <h2 id="projects-heading">Selected work</h2>
        <ul>
          {projects.map(({ name, href }) => (
            <li key={href}>
              <a href={href}>{name} <span aria-hidden="true">↗</span></a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
