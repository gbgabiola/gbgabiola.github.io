import React from 'react'
import styled from '@emotion/styled'

import SEO from '../components/seo'
import { Content, PrimaryText } from '../components/common'
import Profile from '../components/Profile'
import ProfessionalExperience from '../components/ProfessionalExperience'

const Section = styled.section`
  margin-bottom: 40px;
`

const SectionTitle = styled.h2`
  font-size: 24px;
  color: ${(props) => props.theme.colors.highlighted};
  margin-top: 0;
  margin-bottom: 1em;
`

const SkillsGroup = styled.div`
  display: flex;

  ul {
    margin: 0;
    flex-basis: 50%;
  }
`

const SkillGroupTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 0;
  color: ${(props) => props.theme.colors.highlighted};
`

const personalStuff = [
  'love reading useful matierials like coding resources and docs.',
  'teach tech stuff to interesting people and career-shifters.',
  'love the tools related to react/gatsby and node.js.',
  'motivated to do Open-Source!',
  'am a traveler.',
  'only have one woman.',
]

const professionalExp = [
  {
    company: 'Freelance Front-end Developer',
    info: 'Present (Remote / Part-time)',
    description:
      'As a Freelance Developer, I do all sorts of front-end projects ranging from Design to HTML/CSS Convertion, Static Site Development with Gatsby, Front-end troubleshooting, and UI prototype development.',
  },
  {
    company: 'Wideout Workforces Inc. - Creative Developer',
    info: 'March 2020 - May 2020 (Remote - Makati City, Philippines)',
    description:
      'Convert raw assets provided by the clients into rich media ad executions. Translate requirements, graphic designs, and specifications into working ads using core technologies used by the client. Ensuring that all units sent to clients are 100% functional and up to specs. Testing for functionality in different browsers and at different resolutions, and fixing errors when necessary. Embrace and apply company core values – Agility, Quality, and Accountability.',
  },
  {
    company: 'TwistResources - QA Engineer',
    info: 'November 2014 - November 2015 (Clark Pampanga, Philippines)',
    description:
      'My experience in the web/app development company involves more on the testing/debugging aspects of web development. I worked as their associate QA Engineer mainly focusing on tooltwist tools for testing the site and checking bugs. With 1 year, I gained a lot of experience not just with testing, but also with complex yet aesthetic designs for the web.',
  },
]

const skills = {
  set1: [
    'Git and Github',
    'HTML5 / CSS3',
    'Responsive Web Design',
    'SASS',
    'Basic Design Skills (Figma)',
  ],
  set2: ['Javascript (ES6)', 'React.js', 'JQuery', 'Basic Node.js'],
  set3: [
    'React Router',
    'React-Apollo',
    'Formik',
    'Styled-Components / Emotion',
    'Ant-Design',
    'Recompose',
    'Lodash',
  ],
  set4: [
    'Gatsby',
    'React Testing Library / Enzyme',
    'Jest',
    'Redux',
    'Render Props and HOC patterns',
    'React Context API',
    'React Hooks',
  ],
}

const About = () => (
  <>
    <SEO title="About" />
    <Content>
      <Profile
        name="Genesis Gabiola"
        title="Programmer | Coder | Engineer | IT | Front-End Developer"
      />

      <Section>
        <SectionTitle>About Me</SectionTitle>
        <p>
          Hi! My name is Genesis and I&apos;m a Front-End Developer. I live in
          the City of San Fernando, Pampanga Philippines
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
          I want to use the technology based solutions, to help solve real world
          challenges. I want to work with you on improving your business by
          creating software, website or apps that works for you.
        </p>
        <p>For personal things, I:</p>
        <ul>
          {personalStuff.map((stuff) => (
            <li key={stuff}>
              <p>{stuff}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <SectionTitle>Professional Experience</SectionTitle>
        {professionalExp.map((profExp) => (
          <ProfessionalExperience
            key={profExp.company}
            company={profExp.company}
            info={profExp.info}
            description={profExp.description}
          />
        ))}
      </Section>

      <Section>
        <SectionTitle>Skills and Proficiency</SectionTitle>
        <SkillGroupTitle>General Development Skills</SkillGroupTitle>
        <SkillsGroup>
          <ul>
            {skills.set1.map((skill) => (
              <li key={skill}>
                <p>{skill}</p>
              </li>
            ))}
          </ul>
          <ul>
            {skills.set2.map((skill) => (
              <li key={skill}>
                <p>{skill}</p>
              </li>
            ))}
          </ul>
        </SkillsGroup>
        <SkillGroupTitle>React.js Related Skills and Libraries</SkillGroupTitle>
        <SkillsGroup>
          <ul>
            {skills.set3.map((skill) => (
              <li key={skill}>
                <p>{skill}</p>
              </li>
            ))}
          </ul>
          <ul>
            {skills.set4.map((skill) => (
              <li key={skill}>
                <p>
                  {skill}
                  {skill === 'React Hooks' && <PrimaryText> NEW!</PrimaryText>}
                </p>
              </li>
            ))}
          </ul>
        </SkillsGroup>
      </Section>
    </Content>
  </>
)

export default About
