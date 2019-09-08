import {all, put, takeLatest, select} from 'redux-saga/effects';
import {push} from 'connected-react-router';
import * as types from './types';
import * as selectors from './slectors';

const changeRoute = function*() {
	const newRoute = yield select(selectors.currentRouteSelector);
	console.log('shooted saga ', newRoute);
	yield put(push(newRoute));
};

export default function*() {
	yield all([takeLatest(types.CHANGE_ROUTE, changeRoute)]);
}
