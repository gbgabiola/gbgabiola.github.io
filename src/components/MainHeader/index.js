import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { Scroll } from 'react-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import Avatar from '../Avatar'
import Navigation from './Navigation'
import ThemeSwitch from '../ThemeSwitch'
import mq from '../../utils/breakpoints'

const Header = styled.header`
  height: ${props => (props.isScrolled ? '70px' : '100px')};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 ${props => props.theme.contentPadding};
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  right: 0;
  background-color: ${props => props.theme.colors.mainBackground};
  box-shadow: ${props =>
    props.isScrolled && `0px 0px 10px ${props.theme.colors.headerShadow}`};
  transition: all 0.3s ease-in-out;

  > div {
    width: 1200px;
    max-width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`

const NavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Hamburger = styled.button`
  font-size: 24px;
  background: transparent;
  border: none;
  padding: 0 15px;
  color: ${props => props.theme.colors.highlighted};
  order: 2;
  ${mq[1]} {
    display: none;
  }
`

const useNav = () => {
  const [isNavVisible, setIsNavVisible] = useState(false)

  const toggleNavigation = () => setIsNavVisible(!isNavVisible)

  return { isNavVisible, toggleNavigation }
}

const MainHeader = ({ onChangeTheme, theme }) => {
  const { isNavVisible, toggleNavigation } = useNav()

  return (
    <Scroll
      render={({ y }) => {
        const isScrolled = y > 0
        const avatarDimension = isScrolled ? '40px' : '60px'

        return (
          <Header isScrolled={isScrolled}>
            <div>
              <Link to="/">
                <Avatar width={avatarDimension} height={avatarDimension} />
              </Link>
              <NavWrapper>
                <Navigation
                  isScrolled={isScrolled}
                  isNavVisible={isNavVisible}
                  toggleNavigation={toggleNavigation}
                />
                <Hamburger onClick={toggleNavigation}>
                  <FontAwesomeIcon icon={faBars} />
                </Hamburger>
                <ThemeSwitch onChangeTheme={onChangeTheme} theme={theme} />
              </NavWrapper>
            </div>
          </Header>
        )
      }}
    />
  )
}
// }

export default MainHeader
