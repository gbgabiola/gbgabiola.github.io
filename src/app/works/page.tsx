import Link from 'next/link';
import { pageMetadata } from '@/lib/metadata';
import { projects } from '@/content/projects';
import ProjectGrid from '@/components/sections/project-grid';
import styles from './page.module.css';

export const metadata = pageMetadata(
  'Works',
  'Explore selected projects by Genesis Gabiola, including Caffeinawa, Omnifood, and UniFlix.',
);

export default function WorksPage() {
  return (
    <>
      <header className={styles.intro}>
        <h1>Selected projects</h1>
        <p>
          A selection of websites and applications I’ve worked on. Open a
          project to explore it.
        </p>
      </header>
      <section aria-labelledby="projects-heading">
        <h2 id="projects-heading">Project gallery</h2>
        <ProjectGrid projects={projects} />
      </section>
      <section className={styles.callout}>
        <h2>Have a project in mind?</h2>
        <p>Let’s discuss what you want to build.</p>
        <Link href="/contact">Let’s talk →</Link>
      </section>
    </>
  );
}
