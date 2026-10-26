import Image from 'next/image';
import Link from 'next/link';
import { pageMetadata } from '@/lib/metadata';
import { profile } from '@/content/profile';
import { projects } from '@/content/projects';
import photo from '@/assets/images/my-image.jpg';
import ResumeLink from '@/components/ui/resume-link';
import ProjectGrid from '@/components/sections/project-grid';
import buttons from '@/components/ui/button.module.css';
import styles from './page.module.css';

export const metadata = pageMetadata('Home');

export default function HomePage() {
  return (
    <>
      <section className={styles.hero} aria-labelledby="home-heading">
        <div>
          <p className={styles.eyebrow}>
            {profile.role} · {profile.specialization}
          </p>
          <h1 id="home-heading">I am Genesis, a Software Engineer.</h1>
          <p className={styles.summary}>{profile.summary}</p>
          <p className={styles.availability}>{profile.availability}</p>
          <div className={styles.actions}>
            <Link href="/works" className={buttons.primary}>
              Explore my work
            </Link>
            <ResumeLink />
          </div>
        </div>
        <Image
          src={photo}
          alt="Genesis Gabiola"
          width={280}
          height={280}
          sizes="(max-width: 800px) 180px, 280px"
          preload
          className={styles.portrait}
        />
      </section>

      <section className={styles.section} aria-labelledby="projects-heading">
        <div className={styles.sectionHeading}>
          <h2 id="projects-heading">Selected projects</h2>
          <Link href="/works">All projects →</Link>
        </div>
        <ProjectGrid projects={projects} />
      </section>

      <section className={styles.section} aria-labelledby="approach-heading">
        <p className={styles.eyebrow}>From interface to delivery</p>
        <h2 id="approach-heading">
          Software built around people and practical needs.
        </h2>
        <p>
          My work spans React interfaces, backend development, shared npm
          packages, API documentation, and automated deployment workflows. I
          care about software that is useful to people and maintainable for the
          teams behind it.
        </p>
        <Link href="/about">Explore my experience and skills →</Link>
      </section>

      <section className={styles.callout} aria-labelledby="contact-heading">
        <h2 id="contact-heading">Have a project in mind?</h2>
        <p>{profile.availability}</p>
        <Link href="/contact" className={buttons.primary}>
          Let’s talk
        </Link>
      </section>
    </>
  );
}
