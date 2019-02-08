import React from 'react'
import { css } from '@emotion/core'

import mq from '../utils/breakpoints'

const styles = ({ isSwitched }) => ({
  switch: css`
    position: relative;
    width: 80px;
    height: 20px;
    background-color: ${isSwitched ? '#ffffff' : '#1C1C1C'};
    border-radius: 10px;
    padding: 0;
    border: 0;
    box-shadow: none;
    outline: 0;
    order: 1;
    transition: all 0.2s ease-in-out;
    ${mq[1]} {
      margin-left: 30px;
      order: 3;
    }
  `,
  slider: css`
    position: absolute;
    top: 2px;
    left: ${isSwitched ? '40px' : '2px'};
    width: 38px;
    height: 16px;
    background-color: ${isSwitched ? '#1C1C1C' : '#ffffff'};
    border-radius: 8px;
    text-align: center;
    font-size: 12px;
    line-height: 16px;
    color: ${isSwitched ? '#ffffff' : '#1C1C1C'};
    transition: all 0.2s ease-in-out;
  `,
})

const ThemeSwitch = ({ onChangeTheme, theme }) => {
  const isLight = theme === 'light'
  const switchStyles = styles({ isSwitched: !isLight })

  return (
    <button
      css={switchStyles.switch}
      onClick={() => onChangeTheme(isLight ? 'dark' : 'light')}
      type="button"
    >
      <div css={switchStyles.slider}>{theme}</div>
    </button>
  )
}

export default ThemeSwitch
