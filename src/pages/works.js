import React, { Fragment } from 'react'
import styled from '@emotion/styled'

import SEO from '../components/seo'
import { Content } from '../components/common'
import WorksGrid from '../components/WorksGrid'

import imgStratus from '../images/stratus.png'
import img630 from '../images/630.png'
import imgBg from '../images/bg.png'

const Heading = styled.h1`
  font-size: 24px;
  margin-bottom: 50px;
  text-align: center;
`

const works = [
  { name: 'Status Gas', img: imgStratus, link: 'http://stratusgas.com/' },
  { name: '6:30 Partners', img: img630, link: 'http://6-30partners.com/' },
  { name: 'Brightgreen', img: imgBg, link: 'https://brightgreen.com/' },
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
