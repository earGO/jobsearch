import { success } from 'redux-saga-requests'
import { createSelector } from 'reselect'
import { put, call, all, fork, takeEvery } from 'redux-saga/effects'

import * as authService from '../../services/auth'
import { checkToken, putTokens, removeTokens } from '../../utils/storage'

const name = 'login'

const baseRoute = '/login'

const initialState = {
  isAuth: false,
}
const LOGIN = `${name}/LOGIN`
const LOGOUT = `${name}/LOGOUT`

const types = {
  LOGIN,
  LOGOUT,
}

/** Action creators */
const actions = {
  login: () => ({
    type: LOGIN,
  }),
  logout: () => ({
    type: LOGOUT,
  }),
  auth: authService.actions.auth,
}

/** Selectors */
const authServiceSelector = state => state[authService.name] || []
const stateSelector = state => state[name] || []

const authError = createSelector(
  authServiceSelector,
  state => state.error,
)

const authLoading = createSelector(
  authServiceSelector,
  state => !!state.pending,
)

const loginStatus = createSelector(
  stateSelector,
  state => state.isAuth,
)

const selectors = {
  authError,
  authLoading,
  loginStatus,
}

const reducers = {
  [types.LOGIN]: state => ({
    ...state,
    isAuth: true,
  }),
  [types.LOGOUT]: state => ({
    ...state,
    isAuth: false,
  }),
}

export function* loginOnAuth(action) {
  const {
    data: { token, refreshToken } = {
      token: null,
      refreshToken: null,
    },
  } = action || { data: '' }
  if (token && refreshToken) {
    yield call(putTokens, {
      token,
      refreshToken,
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

export { name, baseRoute, selectors, types, actions }

export default {
  id: name,
  reducerMap: {
    [authService.name]: authService.default,
    [name]: (state = initialState, action) => ({
      ...state,
      ...(reducers[action.type] && reducers[action.type](state, action)),
    }),
  },
  sagas: [rootSaga],
}
