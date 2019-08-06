import {createSelector} from 'reselect'
import {success} from 'redux-saga-requests'

import * as oshsDelegationServices from '../../../services/oshs/delegation'
import {sagas as employeesSagas} from './employees'
import {takeEvery, call} from 'redux-saga/effects'

const name = 'oshs-module-delegation'
export const baseRoute = '/oshs'

const actions = {
	createDelegation: oshsDelegationServices.actions.createDelegation,
	updateDelegation: oshsDelegationServices.actions.updateDelegation,
	deleteDelegation: oshsDelegationServices.actions.deleteDelegation
}

const delegationServicesSelector = state =>
	state[oshsDelegationServices.name] || []

const createDelegation = createSelector(
	delegationServicesSelector,
	state => state
)

const selectors = {
	createDelegation
}

const createDelegationSaga = function*() {
	yield call(employeesSagas.updateEmployees)
}

export const rootSaga = function*() {
	yield takeEvery(
		success(oshsDelegationServices.types.CREATE_DELEGATION),
		createDelegationSaga
	)
	yield takeEvery(
		success(oshsDelegationServices.types.DELETE_DELEGATION),
		createDelegationSaga
	)
	yield takeEvery(
		success(oshsDelegationServices.types.UPDATE_DELEGATION),
		createDelegationSaga
	)
}

export default {
	id: name,
	reducerMap: {
		[oshsDelegationServices.name +
		'-create']: oshsDelegationServices.createReducer,
		[oshsDelegationServices.name +
		'-update']: oshsDelegationServices.updateReducer,
		[oshsDelegationServices.name +
		'-delete']: oshsDelegationServices.deleteReducer
	},
	sagas: [rootSaga]
}

export {name, actions, selectors}
