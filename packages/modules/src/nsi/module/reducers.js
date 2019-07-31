import {success, error} from 'redux-saga-requests'

import {nsi} from '../../../import'
import * as types from './types'

const nsiService = nsi.types

const DEFAULT_SORT = {
	column: null,
	order: 'desc'
}

export const initialState = {
	loading: false,
	catalogsSearchQuery: '',
	elementsSearchQuery: '',
	catalogsSideWidth: 350,
	sort: DEFAULT_SORT,
	currentCatalogName: null,
	loadingElements: false,
	currentElement: null,
	elementsModalVisible: false,
	expandedRowKeys: [],
	userSettings: JSON.parse(global.localStorage.getItem(types.namespace)) || {}
}

export default {
	[nsiService.LOAD_DICTS]: () => ({
		loading: true
	}),
	[success(nsiService.LOAD_DICTS)]: () => ({
		loading: false
	}),
	[error(nsiService.LOAD_DICTS)]: () => ({
		loading: false
	}),
	[nsiService.LOAD_DICT_ELEMENTS]: () => ({
		loadingElements: true
	}),
	[success(nsiService.LOAD_DICT_ELEMENTS)]: () => ({
		loadingElements: false
	}),
	[error(nsiService.LOAD_DICT_ELEMENTS)]: () => ({
		loadingElements: false
	}),
	[types.SEARCH_CATALOGS]: (_, {payload}) => ({
		catalogsSearchQuery: String(payload.query).toLowerCase()
	}),
	[types.SEARCH_ELEMENTS]: (_, {payload}) => ({
		elementsSearchQuery: String(payload.query).toLowerCase()
	}),
	[types.SET_SIDE_WIDTH]: (_, {payload}) => ({
		catalogsSideWidth: parseInt(payload.width)
	}),
	[types.SORT]: (state, {payload}) => ({
		sort:
			payload.order === state.sort.order &&
			payload.column === state.sort.column
				? DEFAULT_SORT
				: payload
	}),
	[types.SET_CURRENT_CATALOG]: (_, {payload}) => ({
		currentCatalogName: payload.nick,
		sort: DEFAULT_SORT,
		elementsSearchQuery: ''
	}),
	[types.SHOW_ELEMENTS_FORM]: (_, {payload}) => ({
		currentElement: payload.row,
		elementsModalVisible: true
	}),
	[types.HIDE_ELEMENTS_FORM]: () => ({
		currentElement: null,
		elementsModalVisible: false
	}),
	[types.SET_ELEMENTS_LOADING]: (_, {payload}) => ({
		loadingElements: Boolean(payload.isLoading)
	}),

	[types.SET_USER_SETTINGS]: (state, {payload}) => ({
		userSettings: {
			...state.userSettings,
			[payload.catalogName]: {
				...state.userSettings[payload.catalogName],
				[payload.attributeName]: payload.width
			}
		}
	}),
	[types.SET_USER_SETTINGS_FROM_LOCAL_STORAGE]: (_, {payload}) => ({
		userSettings: payload.userSettings
	})
}
