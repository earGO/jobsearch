import { all, put, select, takeEvery } from 'redux-saga/effects'
import { success } from 'redux-saga-requests'

import * as types from './types'
import * as selectors from './selectors'
import * as nsiService from '../../../services/nsi-new'

const report = function*({ payload }) {
  // TODO: Rewrite to ajax
  yield (global.location = `${nsiService.api}/reports/excel/nickDict/${payload.nick}`)
}

const loadCurrenCatalog = function*() {
  const nick = yield select(selectors.currentCatalogName)

  if (nick) {
    const response = yield put(nsiService.actions.loadElements(nick))

    const responseData = yield response
    const { dict } = responseData.payload.data[0] || {}

    const fields = Object.values(dict.metaAttributes).reduce((acc, attr) => {
      if (attr.nickDictLink) {
        acc.push(attr.nickDictLink)
      }

      return acc
    }, [])

    if (fields.length) {
      // Download dependent dictonaries for linked fields
      yield put(nsiService.actions.loadElements(fields))
    }
  }
}

const presistUserSettings = function*() {
  const userSettings = yield select(selectors.userSettings)

  global.localStorage.setItem(types.namespace, JSON.stringify(userSettings))
}

const getUserSettings = function*() {}

export default function*() {
  yield all([
    takeEvery(types.SET_CURRENT_CATALOG, loadCurrenCatalog),
    takeEvery(types.PRESIST_USER_SETTINGS_TO_LOCAL_STORAGE, presistUserSettings),
    takeEvery(types.GET_USER_SETTINGS_FROM_LOCAL_STORAGE, getUserSettings),
    takeEvery(nsiService.types.MAKE_REPORT, report),
    takeEvery(success(nsiService.types.SAVE_DICT), loadCurrenCatalog),
  ])
}
