import {requestsReducer} from 'redux-saga-requests'
import pkg from '../package.json'

const name = 'auth-api'

const api = pkg.ru_ursip.services['ursip-auth-service']

/* Types */
const AUTH = `${name}/AUTH`
const REFRESH = `${name}/REFRESH`

const types = {
	AUTH,
	REFRESH
}

const actions = {
	auth: (login, password) => {
		return {
			type: AUTH,
			request: {
				url: `${api}`,
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({username: login, password})
			}
		}
	},
	refresh: (currentToken, refreshToken) => {
		return {
			type: REFRESH,
			request: {
				url: '/auth/refreshtoken',
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				}
			},
			body: JSON.stringify({currentToken, refreshToken})
		}
	}
}
const reducer = requestsReducer({
	actionType: AUTH
})

export default {reducer, name, types, actions, api}
