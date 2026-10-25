import Image from 'next/image';
import Link from 'next/link';

import { pageMetadata } from '../../lib/metadata';
import caffeinawa from '../../images/caffeinawa.png';
import omnifood from '../../images/omnifood.png';
import uniflix from '../../images/uniflix.png';

export const metadata = pageMetadata('Works');

const projects = [
  {
    name: 'Caffeinawa',
    image: caffeinawa,
    href: 'https://caffeinawa.pages.dev',
  },
  {
    name: 'Omnifood',
    image: omnifood,
    href: 'https://gbgabiola.github.io/omnifood',
  },
  {
    name: 'UniFlix',
    image: uniflix,
    href: 'https://gbgabiola.github.io/uniflix',
  },
];

export default function WorksPage() {
  return (
    <>
      <h1>Selected projects</h1>

      <div className="projects">
        {projects.map(project => (
          <article className="project" key={project.name}>
            <a href={project.href}>
              <Image
                src={project.image}
                alt={`${project.name} website screenshot`}
                sizes="(max-width: 640px) 100vw, 380px"
                className="project-image"
              />

              <h2>{project.name}</h2>
            </a>
          </article>
        ))}

        <section className="project project-more">
          <h2>Have a project in mind?</h2>
          <p>Let’s discuss what you want to build.</p>
          <Link href="/contact">Let’s talk</Link>
        </section>
      </div>
    </>
  );
}
