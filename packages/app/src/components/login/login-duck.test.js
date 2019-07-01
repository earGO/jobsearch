import { expectSaga } from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'

import { putTokens } from '../utils/storage'
import { loginOnAuth, actions } from './login-duck'

const mockAction = {
  type: 'auth-api/AUTH_SUCCESS',
  data: {
    token: 'f7a88ea84b064bdfc49e25731adfeecb9bcdfaf8d249a744f0d84e00c4ec84dc',
    refreshToken: 'd83be4cc342026e2d147e17e88bee68ff34840c82981235aded6c41c9e1c9f3a',
    scope: 'api',
  },
  response: {
    data: {
      token: 'f7a88ea84b064bdfc49e25731adfeecb9bcdfaf8d249a744f0d84e00c4ec84dc',
      refreshToken: 'd83be4cc342026e2d147e17e88bee68ff34840c82981235aded6c41c9e1c9f3a',
      scope: 'api',
    },
  },
}

const mockBadAction = {
  type: 'auth-api/AUTH_SUCCESS',
  data: {},
}

it('Should put tokens to localStorage and dispatch login', async () => {
  await expectSaga(loginOnAuth, mockAction)
    .provide([[matchers.call.fn(putTokens)]])
    .put(actions.login())
    .run()
})

it('Should not login if no tokens in action', async () => {
  const response = await expectSaga(loginOnAuth, mockBadAction).run()
  expect(response.effects).toEqual({})
})
