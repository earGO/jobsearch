import { createRequestInstance, watchRequests, requestsPromiseMiddleware, sendRequest } from 'redux-saga-requests'
import { createDriver } from 'redux-saga-requests-fetch'
import { call, put } from 'redux-saga/effects'

import { getTokens, checkToken, checkIfUnauthorized, putTokens } from '../utils/storage'
import { actions as authActions } from '../services/auth'
import { actions as loginActions } from '../components/login/login-duck'

export function* onRequestSaga(request) {
  const { token } = yield call(getTokens)

  const setAuthToken = request => ({
    ...request,
    headers: {
      ...request.headers,
      'X-Authorization': `Bearer ${token}`,
    },
  })

  if (token) {
    return Array.isArray(request) ? request.map(setAuthToken) : setAuthToken(request)
  } else {
    return request
  }
}

export function* onErrorSaga(error, action) {
  const tokensExists = yield call(checkToken)
  if (!tokensExists) {
    yield put(loginActions.logout())
  } else {
    const errorIsUnauthorized = yield call(checkIfUnauthorized, error)
    if (errorIsUnauthorized) {
      const { token, refreshToken } = yield call(getTokens)

      const { response, error: tokenError } = yield call(sendRequest, authActions.refresh(token, refreshToken), {
        silent: true,
      })

      if (response && response.data) {
        const { token, refreshToken, tokenType } = response.data
        yield call(putTokens, { token, refreshToken, tokenType })
        return yield call(sendRequest, action, { silent: true })
      } else {
        yield put(loginActions.logout())
        return { error: tokenError }
      }
    } else return { error }
  }
  return { error }
}

export function* requestSaga() {
  yield createRequestInstance({
    driver: createDriver(window.fetch),
    onRequest: onRequestSaga,
    onError: onErrorSaga,
  })
  yield watchRequests()
}

export default {
  id: 'request',
  sagas: [requestSaga],
  middlewares: [
    requestsPromiseMiddleware({
      auto: true,
    }),
  ],
}
