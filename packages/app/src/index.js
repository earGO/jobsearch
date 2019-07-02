import './assets/fonts/PTSans/font.css'
import '@ursip/design-system/build/index.css'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@ursip/design-system'
import Normalize from 'react-normalize'
import GlobalStyle from './GlobalStyle'

import store from './store'
import theme from './theme'
import Routes from './routes'

render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Normalize />
      <Routes history={store.history} />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'),
)
