import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Global, ThemeProvider } from '@emotion/react'
import styled from '@emotion/styled'
import { Scroll } from 'react-fns'

import MainHeader from '../MainHeader'
import MainFooter from '../MainFooter'
import globalStyles from './styles'
import themes from './theme'

const Wrapper = styled.div`
  min-height: 100vh;
  background-color: ${(props) => props.theme.colors.mainBackground};
  padding-top: ${(props) => (props.isScrolled ? '70px' : '100px')};
  color: ${(props) => props.theme.colors.base};
`

const useThemeSwitcher = () => {
  const [theme, setTheme] = useState('dark')

  const onChangeTheme = (selectedTheme) => {
    if (typeof window !== `undefined`) {
      window.localStorage.setItem('theme', selectedTheme)
      setTheme(selectedTheme)
    }
  }

  const useThemeEffect = () => {
    useEffect(
      () => setTheme(window.localStorage.getItem('theme') || 'dark'),
      []
    )
  }

  return { theme, onChangeTheme, useThemeEffect }
}

const Layout = ({ children }) => {
  const { theme, onChangeTheme, useThemeEffect } = useThemeSwitcher()
  useThemeEffect()
  return (
    <ThemeProvider theme={themes[theme]}>
      <>
        <Global styles={globalStyles} />
        <Scroll
          render={({ y }) => {
            const isScrolled = y > 0
            return (
              <Wrapper isScrolled={isScrolled}>
                <MainHeader onChangeTheme={onChangeTheme} theme={theme} />
                <main>{children}</main>
                <MainFooter />
              </Wrapper>
            )
          }}
        />
      </>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
