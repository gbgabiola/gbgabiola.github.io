import Image from 'next/image';
import Link from 'next/link';
import { pageMetadata } from '@/lib/metadata';
import { profile } from '@/content/profile';
import { projects } from '@/content/projects';
import photo from '@/assets/images/my-image.jpg';
import ResumeLink from '@/components/ui/resume-link';
import buttons from '@/components/ui/button.module.css';
import styles from './page.module.css';

export const metadata = pageMetadata('/', 'Home');

export default function HomePage() {
  return (
    <div className="viewport-page">
      <section className={styles.hero} aria-labelledby="home-heading">
        <div>
          <p className="eyebrow">{profile.specialization}</p>
          <h1 id="home-heading">I’m {profile.nickname}, a {profile.role}.</h1>
          <p className="intro-copy">
            I build thoughtful web interfaces and reliable APIs.
          </p>
          <p className={styles.availability}>
            <Link href="/contact">Open to part-time work</Link>
          </p>
          <div className={styles.actions}>
            <Link href="/works" className={buttons.primary}>View work</Link>
            <ResumeLink />
          </div>
        </div>
        <Image
          src={photo}
          alt={`Portrait of ${profile.nickname}`}
          width={280}
          height={280}
          sizes="(max-width: 720px) 112px, (max-height: 600px) 40svh, 280px"
          preload
          className={styles.portrait}
        />
      </section>

      <section className={styles.projects} aria-labelledby="projects-heading">
        <h2 id="projects-heading">Selected projects</h2>
        <ul>
          {projects.map(({ name, image, href }) => (
            <li key={href}>
              <a href={href}>
                <Image
                  src={image}
                  alt=""
                  sizes="(min-width: 721px) and (min-height: 800px) min(29vw, 340px), 80px"
                />
                <span>{name} <span aria-hidden="true">↗</span></span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
