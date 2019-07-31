import {namespace} from './types'
import {lk as service} from '../../../import'
import reducers, {initialState} from './reducers'

import sagas from './sagas'

export const baseRoute = '/lk'

export default {
	id: namespace,
	reducerMap: {
		[service.name]: service.reducer,
		[namespace]: (state = initialState, action) => ({
			...state,
			...(reducers[action.type] && reducers[action.type](state, action))
		})
	},
	sagas: [sagas],
	initialActions: [service.actions.loadProjects()]
}
