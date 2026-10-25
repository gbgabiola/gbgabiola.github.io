import Image from 'next/image';

import { pageMetadata } from '../../lib/metadata';
import photo from '../../images/my-image.jpg';
import { personalStuff, professionalExp, skills } from '../../data/about';

export const metadata = pageMetadata('About');

const groups = [
  ['General Development Skills', [...skills.set1, ...skills.set2]],
  ['React.js Related Skills and Libraries', [...skills.set3, ...skills.set4]],
];

export default function AboutPage() {
  return (
    <>
      <header className="profile">
        <Image src={photo} alt="Genesis Gabiola" width={150} height={150} className="avatar" />

        <h1>Genesis Gabiola</h1>

        <p>Programmer | Coder | Software Engineer | IT | Full Stack Developer</p>
      </header>

      <section>
        <h2>About Me</h2>

        <p>
          Hi! My name is Genesis and I&apos;m a Full Stack Developer. I live in the City of San Fernando, Pampanga
          Philippines
          <span role="img" aria-label="Philippines">
            {' '}
            🇵🇭
          </span>
          .
        </p>

        <p>
          {`My passion is user experience and creating real business value with a particular goal of understanding the human side of software development. In the words of `}
          <a href="https://blog.codinghorror.com/about-me">Jeff Atwood</a>
          {`, "Computers are fascinating machines, but they're mostly a reflection of the people using them... you have to study the people `}
          <em>behind</em>
          {` the software, too."`}
        </p>

        <p>
          I want to use the technology based solutions, to help solve real world challenges. I want to work with you on
          improving your business by creating software, website or apps that works for you.
        </p>

        <p>For personal things, I:</p>

        <ul>
          {personalStuff.map(stuff => (
            <li key={stuff}>
              <p>{stuff}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Professional Experience</h2>

        {professionalExp.map(experience => (
          <article className="experience" key={experience.company}>
            <h3>{experience.company}</h3>
            <p className="period">{experience.info}</p>
            <p>{experience.description}</p>
          </article>
        ))}
      </section>

      <section>
        <h2>Skills and Proficiency</h2>

        <div className="skills">
          {groups.map(([title, items]) => (
            <section key={title}>
              <h3>{title}</h3>

              <ul>
                {items.map(skill => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>
    </>
  );
}
