import { requestsReducer } from 'redux-saga-requests'

const name = 'auth-api'

/* Types */
const AUTH = `${name}/AUTH`
const REFRESH = `${name}/REFRESH`

const types = {
  AUTH,
  REFRESH,
}

const actions = {
  auth: (login, password) => {
    return {
      type: AUTH,
      request: {
        url: 'http://develop.ursip.local/api/access-control/v1/login',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: login, password }),
      },
    }
  },
  refresh: (currentToken, refreshToken) => {
    return {
      type: REFRESH,
      request: {
        url: '/auth/refreshtoken',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
      body: JSON.stringify({ currentToken, refreshToken }),
    }
  },
}

export default requestsReducer({
  actionType: AUTH,
})

export { name, types, actions }