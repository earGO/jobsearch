import {createSelector} from 'reselect'
import {auth as authService} from '../../../import'

import * as types from './types'

export const authServiceSelector = state => state[authService.name] || []
export const stateSelector = state => state[types.namespace] || []

export const authError = createSelector(
	authServiceSelector,
	state => state.error
)

export const authLoading = createSelector(
	authServiceSelector,
	state => !!state.pending
)

export const loginStatus = createSelector(
	stateSelector,
	state => state.isAuth
)

export const selectors = {
	authError,
	authLoading,
	loginStatus
}
