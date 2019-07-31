import {all, put, select, takeEvery} from 'redux-saga/effects'
import {success} from 'redux-saga-requests'

import * as types from './types'
import * as actions from './actions'
import * as selectors from './selectors'

import {nsi as nsiNew} from '../../../import'

const report = function*({payload}) {
	global.location = `${nsiNew.api}/reports/excel/nickDict/${payload.nick}`
}

const loadCurrenCatalog = function*() {
	const nick = yield select(selectors.currentCatalogName)

	if (nick) {
		yield put(nsiNew.actions.loadElements(nick))
	}
}

const presistUserSettings = function*() {
	const userSettings = yield select(selectors.userSettings)

	global.localStorage.setItem(types.namespace, JSON.stringify(userSettings))
}

const getUserSettings = function*() {
	// const settings = console.log('getUserSettings', settings)
}

export default function*() {
	yield all([
		takeEvery(types.SET_CURRENT_CATALOG, loadCurrenCatalog),
		takeEvery(
			types.PRESIST_USER_SETTINGS_TO_LOCAL_STORAGE,
			presistUserSettings
		),
		takeEvery(types.GET_USER_SETTINGS_FROM_LOCAL_STORAGE, getUserSettings),
		takeEvery(nsiNew.types.MAKE_REPORT, report),
		takeEvery(success(nsiNew.types.SAVE_DICT), loadCurrenCatalog)
	])
}
