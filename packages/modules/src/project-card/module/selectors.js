import {createSelector} from 'reselect'

import {namespace} from './types'
import {initialState} from './reducers'

import {projectCardService as projectCard} from '../../../import'

const namespaceStateSelector = state => state[namespace] || initialState
const serviceDataSelector = state => state[projectCard.name] || initialState

function getProjectTitle(projectObject) {
	if (
		projectObject !== undefined &&
		projectObject.hasOwnProperty('objectName')
	) {
		const projectName = projectObject.objectName
		const projectAdress = projectObject.addressGenerated
		return {
			projectName: projectName,
			projectAdress: projectAdress
		}
	}
}

function getProjectId(projectObject) {
	if (
		projectObject !== undefined &&
		projectObject.hasOwnProperty('idProject')
	) {
		return {
			projectId: projectObject.idProject
		}
	}
}

export const projectLoading = createSelector(
	namespaceStateSelector,
	state => state.projectLoading
)

export const projectSelector = createSelector(
	serviceDataSelector,
	state => state.project
)

export const projectTitleSelector = createSelector(
	projectSelector,
	state => getProjectTitle(state)
)

export const projectIdSelector = createSelector(
	projectSelector,
	state => getProjectId(state)
)

export const tabsSelector = createSelector(
	serviceDataSelector,
	state => state.tabs
)

export const sectionsSelector = createSelector(
	serviceDataSelector,
	state => state.sections
)

export const selectedTabsSelector = createSelector(
	namespaceStateSelector,
	state => state.selectedTab
)

export const selectedSectionSelector = createSelector(
	namespaceStateSelector,
	state => state.selectedSection
)

export const fieldsSelector = createSelector(
	serviceDataSelector,
	state => state.fields
)
