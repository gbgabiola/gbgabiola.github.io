import Link from 'next/link';
import { pageMetadata } from '@/lib/metadata';
import { projects } from '@/content/projects';
import ProjectGrid from '@/components/sections/project-grid';
import styles from './page.module.css';

export const metadata = pageMetadata(
  '/works',
  'Works',
  'Explore G’s selected projects, including Caffeinawa, Omnifood, and UniFlix.',
);

export default function WorksPage() {
  return (
    <>
      <header className={styles.intro}>
        <h1 className="display-heading">Selected projects</h1>
      </header>
      <article className={styles.featured} aria-labelledby="featured-project">
        <header>
          <p className="eyebrow">Featured project</p>
          <h2 id="featured-project">Rebuilding this portfolio</h2>
          <p>
            As sole maintainer, I rebuilt my Gatsby portfolio using the
            Next.js App Router while preserving the page URLs and light and
            dark themes.
          </p>
        </header>
        <dl>
          <div>
            <dt>Technical decision</dt>
            <dd>
              I kept About and Works as separate routes and made Home and
              Contact compact enough to fit on common screens. The pages can
              still scroll when readers enlarge text or use a shorter viewport.
            </dd>
          </div>
          <div>
            <dt>Result</dt>
            <dd>
              The Next.js build serves all four portfolio pages on Vercel.
              GitHub Actions builds the site and checks the production routes.
            </dd>
          </div>
        </dl>
        <a href="https://github.com/gbgabiola/gbgabiola.github.io">
          View the portfolio source
        </a>
      </article>
      <section aria-labelledby="other-projects">
        <h2 id="other-projects">More projects</h2>
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
