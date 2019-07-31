import {requestsReducer} from 'redux-saga-requests'
import pkg from '../../package.json'

const name = 'ursip-oshs-delegation-service'
const api = pkg.ru_ursip.services['ursip-oshs-service']

/* types */
const CREATE_DELEGATION = `${name}/CREATE_DELEGATION`
const UPDATE_DELEGATION = `${name}/UPDATE_DELEGATION`
const DELETE_DELEGATION = `${name}/DELETE_DELEGATION`

const types = {
	CREATE_DELEGATION,
	UPDATE_DELEGATION,
	DELETE_DELEGATION
}

/* Action creators */
const actions = {
	createDelegation: ({
		employee,
		department,
		delegate,
		startDate,
		endDate,
		docName,
		docNumber,
		fileId
	}) => {
		return {
			type: CREATE_DELEGATION,
			request: {
				url: `${api}/delegation/create`,
				method: 'POST',
				body: JSON.stringify({
					employee,
					department,
					delegate,
					startDate,
					endDate,
					docName,
					docNumber,
					fileId
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			}
		}
	},
	updateDelegation: ({
		id,
		employee,
		department,
		delegate,
		startDate,
		endDate,
		docName,
		docNumber,
		fileId
	}) => {
		return {
			type: UPDATE_DELEGATION,
			request: {
				url: `${api}/delegation/update`,
				method: 'POST',
				body: JSON.stringify({
					id,
					employee,
					department,
					delegate,
					startDate,
					endDate,
					docName,
					docNumber,
					fileId
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			}
		}
	},
	deleteDelegation: id => {
		return {
			type: DELETE_DELEGATION,
			request: {
				url: `${api}/delegation/delete?id=${id}`,
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				}
			}
		}
	}
}

const createReducer = requestsReducer({
	actionType: CREATE_DELEGATION
})

const updateReducer = requestsReducer({
	actionType: UPDATE_DELEGATION
})

const deleteReducer = requestsReducer({
	actionType: DELETE_DELEGATION
})

export default {
	name,
	types,
	actions,
	createReducer,
	updateReducer,
	deleteReducer
}
