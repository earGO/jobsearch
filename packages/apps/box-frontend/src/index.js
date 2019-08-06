import './assets/fonts/PTSans/font.css'
import './design-system-crouch/index.css'

import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {ThemeProvider} from './import'
import Normalize from 'react-normalize'

import store from './store'
import theme from './theme'
import DynamicRoutes from './DynamicRoutes'
import Routes from './routes'

render(
	<Provider store={store}>
		<ThemeProvider theme={theme}>
			<Normalize />
			<DynamicRoutes />
		</ThemeProvider>
	</Provider>,
	document.getElementById('root')
)
