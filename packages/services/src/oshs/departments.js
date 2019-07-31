import {requestsReducer} from 'redux-saga-requests'
import pkg from '../../package.json'

const name = 'ursip-oshs-departments-service'
const api = pkg.ru_ursip.services['ursip-oshs-service']

/* types */
const LOAD_DEPARTMENTS = `${name}/LOAD_DEPARTMENTS`
const CREATE_SUBDEPARTMENT = `${name}/CREATE_SUBDEPARTMENT`
const EDIT_DEPARTMENT = `${name}/EDIT_DEPARTMENT`
const DELETE_DEPARTMENT = `${name}/DELETE_DEPARTMENT`
const DELETE_DEPARTMENT_SUCCESS = `${name}/DELETE_DEPARTMENT_SUCCESS`
const SEARCH_DEPARTMENT = `${name}/SEARCH_DEPARTMENT`

const types = {
	LOAD_DEPARTMENTS,
	CREATE_SUBDEPARTMENT,
	EDIT_DEPARTMENT,
	DELETE_DEPARTMENT,
	DELETE_DEPARTMENT_SUCCESS,
	SEARCH_DEPARTMENT
}

/* Action creators */
const actions = {
	loadAllDepartments: () => {
		return {
			type: LOAD_DEPARTMENTS,
			request: {
				url: `${api}/departments/getAll`,
				headers: {
					'Content-Type': 'application/json'
				}
			},
			method: 'GET'
		}
	},
	createSubDepartment: ({name, parentId}) => {
		return {
			type: CREATE_SUBDEPARTMENT,
			request: {
				url: `${api}/departments/create`,
				method: 'POST',
				body: JSON.stringify({
					name: name,
					parentId: parentId
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			}
		}
	},
	searchDepartment: query => {
		return {
			type: SEARCH_DEPARTMENT,
			request: {
				url: `${api}/departments/search?name=${query}`,
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			}
		}
	},
	editDepartment: ({id, name, parentId}) => {
		return {
			type: EDIT_DEPARTMENT,
			request: {
				url: `${api}/departments/update`,
				method: 'POST',
				body: JSON.stringify({
					id: id,
					name: name,
					parentId: parentId
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			}
		}
	},
	deleteDepartment: id => {
		return {
			type: DELETE_DEPARTMENT,
			request: {
				url: `${api}/departments/delete?id=${id}`,
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				}
			}
		}
	}
}

const mainReducer = requestsReducer({
	actionType: LOAD_DEPARTMENTS
})

const createSubDepartmentReducer = requestsReducer({
	actionType: CREATE_SUBDEPARTMENT
})

const searchDepartmentReducer = requestsReducer({
	actionType: SEARCH_DEPARTMENT
})

export default {
	name,
	types,
	actions,
	mainReducer,
	createSubDepartmentReducer,
	searchDepartmentReducer
}
