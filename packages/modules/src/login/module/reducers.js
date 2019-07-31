import * as types from './types'

export const initialState = {
	isAuth: false
}

export default {
	[types.LOGIN]: state => ({
		...state,
		isAuth: true
	}),
	[types.LOGOUT]: state => ({
		...state,
		isAuth: false
	})
}
