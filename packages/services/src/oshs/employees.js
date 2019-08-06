import {requestsReducer} from 'redux-saga-requests'
import pkg from '../../package.json'

const name = 'ursip-oshs-employees-service'
const api = pkg.ru_ursip.services['ursip-oshs-service']

/* types */
const CREATE_EMPLOYEE = `${name}/CREATE_EMPLOYEE`
const UPDATE_EMPLOYEE = `${name}/UPDATE_EMPLOYEE`
const DELETE_EMPLOYEE = `${name}/DELETE_EMPLOYEE`
const GET_EMPLOYEES_BY_DEPARTMENT_ID = `${name}/GET_EMPLOYEES_BY_DEPARTMENT_ID`
const SEARCH_EMPLOYEES = `${name}/SEARCH_EMPLOYEES`

const cloneType = (type, id) => (id ? `cloneId=${id}/${type}` : type)

const types = {
	CREATE_EMPLOYEE,
	UPDATE_EMPLOYEE,
	DELETE_EMPLOYEE,
	GET_EMPLOYEES_BY_DEPARTMENT_ID,
	SEARCH_EMPLOYEES
}

/* Action creators */
const actions = {
	createEmployee: ({
		surname,
		name,
		patronymic,
		department,
		position,
		email,
		phone,
		room,
		note
	}) => {
		return {
			type: CREATE_EMPLOYEE,
			request: {
				url: `${api}/employees/create`,
				method: 'POST',
				body: JSON.stringify({
					surname,
					name,
					patronymic,
					department,
					position,
					email,
					phone,
					room,
					note
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			}
		}
	},
	updateEmployee: ({
		id,
		surname,
		name,
		patronymic,
		department,
		position,
		email,
		phone,
		room,
		note
	}) => {
		return {
			type: UPDATE_EMPLOYEE,
			request: {
				url: `${api}/employees/update`,
				method: 'POST',
				body: JSON.stringify({
					id,
					surname,
					name,
					patronymic,
					department,
					position,
					email,
					phone,
					room,
					note
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			}
		}
	},
	deleteEmployee: id => {
		return {
			type: DELETE_EMPLOYEE,
			request: {
				url: `${api}/employees/delete?id=${id}`,
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				}
			}
		}
	},
	getEmployeesByDepartmentId: (id, cloneId) => {
		return {
			type: cloneType(GET_EMPLOYEES_BY_DEPARTMENT_ID, cloneId),
			request: {
				url: `${api}/employees/getByDepartmentId?id=${id}`,
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			}
		}
	},
	searchEmployees: query => {
		return {
			type: SEARCH_EMPLOYEES,
			request: {
				url: `${api}/employees/search?query=${query}`,
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			}
		}
	}
}

const createEmployeeReducer = requestsReducer({
	actionType: CREATE_EMPLOYEE
})

const getEmployeesByDepartmentReducer = requestsReducer({
	actionType: GET_EMPLOYEES_BY_DEPARTMENT_ID
})

const getEmployeesByDepartmentCloneReducer = requestsReducer({
	actionType: cloneType(GET_EMPLOYEES_BY_DEPARTMENT_ID, 'clone')
})

const searchEmployeesQueryReducer = requestsReducer({
	actionType: SEARCH_EMPLOYEES
})

export default {
	name,
	types,
	actions,
	createEmployeeReducer,
	getEmployeesByDepartmentReducer,
	getEmployeesByDepartmentCloneReducer,
	searchEmployeesQueryReducer
}
