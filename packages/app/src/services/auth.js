import { requestsReducer } from 'redux-saga-requests'

const name = 'auth-api'
const api =
  process.env.NODE_ENV === 'development'
    ? 'http://bim-dev.ursip.local/ws-access-control/v1'
    : '/ws-access-control/v1'

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
        url: api + '/login',
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
        url: api + '/refreshtoken',
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
