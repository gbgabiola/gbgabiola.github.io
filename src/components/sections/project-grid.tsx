import Image from 'next/image';
import type { Project } from '@/content/projects';
import styles from './project-grid.module.css';

export default function ProjectGrid({
  projects,
}: {
  projects: readonly Project[];
}) {
  return (
    <div className={styles.grid}>
      {projects.map((project) => (
        <article className={styles.card} key={project.href}>
          <a href={project.href}>
            <Image
              src={project.image}
              alt={`${project.name} website screenshot`}
              sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 340px"
              className={styles.image}
            />
            <div className={styles.caption}>
              <h3>{project.name}</h3>
              <span>View website</span>
            </div>
          </a>
        </article>
      ))}
    </div>
  );
}
