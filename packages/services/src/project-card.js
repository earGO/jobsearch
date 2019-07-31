import {success} from 'redux-saga-requests'

const name = 'project-card'

const api = 'http://localhost:3421/'

/* Types */

const LOAD_PROJECT = `${name}/LOAD_PROJECT`
const LOAD_TABS = `${name}/LOAD_TABS`

const LOAD_SECTIONS = `${name}/LOAD_SECTIONS`

const LOAD_FIELDS = `${name}/LOAD_FIELDS`

export const types = {
	LOAD_PROJECT,
	LOAD_SECTIONS,
	LOAD_FIELDS,
	LOAD_TABS
}

/* Endpoints */
const project = api + 'project/'
const tabs = api + 'tabs/'
const sections = api + 'sections/'
const fields = api + 'fields/'

const endpoints = {
	project,
	tabs,
	sections,
	fields
}

/* Action creators */
const actions = {
	loadProject() {
		return {
			type: types.LOAD_PROJECT,
			payload: {
				request: {
					url: `${endpoints.project}`
				}
			}
		}
	},
	loadSections(tabId) {
		return {
			type: types.LOAD_SECTIONS,
			payload: {
				request: {
					url: `${endpoints.sections}` + `${tabId}`
				}
			}
		}
	},
	loadFields(sectionId) {
		return {
			type: types.LOAD_FIELDS,
			payload: {
				request: {
					url: `${endpoints.fields}` + `${sectionId}`
				}
			}
		}
	},
	loadTabs(projectId) {
		return {
			type: types.LOAD_TABS,
			payload: {
				request: {
					url: `${endpoints.tabs}` + `${projectId}`
				}
			}
		}
	}
}

function projectCardReducer(state = {}, {type, payload}) {
	switch (type) {
		case success(types.LOAD_PROJECT):
			return {
				...state,
				project: payload.data
			}
		case success(types.LOAD_TABS):
			return {
				...state,
				tabs: payload.data.data
			}
		case success(types.LOAD_SECTIONS):
			return {
				...state,
				sections: payload.data.data
			}
		case success(types.LOAD_FIELDS):
			return {
				...state,
				fields: payload.data.data
			}
		default:
			return state
	}
}

export default {
	projectCardReducer,
	types,
	actions,
	name,
	api,
	endpoints
}
