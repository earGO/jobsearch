import * as R from 'ramda'

export const saveState = (key, state) => {
	localStorage.setItem(key, JSON.stringify(state))
}

export const getState = key => {
	return localStorage.getItem(key) && JSON.parse(localStorage.getItem(key))
}

export const checkToken = () => {
	if (localStorage.getItem('token') !== null) {
		return true
	} else {
		return false
	}
}

export const putTokens = ({token, refreshToken}) => {
	localStorage.setItem('token', token)
	localStorage.setItem('refreshToken', refreshToken)
}

export const getTokens = () => ({
	token: localStorage.getItem('token'),
	refreshToken: localStorage.getItem('refreshToken')
})

export const removeTokens = () => {
	localStorage.removeItem('token')
	localStorage.removeItem('refreshToken')
}

export const checkIfUnauthorized = error =>
	error &&
	R.hasPath(['data', 'message'], error) &&
	error.data.message.includes('401')

export default {
	saveState,
	getState,
	checkToken,
	putTokens,
	getTokens,
	removeTokens,
	checkIfUnauthorized
}
