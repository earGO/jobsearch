import {rootSaga} from './sagas'
import reducers, {initialState} from './reducers'
import {namespace} from './types'
import {auth as service} from '../../../import'

export const baseRoute = '/login'

export default {
	id: namespace,
	reducerMap: {
		[service.name]: service.reducer,
		[namespace]: (state = initialState, action) => ({
			...state,
			...(reducers[action.type] && reducers[action.type](state, action))
		})
	},
	sagas: [rootSaga]
}
