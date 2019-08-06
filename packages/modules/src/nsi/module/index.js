import {namespace} from './types'
import reducers, {initialState} from './reducers'
import sagas from './sagas'

import * as actions from './actions'
import {nsi as nsiNew} from '../../../import'

export const baseRoute = '/nsi'

export default {
	id: namespace,
	reducerMap: {
		[nsiNew.name]: nsiNew.reducer,
		[namespace]: (state = initialState, action) => ({
			...state,
			...(reducers[action.type] && reducers[action.type](state, action))
		})
	},
	sagas: [sagas],
	initialActions: [
		nsiNew.actions.loadAllCatalogs(),
		actions.getUserSettingsFromLocalStorage()
	]
}
