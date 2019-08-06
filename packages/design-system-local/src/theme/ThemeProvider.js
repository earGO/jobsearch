import React from 'react'
import PropTypes from 'prop-types'
import styled, { ThemeProvider as StyledThemeProvider, createGlobalStyle } from 'styled-components'
// import { Normalize } from 'styled-normalize'
import baseTheme from '.'

export const Base = styled.div`
  width: 100%;
  height: 100%;
`

const ThemeProvider = ({ customBreakpoints, ...props }) => {
  const breakpoints = customBreakpoints || baseTheme.breakpoints
  const theme = {
    ...baseTheme,
    ...props.theme,
    breakpoints,
  }

  const GlobalStyle = createGlobalStyle`
    html,
    body {
      font-family: ${props.theme.font.main};
      font-size: ${props.theme.fontSizes[1]}px;
      line-height: 1.4;
      height: 100%;
    }

    * {
        box-sizing: border-box;
      }
`

  return (
    <React.Fragment>
      <GlobalStyle />
      <StyledThemeProvider theme={theme}>
        <Base {...props} />
      </StyledThemeProvider>
    </React.Fragment>
  )
}

ThemeProvider.propTypes = {
  /**
   * Массив значений в пикселях для кастмизации дефолтных брейкпоинтов
   */
  customBreakpoints: PropTypes.arrayOf(PropTypes.number),
}

export default ThemeProvider
