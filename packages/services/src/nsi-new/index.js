import {success} from 'redux-saga-requests'
import pkg from '../../package.json'
import {capitlizeObjectKeys, dataToEntities} from '../../import'

import catalogJson from './catalog.json'

import elements from './elements.json'
import dict from './dict.json'

const name = 'ursip-nsi-service'
const api = pkg.ru_ursip.services[name]

/* Types */
const LOAD_DICTS = `${name}/LOAD_DICTS`
const LOAD_DICT_ELEMENTS = `${name}/LOAD_DICT_ELEMENTS`
const SAVE_DICT = `${name}/SAVE_DICT`
const SAVE_DICT_ROW = `${name}/SAVE_DICT_ROW`
const MAKE_REPORT = `${name}/MAKE_REPORT`

const types = {
	LOAD_DICTS,
	LOAD_DICT_ELEMENTS,
	SAVE_DICT_ROW,
	SAVE_DICT,
	MAKE_REPORT
}

function shittylize(data) {
	const {attributes, hierarchy, deleted, transfer, ...rest} = data || {}

	return {
		...rest,
		transfer: Number(transfer) || 0,
		context:
			rest.context === true || rest.context === 'SYSTEM'
				? 'SYSTEM'
				: 'COMMON',
		deleted: Number(deleted) || 0,
		hierarchyDict: Number(hierarchy) || 0,
		metaAttrs: (attributes || []).map(
			({link, array, deleted, required, unique, type, ...attr}) => ({
				...attr,
				typeAttr: type,
				nickDictLink: link || null,
				arrayAttr: Number(array) || 0,
				deleted: Number(deleted) || 0,
				required: Number(required) || 0,
				unique: Number(unique) || 0
			})
		)
	}
}

function shittylizeElement(data) {
	const {deleted, values, ...rest} = data || {}

	return {
		...rest,
		deleted: Number(deleted),
		values: Object.values(values || {}).map(
			({deleted, value, nick, ...rest}) => ({
				...rest,
				nickAttr: nick,
				deleted: Number(deleted),
				value: value || null
			})
		)
	}
}

/* Action creators */
export const actions = {
	loadAllCatalogs() {
		return {
			type: LOAD_DICTS,
			payload: {
				request: {
					url: `${api}/nsi/meta/dict`
				}
			},
			meta: {
				mock: requestConfig => {
					return dict
				}
			}
		}
	},
	loadElements(nick) {
		return {
			type: LOAD_DICT_ELEMENTS,
			payload: {
				request: {
					url: `${api}/nsi/dict/${nick}`
				}
			},
			meta: {
				mock: requestConfig => {
					return elements
				}
			}
		}
	},
	metaDictSave(dict) {
		return {
			type: SAVE_DICT,
			payload: {
				request: {
					url: `${api}/nsi/meta/dict/save`,
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(
						capitlizeObjectKeys({
							metaDict: {
								transfer: 0,
								...shittylize(dict)
							}
						})
					)
				}
			}
		}
	},
	saveDictRow(data, nickDict) {
		return {
			type: SAVE_DICT_ROW,
			payload: {
				request: {
					url: `${api}/nsi/dict/save`,
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(
						capitlizeObjectKeys({
							valueDict: {
								nickDict,
								element: [shittylizeElement(data)]
							}
						})
					)
				}
			}
		}
	},
	makeReport(nick) {
		return {
			type: MAKE_REPORT,
			payload: {nick}
		}
	}
}

function normalize(response) {
	return (Array.isArray(response) ? response : [response]).map(
		({
			metaAttributes,
			metaAttrs,
			nsiMetaAttrs,
			deleted,
			hierarchyDict,
			transfer,
			...rest
		}) => ({
			...rest,
			deleted: Boolean(deleted),
			hierarchy: Boolean(hierarchyDict),
			transfer: Boolean(transfer)
		})
	)
}

function normalizeElements(elements) {
	return (elements || []).map(({deleted, values, id, ...rest}) => ({
		...rest,
		elementId: id,
		deleted: Boolean(deleted),
		values: dataToEntities(
			'nick',
			values.map(({deleted, valueAttr, value, ...rest}) => ({
				...rest,
				deleted: Boolean(deleted),
				value: value || valueAttr
			}))
		)
	}))
}

function normalizeAttributes(attributes) {
	return attributes.map(
		({
			id,
			typeAttr,
			arrayAttr,
			required,
			deleted,
			unique,
			nickDictLink,
			...rest
		}) => ({
			...rest,
			nick: id.nick,
			type: typeAttr,
			link: nickDictLink,
			array: Boolean(arrayAttr),
			required: Boolean(required),
			deleted: Boolean(deleted),
			unique: Boolean(unique)
		})
	)
}

/* Reducer */
const initialState = {
	catalogs: {},
	attributes: {},
	elements: {}
}

function reducer(state = initialState, {type, payload}) {
	switch (type) {
		case success(LOAD_DICTS): {
			return {
				...state,
				catalogs: dataToEntities('nick', normalize(payload.data)),
				attributes: payload.data.reduce((acc, {nick, nsiMetaAttrs}) => {
					acc[nick] = dataToEntities(
						'nick',
						normalizeAttributes(nsiMetaAttrs).sort(
							(a, b) => a.orders - b.orders
						)
					)

					return acc
				}, {})
			}
		}

		case success(SAVE_DICT):
			return {
				...state,
				catalogs: {
					...state.catalogs,
					[payload.data.nick]: normalize(payload.data)[0]
				},
				attributes: {
					...state.attributes,
					[payload.data.nick]: dataToEntities(
						'nick',
						normalizeAttributes(payload.data.nsiMetaAttrs)
					)
				}
			}

		case success(LOAD_DICT_ELEMENTS):
			return {
				...state,
				elements: {
					...state.elements,
					[payload.data.dict.nick]: dataToEntities(
						'elementId',
						normalizeElements(payload.data.dict.elements)
					)
				}
			}

		case success(SAVE_DICT_ROW):
			// console.log(payload.data)
			return {
				...state,
				elements: {
					...state.elements,
					[payload.data.dict.nick]: dataToEntities(
						'elementId',
						normalizeElements(payload.data.dict.elements)
					)
				}
			}

		default:
			return state
	}
}

export default {
	reducer,
	initialState,
	actions,
	types,
	name,
	pkg
}
