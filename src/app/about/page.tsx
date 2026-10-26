import Image from 'next/image';
import { pageMetadata } from '@/lib/metadata';
import { profile } from '@/content/profile';
import { experiences, skillGroups, interests } from '@/content/about';
import photo from '@/assets/images/my-image.jpg';
import ResumeLink from '@/components/ui/resume-link';
import styles from './page.module.css';

export const metadata = pageMetadata(
  'About',
  'Explore Genesis Gabiola’s professional experience, technical skills, and approach to full stack development.',
);

export default function AboutPage() {
  return (
    <>
      <header className={styles.profile}>
        <Image
          src={photo}
          alt={profile.name}
          width={120}
          height={120}
          className={styles.portrait}
        />
        <div>
          <h1>About {profile.name}</h1>
          <p>
            {profile.role} · {profile.specialization}
          </p>
          <p>{profile.location}</p>
        </div>
      </header>
      <section className={styles.section} aria-labelledby="about-heading">
        <h2 id="about-heading">How I work</h2>
        <p>{profile.summary}</p>
        <p>
          I work across frontend and backend development, with experience in
          financial services workflows, shared frontend tooling, and automated
          deployments. My goal is to turn business requirements into clear,
          practical software that teams can maintain and improve.
        </p>
        <p>
          I value the human side of engineering: understanding the people using
          a product, collaborating with the team building it, and making
          technical decisions that serve both.
        </p>
        <ResumeLink />
      </section>
      <section className={styles.section} aria-labelledby="experience-heading">
        <h2 id="experience-heading">Professional Experience</h2>
        <ol className={styles.timeline}>
          {experiences.map((experience) => (
            <li key={experience.company}>
              <article>
                <h3>{experience.company}</h3>
                <p className={styles.period}>{experience.info}</p>
                <p>{experience.description}</p>
              </article>
            </li>
          ))}
        </ol>
      </section>
      <section className={styles.section} aria-labelledby="skills-heading">
        <h2 id="skills-heading">Technical skills</h2>
        <div className={styles.skills}>
          {skillGroups.map((group) => (
            <section key={group.title}>
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>
      <section aria-labelledby="interests-heading">
        <h2 id="interests-heading">Beyond the code</h2>
        <ul>
          {interests.map((interest) => (
            <li key={interest}>{interest}</li>
          ))}
        </ul>
      </section>
    </>
  );
}
