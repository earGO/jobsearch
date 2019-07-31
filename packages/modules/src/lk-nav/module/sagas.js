import {all, put, takeEvery, takeLatest, select} from 'redux-saga/effects'
import {success} from 'redux-saga-requests'

import * as types from './types'
import * as actions from './actions'
import * as selectors from './selectors'
import {personalNavigation} from '../../../import'

/* It preselects a tab first time project loaded */
const preSelectTab = function*() {
	const TABS = yield select(selectors.tabsSelector)
	const selectedTab = yield select(selectors.selectedTabsSelector)
	yield put(actions.preselectOption(TABS, selectedTab))
}

export default function*() {
	yield all([
		takeLatest(success(personalNavigation.types.LOAD_TABS), preSelectTab)
	])
}
