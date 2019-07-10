import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { selectors } from '../login/login-duck'

const PrivateRoute = ({ component: Component, isAuth, ...rest }) => {
  return <Route {...rest} render={props => (isAuth ? <Component {...props} /> : <Redirect to={'/login'} />)} />
}

PrivateRoute.propTypes = {
  isAuth: PropTypes.bool,
  login: PropTypes.func,
}

export default connect(
  state => ({
    isAuth: selectors.loginStatus(state),
  }),
  {},
)(PrivateRoute)
