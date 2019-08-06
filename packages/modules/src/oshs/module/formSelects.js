import {createSelector} from 'reselect'
import {oshs} from '../../../import'

const oshsEmployeesServices = oshs.employees

const name = 'oshs-module-form-selects'
export const baseRoute = '/oshs'

const actions = {
	getEmployeesByDepartmentId: id =>
		oshsEmployeesServices.actions.getEmployeesByDepartmentId(id, 'clone')
}

const oshsEmployeesByDepartmentIdSelector = state =>
	state['FormEmployeesByDepartmentId'] || []

const employeesByDepartmentId = createSelector(
	oshsEmployeesByDepartmentIdSelector,
	state => state.data
)

const employeesByDepartmentIdLoading = createSelector(
	oshsEmployeesByDepartmentIdSelector,
	state => !!state.pending
)

const selectors = {
	employeesByDepartmentId,
	employeesByDepartmentIdLoading
}

export {name, selectors, actions}

export default {
	id: name,
	reducerMap: {
		['FormEmployeesByDepartmentId']:
			oshsEmployeesServices.getEmployeesByDepartmentCloneReducer
	}
}
