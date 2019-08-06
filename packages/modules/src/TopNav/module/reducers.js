import {success, error} from 'redux-saga-requests'

import {topNavigation as service} from '../../../import'
import * as types from './types'

export const initialState = {
	navigationLoading: false,
	selectedOption: '',
	openCreateModal: false
}

const serviceTypes = service.types

export default {
	[serviceTypes.LOAD_TABS]: () => ({
		navigationLoading: true
	}),
	[success(serviceTypes.LOAD_TABS)]: () => ({
		navigationLoading: false
	}),
	[error(serviceTypes.LOAD_TABS)]: () => ({
		navigationLoading: false
	}),
	[types.PRESELECT_OPTION]: (_, {payload}) => {
		const options = payload.options
		const selectedOption = payload.selectedOption
		if (selectedOption === '') {
			return {
				selectedOption: options[0].id
			}
		} else {
			return {
				selectedOption: selectedOption
			}
		}
	},
	[types.SELECT_OPTION]: (_, {payload}) => ({
		selectedOption: payload.selectedOption
	}),
	[types.CREATE_OPEN]: (_, {payload}) => ({
		openCreateModal: payload.openCreateModal
	}),
	[types.CREATE_CLOSE]: (_, {payload}) => ({
		openCreateModal: payload.openCreateModal
	})
}
