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
    href: 'gbgabiola.github.io/uniflix',
  },
];

export default function WorksPage() {
  return (
    <>
      <h1>Here are some of my recent projects!</h1>

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
          <h2>You like it?</h2>
          <p>I’ve got some more stuff up my sleeves.</p>
          <Link href="/contact">Let’s talk</Link>
        </section>
      </div>
    </>
  );
}
