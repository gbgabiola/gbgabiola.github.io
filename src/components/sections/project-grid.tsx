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
          <Image
            src={project.image}
            alt=""
            sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 340px"
            className={styles.image}
          />
          <div className={styles.caption}>
            <h2>{project.name}</h2>
            <p>{project.summary}</p>
            <ul>
              <li><a href={project.href} aria-label={`Live site for ${project.name}`}>Live site</a></li>
              <li><a href={project.source} aria-label={`View source for ${project.name}`}>Source</a></li>
            </ul>
          </div>
        </article>
      ))}
    </div>
  );
}
