import React from 'react'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTwitter,
  faGithub,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faDownload } from '@fortawesome/free-solid-svg-icons'
import Typist from 'react-typist'
import 'react-typist/dist/Typist.css'
import { Link } from 'gatsby'

import SEO from '../components/seo'
import { Content, PrimaryText } from '../components/common'
import mq from '../utils/breakpoints'

const CustomContent = styled(Content)`
  display: flex;
  align-items: center;

  a {
    color: ${(props) => props.theme.colors.primary};
  }
`

const TypistText = styled.h1`
  font-size: 36px;
  font-weight: 900;
  margin: 0;
  ${mq[1]} {
    font-size: 48px;
  }

  .Cursor {
    font-weight: 400;
  }
`

const Subtext = styled.h2`
  font-size: 24px;
  font-weight: 400;
  margin: 10px 0 30px 0;
`

const ContactLink = styled.a`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  span {
    font-size: 20px;
    margin-right: 1rem;
  }
`
const ParagraphContainer = styled.div`
  margin-top: 30px;

  p {
    &:last-child {
      margin-bottom: 0;
    }
  }
`

const ButtonLink = styled(Link)`
  max-width: 100%;

  button {
    color: ${(props) => props.theme.colors.mainBackground};
    background-color: ${(props) => props.theme.colors.primary};
    height: 30px;
    width: 150px;
    max-width: 100%;
    font-size: 10px;
    font-weight: 700;
    text-align: center;
    border: 0;
    display: inline-block;
    border-radius: 5px;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    ${mq[1]} {
      font-size: 12px;
      width: 170px;
    }

    &:hover {
      opacity: 0.6;
    }
  }
`

const Icon = styled(FontAwesomeIcon)`
  margin-left: 1rem;
`

const Contact = () => (
  <>
    <SEO title="Contact" />
    <CustomContent>
      <div>
        <TypistText>
          <Typist cursor={{ hideWhenDone: true, hideWhenDoneDelay: 0 }}>
            Awesome! You made a great decision!
            <Typist.Backspace count={35} delay={800} />
            Let&apos;s have a chat!
          </Typist>
        </TypistText>
        <Subtext>Get in touch with me through these contacts:</Subtext>

        <ContactLink href="mailto:gbgabiola@gmail.com">
          <span>
            <FontAwesomeIcon icon={faEnvelope} />
          </span>
          gbgabiola@gmail.com
        </ContactLink>
        <ContactLink href="https://www.linkedin.com/in/gbgabiola/">
          <span>
            <FontAwesomeIcon icon={faLinkedin} />
          </span>
          gbgabiola
        </ContactLink>
        <ContactLink href="https://twitter.com/gbgabiola">
          <span>
            <FontAwesomeIcon icon={faTwitter} />
          </span>
          @gbgabiola
        </ContactLink>
        <ContactLink href="https://github.com/gbgabiola">
          <span>
            <FontAwesomeIcon icon={faGithub} />
          </span>
          gbgabiola
        </ContactLink>

        <ParagraphContainer>
          <p>
            Hey! I am very grateful that you came to this page for my contact
            information. I am available and currently accepting offers for
            full-time/part-time remote postions as a Front-End Developer. Let me
            know if you’re interested, I will be more than happy to help you!
          </p>
          <p>
            {`Know more `}
            <Link to="/about">about</Link>
            {` me`}
            {`.`}
          </p>
          <p>Thank you,</p>
          <p>
            <strong>
              <PrimaryText>Genesis Gabiola</PrimaryText>
              {` - Front-End Developer`}
            </strong>
          </p>
          <ButtonLink to="/contact">
            <button type="button">
              DOWNLOAD RESUME!
              <Icon icon={faDownload} />
            </button>
          </ButtonLink>
        </ParagraphContainer>
      </div>
    </CustomContent>
  </>
)

export default Contact
