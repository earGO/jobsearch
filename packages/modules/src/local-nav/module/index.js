import {namespace} from './types'
import {localNavigation} from '../../../import'
import reducers, {initialState} from './reducers'

import sagas from './sagas'

export default {
	id: namespace,
	reducerMap: {
		[localNavigation.name]: localNavigation.reducer,
		[namespace]: (state = initialState, action) => ({
			...state,
			...(reducers[action.type] && reducers[action.type](state, action))
		})
	},
	sagas: [sagas],
	initialActions: [localNavigation.actions.loadTabs()]
}
