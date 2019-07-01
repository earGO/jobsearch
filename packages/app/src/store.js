import { createStore } from 'redux-dynamic-modules'
import { routerMiddleware, connectRouter } from 'connected-react-router'
import { getSagaExtension } from 'redux-dynamic-modules-saga'
import { createBrowserHistory } from 'history'
import requestModule from './services/request'
import loginModule from './components/login/login-duck'

const history = createBrowserHistory()

const modules = [
  {
    id: 'initial',
    reducerMap: {
      router: connectRouter(history),
    },
    middlewares: [routerMiddleware(history)],
  },
  requestModule,
  loginModule,
]

const store = createStore({}, [], [getSagaExtension()], modules)

store.history = history

export default store
