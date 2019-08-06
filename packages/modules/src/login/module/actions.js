import * as types from './types'
import {auth as service} from '../../../import'

export const login = () => {
	return {type: types.LOGIN}
}

export const logout = () => {
	return {type: types.LOGOUT}
}

export const auth = service.actions.auth
