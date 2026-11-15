import { pageMetadata } from '@/lib/metadata';
import { projects } from '@/content/projects';
import ProjectGrid from '@/components/sections/project-grid';
import styles from './page.module.css';

export const metadata = pageMetadata(
  '/works',
  'Works',
  'Explore G’s featured projects, including Caffeinawa, EM Carpentry, and FBCSI.',
);

export default function WorksPage() {
  return (
    <>
      <header className={styles.intro}>
        <h1 className="display-heading">Featured projects</h1>
      </header>
      <ProjectGrid projects={projects} />
      <p className={styles.more}>
        <a href="https://github.com/gbgabiola?tab=repositories">
          See more projects on GitHub <span aria-hidden="true">↗</span>
        </a>
      </p>
    </>
  );
}
