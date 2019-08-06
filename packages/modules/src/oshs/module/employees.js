import {createSelector} from 'reselect'
import {oshs} from '../../../import'
import {
	actions as departmentsActions,
	selectors as departmentsSelectors
} from './departments'
import {success} from 'redux-saga-requests'
import {takeEvery, put, select, call} from 'redux-saga/effects'
import {push} from 'connected-react-router'

const oshsEmployeesServices = oshs.employees

const name = 'oshs-module-employees'
export const baseRoute = '/oshs'

/* types */
const SET_SELECTED_EMPLOYEE_ID = `${name}/SET_SELECTED_EMPLOYEE_ID`
const SEARCH_INPUT_VALUE = `${name}/SEARCH_INPUT`
const CLEAR_INPUT_VALUE = `${name}/CLEAR_INPUT_VALUE`

const types = {
	SET_SELECTED_EMPLOYEE_ID,
	SEARCH_INPUT_VALUE,
	CLEAR_INPUT_VALUE
}

const actions = {
	createEmployee: oshsEmployeesServices.actions.createEmployee,
	updateEmployee: oshsEmployeesServices.actions.updateEmployee,
	getEmployeesByDepartmentId:
		oshsEmployeesServices.actions.getEmployeesByDepartmentId,
	searchEmployees: oshsEmployeesServices.actions.searchEmployees,
	deleteEmployee: oshsEmployeesServices.actions.deleteEmployee,
	setSelectedEmployeeId: employeeId => {
		return {
			type: SET_SELECTED_EMPLOYEE_ID,
			employeeId: employeeId
		}
	},
	searchInputValue: query => {
		return {
			type: SEARCH_INPUT_VALUE,
			query: query
		}
	},
	clearInputValue: () => {
		return {
			type: CLEAR_INPUT_VALUE
		}
	}
}

const selectedEmployeeIdReducer = (state = null, {type, employeeId}) => {
	switch (type) {
		case SET_SELECTED_EMPLOYEE_ID:
			return employeeId ? employeeId : null
		default:
			return state
	}
}

const searchInputValueReducer = (
	state = {employeesInputValueQuery: ''},
	{type, query}
) => {
	switch (type) {
		case SEARCH_INPUT_VALUE:
			return {...state, employeesInputValueQuery: query}
		case CLEAR_INPUT_VALUE:
			return {...state, employeesInputValueQuery: ''}
		default:
			return state
	}
}

const oshsEmployeesByDepartmentIdSelector = state =>
	state['employeesByDepartmentId'] || []
const oshsSearchQueryEmployeesSelector = state => state['searchEmployees']
const oshsSearchInputValueSelector = state => state['search-employees-input']
const selectedEmployeeIdSelector = state => state['selectedEmployeeId']

const employeesByDepartmentId = createSelector(
	oshsEmployeesByDepartmentIdSelector,
	state => state.data
)

const searchQueryEmployees = createSelector(
	oshsSearchQueryEmployeesSelector,
	state => state.data
)

const selectedEmployeeId = createSelector(
	selectedEmployeeIdSelector,
	state => state
)

const employeesByDepartmentIdLoading = createSelector(
	oshsEmployeesByDepartmentIdSelector,
	state => !!state.pending
)

const SearchQueryEmployeesLoading = createSelector(
	oshsSearchQueryEmployeesSelector,
	state => !!state.pending
)

const employeesLoading = state =>
	employeesByDepartmentIdLoading(state) || SearchQueryEmployeesLoading(state)

const inputValue = createSelector(
	oshsSearchInputValueSelector,
	state => state.employeesInputValueQuery
)

const selectedEmployeeSelector = state => {
	if (
		inputValue(state) &&
		searchQueryEmployees(state) &&
		searchQueryEmployees(state).content
	) {
		return searchQueryEmployees(state).content.find(
			employee => selectedEmployeeId(state) === employee.id
		)
	} else if (
		employeesByDepartmentId(state) &&
		employeesByDepartmentId(state).length
	) {
		return employeesByDepartmentId(state).find(
			employee => selectedEmployeeId(state) === employee.id
		)
	}
	return null
}

const selectedEmployee = createSelector(
	selectedEmployeeSelector,
	state => state
)

const selectors = {
	employeesLoading,
	employeesByDepartmentId,
	employeesByDepartmentIdLoading,
	searchQueryEmployees,
	inputValue,
	selectedEmployeeId,
	selectedEmployee
}

const getEmployeesByDepartmentIdSaga = function*(action) {
	const selectedEmployee = yield select(selectors.selectedEmployee)
	const selectedDepartmentId = yield select(
		departmentsSelectors.selectedDepartmentId
	)
	if (!(action && action.data && action.data.length)) {
		put(push(`/oshs/${selectedDepartmentId}`))
	} else if (
		action &&
		action.data &&
		action.data[0] &&
		action.data[0].id &&
		!selectedEmployee
	) {
		yield put(push(`/oshs/${selectedDepartmentId}/${action.data[0].id}`))
	}
}

const createEmployeeSaga = function*(action) {
	if (action.data && action.data.department) {
		yield put(push(`/oshs/${action.data.department.id}/${action.data.id}`))
		yield put(actions.getEmployeesByDepartmentId(action.data.department.id))
	}
}

const updateEmployees = function*() {
	const selectedDepartmentId = yield select(
		departmentsSelectors.selectedDepartmentId
	)
	const inputValue = yield select(selectors.inputValue)

	if (selectedDepartmentId) {
		yield put(actions.getEmployeesByDepartmentId(selectedDepartmentId))
	} else if (inputValue) {
		yield put(actions.searchEmployees(inputValue))
	}
}

const returnToMainRouteAfterDeleteEmployee = function*() {
	yield call(updateEmployees)
}

const sagas = {
	createEmployeeSaga,
	updateEmployees
}

export const rootSaga = function*() {
	yield takeEvery(
		success(oshsEmployeesServices.types.CREATE_EMPLOYEE),
		createEmployeeSaga
	)
	yield takeEvery(
		success(oshsEmployeesServices.types.UPDATE_EMPLOYEE),
		createEmployeeSaga
	)
	yield takeEvery(
		success(oshsEmployeesServices.types.DELETE_EMPLOYEE),
		returnToMainRouteAfterDeleteEmployee
	)
	yield takeEvery(
		success(oshsEmployeesServices.types.GET_EMPLOYEES_BY_DEPARTMENT_ID),
		getEmployeesByDepartmentIdSaga
	)
}

export {name, selectors, actions, sagas}

export default {
	id: name,
	reducerMap: {
		['create-sub-employee']: oshsEmployeesServices.createEmployeeReducer,
		['employeesByDepartmentId']:
			oshsEmployeesServices.getEmployeesByDepartmentReducer,
		['searchEmployees']: oshsEmployeesServices.searchEmployeesQueryReducer,
		['selectedEmployeeId']: selectedEmployeeIdReducer,
		['search-employees-input']: searchInputValueReducer
	},
	sagas: [rootSaga]
}
