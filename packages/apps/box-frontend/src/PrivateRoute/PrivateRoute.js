import React from 'react'
import PropTypes from 'prop-types'
import {Redirect, Route} from 'react-router-dom'
import {useSelector} from 'react-redux'

import {Login} from '../import'

function PrivateRoute({component: Component, ...rest}) {
	const isAuth = useSelector(Login.selectors.loginStatus)
	return (
		<Route
			{...rest}
			render={props =>
				isAuth ? <Component {...props} /> : <Redirect to={'/login'} />
			}
		/>
	)
}

PrivateRoute.propTypes = {
	component: PropTypes.node,
	isAuth: PropTypes.bool,
	login: PropTypes.func
}

export default PrivateRoute
