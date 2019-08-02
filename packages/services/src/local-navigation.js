import {requestsReducer} from 'redux-saga-requests'

const name = '@bim-service-local-navigation'

const api = 'http://192.168.5.90:3421/personal_nav'

/* Types */

const LOAD_TABS = `${name}/LOAD_TABS`

export const types = {
	LOAD_TABS
}

/* Action creators */
const actions = {
	loadTabs() {
		return {
			type: types.LOAD_TABS,
			payload: {
				request: {
					url: `${api}`
				}
			}
		}
	}
}

const reducer = requestsReducer({actionType: types.LOAD_TABS})

export default {
	reducer,
	types,
	actions,
	name,
	api
}
