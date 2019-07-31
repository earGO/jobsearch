import {namespace} from './types'
import * as types from './types'
import * as actions from './actions'
import {topNavigation} from '../../../import'
import reducers, {initialState} from './reducers'

import sagas from './sagas'

export default {
	id: namespace,
	reducerMap: {
		[topNavigation.name]: topNavigation.reducer,
		[namespace]: (state = initialState, action) => ({
			...state,
			...(reducers[action.type] && reducers[action.type](state, action))
		})
	},
	sagas: [sagas],
	initialActions: [topNavigation.actions.loadTabs()],
	actions,
	types
}
