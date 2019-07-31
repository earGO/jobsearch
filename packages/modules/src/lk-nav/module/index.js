import {namespace} from './types'
import {personalNavigation} from '../../../import'
import reducers, {initialState} from './reducers'

import sagas from './sagas'

export default {
	id: namespace,
	reducerMap: {
		[personalNavigation.name]: personalNavigation.reducer,
		[namespace]: (state = initialState, action) => ({
			...state,
			...(reducers[action.type] && reducers[action.type](state, action))
		})
	},
	sagas: [sagas],
	initialActions: [personalNavigation.actions.loadTabs()]
}
