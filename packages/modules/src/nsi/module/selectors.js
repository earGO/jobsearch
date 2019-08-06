import {createSelector} from 'reselect'
import * as R from 'ramda'

import {namespace} from './types'
import {initialState} from './reducers'

import {nsi} from '../../../import'

const stateSelector = state => state[namespace] || initialState

export const loading = createSelector(
	stateSelector,
	state => state.loading
)

export const loadingElements = createSelector(
	stateSelector,
	state => state.loadingElements
)

export const catalogsSearchQuery = createSelector(
	stateSelector,
	state => state.catalogsSearchQuery
)

export const elementsSearchQuery = createSelector(
	stateSelector,
	state => state.elementsSearchQuery
)

export const sort = createSelector(
	stateSelector,
	state => state.sort
)

export const currentCatalogName = createSelector(
	stateSelector,
	state => state.currentCatalogName
)

export const catalogsSideWidth = createSelector(
	stateSelector,
	state => state.catalogsSideWidth
)

export const elementsModalVisible = createSelector(
	stateSelector,
	state => state.elementsModalVisible
)

export const currentElement = createSelector(
	stateSelector,
	state => state.currentElement
)

export const userSettings = createSelector(
	stateSelector,
	state => state.userSettings
)

export const expandedRowKeys = createSelector(
	stateSelector,
	state => state.expandedRowKeys
)

const nsiService = state => state[nsi.name]

export const allCatalogs = createSelector(
	nsiService,
	service => service.catalogs
)

export const allAttributes = createSelector(
	nsiService,
	service => service.attributes
)

export const allElements = createSelector(
	nsiService,
	service => service.elements
)

export const currentCatalog = createSelector(
	allCatalogs,
	currentCatalogName,
	(catalogs, catalog) => catalogs[catalog] || {}
)

export const currentCatalogAttributes = createSelector(
	allAttributes,
	currentCatalogName,
	(attrubutes, catalog) => attrubutes[catalog] || {}
)

export const currentCatalogElements = createSelector(
	allElements,
	currentCatalogName,
	(elements, catalog) => elements[catalog]
)

export const filteredCatalogs = createSelector(
	[allCatalogs, catalogsSearchQuery],
	(catalogs, query) =>
		Object.values(catalogs || {}).filter(
			catalog =>
				String(catalog.name)
					.toLowerCase()
					.includes(query) && !catalog.deleted
		)
)

export const filteredAttributes = createSelector(
	[currentCatalogAttributes],
	attributes =>
		Object.values(attributes).filter(attribute => !attribute.deleted)
)

export const filteredElements = createSelector(
	[
		currentCatalogElements,
		currentCatalogAttributes,
		elementsSearchQuery,
		sort
	],
	(elements = {}, attributes = {}, searchQuery, {column, order}) => {
		let result = Object.values(elements).filter(element => !element.deleted)
		const SORTERS = {
			string: (a, b) =>
				new Intl.Collator('ru', {numeric: true}).compare(a, b),
			number: (a, b) => b - a,
			integer: (a, b) => b - a,
			link: () => {},
			boolean: (a, b) => {
				if (typeof a !== 'string') {
					return 1
				}
				if (typeof b !== 'string') {
					return -1
				}
				return b.localeCompare(a)
			}
		}

		if (searchQuery) {
			result = result.filter(item =>
				JSON.stringify(Object.values(item))
					.toLowerCase()
					.includes(searchQuery)
			)
		}

		const sortedColumn = attributes[column]

		if (sortedColumn) {
			result.sort((a, b) => {
				const first = a.values[column] || {}
				const second = b.values[column] || {}

				return SORTERS[sortedColumn.type](first.value, second.value)
			})
			result = order === 'desc' ? [...result] : [...result.reverse()]
		} else {
			result.sort(
				(a, b) => Date.parse(b.dateCreate) - Date.parse(a.dateCreate)
			)
		}

		return result
	}
)

export const groupedCatalogs = createSelector(
	filteredCatalogs,
	catalogs => R.groupBy(catalog => catalog.sysName)(Object.values(catalogs))
)

export const getCatalog = name =>
	createSelector(
		allCatalogs,
		catalogs => catalogs[name]
	)

export const getColumnWidths = createSelector(
	[userSettings, currentCatalogName],
	(settings, name) => settings[name] || {}
)

export const byNick = nick =>
	createSelector(
		[allCatalogs, allElements, allAttributes],
		(catalogs, elements, attributes) => ({
			...catalogs[nick],
			attributes: Object.values(attributes[nick] || {}),
			elements: Object.values(elements[nick] || {})
		})
	)

export const attributesByNick = nick =>
	createSelector(
		allAttributes,
		attributes => attributes[nick] || {}
	)

export const elementsByNick = nick =>
	createSelector(
		allElements,
		elements => elements[nick] || {}
	)
