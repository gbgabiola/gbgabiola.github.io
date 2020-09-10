import React, { Fragment } from 'react'
import styled from '@emotion/styled'

import SEO from '../components/seo'
import { Content } from '../components/common'
import WorksGrid from '../components/WorksGrid'

import bridgeLedger from '../images/bridgeledger.png'
import TechNews from '../images/technews.png'
import tinderPet from '../images/tinderpet.png'

const Heading = styled.h1`
  font-size: 24px;
  margin-bottom: 50px;
  text-align: center;
`

const works = [
  {
    name: 'bridgeLedger',
    img: bridgeLedger,
    link: 'https://bridgeledger.netlify.com/',
  },
  { name: 'TechNews', img: TechNews, link: 'https://tech-news.netlify.com/' },
  { name: 'tinderPet', img: tinderPet, link: 'https://tinderpet.netlify.com/' },
]

const Works = () => (
  <Fragment>
    <SEO title="Works" />
    <Content>
      <Heading>Here are some of my recent projects!</Heading>
      <WorksGrid works={works} />
    </Content>
  </Fragment>
)

export default Works
