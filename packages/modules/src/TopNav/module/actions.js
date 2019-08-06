import * as types from './types'

/* It preselects tab on first loading of a project */
export const preselectOption = (options, selectedOption) => {
	return {
		type: types.PRESELECT_OPTION,
		payload: {options: options, selectedOption: selectedOption}
	}
}

export const selectOption = selectedOption => {
	return {
		type: types.SELECT_OPTION,
		payload: {selectedOption}
	}
}

export const openCreateModal = () => {
	return {
		type: types.CREATE_OPEN,
		payload: {openCreateModal: true}
	}
}

export const closeCreateModal = () => {
	return {
		type: types.CREATE_CLOSE,
		payload: {openCreateModal: false}
	}
}
