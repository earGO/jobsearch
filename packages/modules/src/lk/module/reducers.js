import {success, error} from 'redux-saga-requests'

import {lk as service} from '../../../import'
import * as types from './types'

const serviceTypes = service.types

export const initialState = {
	projectsLoading: false,
	localOptionSelected: 'All',
	projectSelected: false,
	selectedProject: 'no project selected'
}

export default {
	[serviceTypes.LOAD_PROJECT]: () => ({
		projectsLoading: true
	}),
	[success(serviceTypes.LOAD_PROJECT)]: () => ({
		projectsLoading: false
	}),
	[error(serviceTypes.LOAD_PROJECT)]: () => ({
		projectsLoading: false
	}),
	[types.SELECT_PROJECT]: (_, {payload}) => ({
		projectSelected: payload.projectSelected,
		selectedProject: payload.selectedProject
	})
}
