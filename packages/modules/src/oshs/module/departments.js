import {createSelector} from 'reselect'
import {put, takeEvery, select, call} from 'redux-saga/effects'
import {oshs} from '../../../import'
import {success} from 'redux-saga-requests'
import {push} from 'connected-react-router'

const oshsDepartmentsServices = oshs.departments

const name = 'oshs-module-departments'
export const baseRoute = '/oshs'

/* types */
const SET_SELECTED_DEPARTMENT_ID = `${name}/SET_SELECTED_DEPARTMENT_ID`
const CLEAR_SELECTED_DEPARTMENT_ID = `${name}/CLEAR_SELECTED_DEPARTMENT_ID`
const SEARCH_DEPARTMENT_INPUT_VALUE = `${name}/SEARCH_DEPARTMENT_INPUT_VALUE`
const CLEAR_DEPARTMENT_INPUT_VALUE = `${name}/CLEAR_DEPARTMENT_INPUT_VALUE`

const types = {
	SET_SELECTED_DEPARTMENT_ID,
	CLEAR_SELECTED_DEPARTMENT_ID,
	SEARCH_DEPARTMENT_INPUT_VALUE,
	CLEAR_DEPARTMENT_INPUT_VALUE
}

const actions = {
	loadAllDepartments: oshsDepartmentsServices.actions.loadAllDepartments,
	createSubDepartment: oshsDepartmentsServices.actions.createSubDepartment,
	editDepartment: oshsDepartmentsServices.actions.editDepartment,
	deleteDepartment: oshsDepartmentsServices.actions.deleteDepartment,
	searchDepartment: oshsDepartmentsServices.actions.searchDepartment,
	setSelectedDepartmentId: id => {
		return {
			type: SET_SELECTED_DEPARTMENT_ID,
			departmentId: id
		}
	},
	clearSelectedDepartmentId: () => {
		return {
			type: CLEAR_SELECTED_DEPARTMENT_ID
		}
	},
	searchDepartmentInputValue: query => {
		return {
			type: SEARCH_DEPARTMENT_INPUT_VALUE,
			query: query
		}
	},
	clearDepartmentInputValue: () => {
		return {
			type: CLEAR_DEPARTMENT_INPUT_VALUE
		}
	}
}

/* reducer selected department */

const setSelectedDepartmentIdReducer = (state = null, {type, departmentId}) => {
	switch (type) {
		case SET_SELECTED_DEPARTMENT_ID:
			return departmentId
		case CLEAR_SELECTED_DEPARTMENT_ID:
			return null
		default:
			return state
	}
}

/* reducer input value */

const searchDepartmentInputValueReducer = (
	state = {departmentInputValueQuery: ''},
	{type, query}
) => {
	switch (type) {
		case SEARCH_DEPARTMENT_INPUT_VALUE:
			return {...state, departmentInputValueQuery: query}
		case CLEAR_DEPARTMENT_INPUT_VALUE:
			return {...state, departmentInputValueQuery: ''}
		default:
			return state
	}
}

const oshsDepartmentsSelector = state => state['load-all-departments'] || []
const selectDepartmentIdSelector = state =>
	state['selected-department-id'] || []
const searchDepartmentSelector = state => state['search-department'] || []
const oshsInputDepartmentValue = state => state['input-department-search'] || []

const allDepartments = createSelector(
	oshsDepartmentsSelector,
	state => state.data
)

const allDepartmentsLoading = createSelector(
	oshsDepartmentsSelector,
	state => !!state.pending
)

const selectedDepartmentId = createSelector(
	selectDepartmentIdSelector,
	state => state
)

const searchDepartment = createSelector(
	searchDepartmentSelector,
	state => state.data
)

const selectedDepartmentSelector = state => {
	if (selectedDepartmentId(state)) {
		if (allDepartments(state) && allDepartments(state).length) {
			return allDepartments(state).find(
				department => selectedDepartmentId(state) === department.id
			)
		}
	}
	return null
}

const selectedDepartment = createSelector(
	selectedDepartmentSelector,
	state => state
)

const inputDepartmentValue = createSelector(
	oshsInputDepartmentValue,
	state => state.departmentInputValueQuery
)

const selectors = {
	oshsDepartmentsSelector,
	allDepartments,
	allDepartmentsLoading,
	selectedDepartmentId,
	selectedDepartment,
	searchDepartment,
	inputDepartmentValue
}

const setFirstDepartmentActiveAfterLoadingSaga = function*(action) {
	const department = yield select(selectors.selectedDepartment)
	if (action && action.data && action.data.length > 0 && !department) {
		yield put(push(`/oshs/${action.data['0'].id}`))
	}
}

const loadAllDepartmentsSaga = function*() {
	yield put(oshsDepartmentsServices.actions.loadAllDepartments())
}

const createDepartmentSaga = function*(action) {
	if (action && action.data && action.data.id) {
		yield put(push(`/oshs/${action.data.id}`))
	}
	yield call(loadAllDepartmentsSaga)
}

export const updateDepartmentSaga = function*() {
	yield takeEvery(
		success(oshsDepartmentsServices.types.CREATE_SUBDEPARTMENT),
		createDepartmentSaga
	)
	yield takeEvery(
		success(oshsDepartmentsServices.types.DELETE_DEPARTMENT),
		loadAllDepartmentsSaga
	)
	yield takeEvery(
		success(oshsDepartmentsServices.types.EDIT_DEPARTMENT),
		loadAllDepartmentsSaga
	)
	yield takeEvery(
		success(oshsDepartmentsServices.types.LOAD_DEPARTMENTS),
		setFirstDepartmentActiveAfterLoadingSaga
	)
}
export {name, types, selectors, actions}

export default {
	id: name,
	reducerMap: {
		['load-all-departments']: oshsDepartmentsServices.mainReducer,
		['create-sub-department']:
			oshsDepartmentsServices.createSubDepartmentReducer,
		['search-department']: oshsDepartmentsServices.searchDepartmentReducer,
		['selected-department-id']: setSelectedDepartmentIdReducer,
		['input-department-search']: searchDepartmentInputValueReducer
	},
	sagas: [loadAllDepartmentsSaga, updateDepartmentSaga]
}
