import * as types from './types'

/* It preselects tab on first loading of a project */
export const preselectTab = (tabs, selectedTab) => {
	return {
		type: types.PRESELECT_TAB,
		payload: {tabs: tabs, selectedTab: selectedTab}
	}
}

/* It puts in state indicator, that one of projects was clicked */
export const selectProject = projectId => {
	return {
		type: types.SELECT_PROJECT,
		payload: {projectSelected: true, selectedProject: projectId}
	}
}
