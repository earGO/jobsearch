import * as types from './types'

/* It preselects tab on first loading of a project */
export const preselectTab = (tabs, selectedTab) => {
	return {
		type: types.PRESELECT_TAB,
		payload: {tabs: tabs, selectedTab: selectedTab}
	}
}

/* It selects tab on click loading of a project */
export const selectTab = tabId => {
	return {
		type: types.SELECT_TAB,
		payload: {tabId}
	}
}

export const preselectSection = sections => {
	return {
		type: types.PRESELECT_SECTION,
		payload: {sections}
	}
}

/* It selects tab on click loading of a project */
export const selectSection = sectionId => {
	return {
		type: types.SELECT_SECTION,
		payload: {sectionId}
	}
}
