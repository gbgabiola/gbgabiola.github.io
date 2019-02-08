import React from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

import { PrimaryText } from './common'
import mq from '../utils/breakpoints'

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 30px;
  ${mq[1]} {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 15px;
  }
`

const GridItem = styled.div`
  height: 250px;
  background-image: url(${props => props.img});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top left;
  position: relative;
  border: 1px solid ${props => props.theme.colors.base};
  padding-top: 250px;
  margin-bottom: 3rem;
  ${mq[1]} {
    padding-top: 0;
    margin-bottom: 0;
  }

  & > div {
    text-align: center;
    padding-top: 1rem;
    ${mq[1]} {
      background: rgba(0, 0, 0, 0.4);
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      height: 100%;
      width: 100%;
      opacity: 0;
      transition: all 0.2s ease-in-out;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    a {
      color: ${props => props.theme.colors.primary};
      ${mq[1]} {
        color: ${props => props.theme.colors.mainBackground};
        text-decoration: none;
        font-weight: 600;
        font-size: 18px;
        background-color: ${props => props.theme.colors.primary};
        padding: 0 1.5em;
        line-height: 2.5em;
        text-align: center;
        border-radius: 5px;
      }

      &:hover {
        ${mq[1]} {
          opacity: 0.6;
        }
      }
    }
  }

  &:hover > div {
    opacity: 1;
  }
`

const InfoGrid = styled.div`
  height: 250px;
  background-color: ${props => props.theme.colors.mainBackground};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  a {
    color: ${props => props.theme.colors.primary};
  }
`

const infoStyles = {
  head: css`
    margin: 0;
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 0.5em;
  `,
  sub: css`
    margin: 0;
    font-size: 16px;
  `,
}

const WorksGrid = ({ works }) => (
  <Grid>
    {works.map(work => (
      <GridItem key={work.name} img={work.img}>
        <div>
          <a href={work.link}>
            <span>{work.name}</span>
          </a>
        </div>
      </GridItem>
    ))}
    <InfoGrid>
      <p css={infoStyles.head}>
        <PrimaryText>You like it?</PrimaryText>
      </p>
      <p css={infoStyles.sub}>I got some more stuff in my sleeves.</p>
      <p css={infoStyles.sub}>
        {`Want to know more? `}
        <Link to="/contact">Let’s talk</Link>
        {` ;)`}
      </p>
    </InfoGrid>
  </Grid>
)

export default WorksGrid
