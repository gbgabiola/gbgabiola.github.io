import Image from 'next/image';

import { pageMetadata } from '../../lib/metadata';
import { profile } from '../../data/profile';
import { interests, professionalExp, skillGroups } from '../../data/about';
import ResumeLink from '../../components/resume-link';
import photo from '../../images/my-image.jpg';

export const metadata = pageMetadata('About');

export default function AboutPage() {
  return (
    <>
      <header className="profile">
        <Image src={photo} alt={profile.name} width={150} height={150} className="avatar" />

        <h1>{profile.name}</h1>

        <p>
          {profile.role} · {profile.specialization}
        </p>

        <p>{profile.location}</p>

        <ResumeLink />
      </header>

      <section aria-labelledby="about-heading">
        <h2 id="about-heading">About me</h2>

        <p>{profile.summary}</p>

        <p>
          I work across frontend and backend development, with experience in financial services workflows, shared
          frontend tooling, and automated deployments. My goal is to turn business requirements into clear, practical
          software that teams can maintain and improve.
        </p>

        <p>
          I value the human side of engineering: understanding the people using a product, collaborating with the team
          building it, and making technical decisions that serve both.
        </p>
      </section>

      <section aria-labelledby="experience-heading">
        <h2 id="experience-heading">Professional Experience</h2>

        {professionalExp.map(experience => (
          <article className="experience" key={experience.company}>
            <h3>{experience.company}</h3>
            <p className="period">{experience.info}</p>
            <p>{experience.description}</p>
          </article>
        ))}
      </section>

      <section aria-labelledby="skills-heading">
        <h2 id="skills-heading">Technical skills</h2>

        <div className="skills">
          {skillGroups.map(group => (
            <section key={group.title}>
              <h3>{group.title}</h3>

              <ul>
                {group.items.map(skill => (
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
          {interests.map(interest => (
            <li key={interest}>{interest}</li>
          ))}
        </ul>
      </section>
    </>
  );
}
