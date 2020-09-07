import React from 'react'
import styled from '@emotion/styled'

import { PrimaryText } from './common'

const Footer = styled.footer`
  min-height: 60px;
  padding: 0 ${(props) => props.theme.contentPadding};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  p {
    margin: 0;
  }

  a {
    color: ${(props) => props.theme.colors.primary};
  }
`

const MainFooter = () => (
  <Footer>
    <p>
      {`Made with `}
      <span role="img" aria-label="heart">
        ❤️
      </span>
      {` by `}
      <PrimaryText>Genesis Gabiola</PrimaryText>
      {` using `}
      <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">
        React
      </a>
      {` and `}
      <a
        href="https://www.gatsbyjs.org/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Gatsby
      </a>
      {`.`}
    </p>
  </Footer>
)

export default MainFooter
