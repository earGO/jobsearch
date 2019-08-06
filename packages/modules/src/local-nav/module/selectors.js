import {createSelector} from 'reselect'

import {namespace} from './types'
import {initialState} from './reducers'
import {localNavigation as service} from '../../../import'

const namespaceStateSelector = state => state[namespace] || initialState
const serviceDataSelector = state => state[service.name] || initialState

export const tabsLoading = createSelector(
	namespaceStateSelector,
	state => state.data
)

export const tabsSelector = createSelector(
	serviceDataSelector,
	state => state.data
)

export const selectedTabsSelector = createSelector(
	namespaceStateSelector,
	state => state.selectedOption
)
