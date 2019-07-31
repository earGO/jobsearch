import {success} from 'redux-saga-requests'
import {put, call, all, fork, takeEvery} from 'redux-saga/effects'
import * as actions from './actions'
import * as types from './types'
import {storageUtils} from '../../../import'
import {auth as authService} from '../../../import'

const {checkToken, putTokens, removeTokens} = storageUtils

export function* loginOnAuth(action) {
	const {
		data: {token, refreshToken} = {
			token: null,
			refreshToken: null
		}
	} = action || {data: ''}
	if (token && refreshToken) {
		yield call(putTokens, {
			token,
			refreshToken
		})
		yield put(actions.login())
	}
}

export function* watchAuth() {
	yield takeEvery(success(authService.types.AUTH), loginOnAuth)
}

export function* watchLogout() {
	yield takeEvery(types.LOGOUT, removeTokens)
}

function* loginOnLoad() {
	if (checkToken()) {
		yield put(actions.login())
	}
}

export function* rootSaga() {
	yield loginOnLoad()
	yield all([fork(watchAuth), fork(watchLogout)])
}
