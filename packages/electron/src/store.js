import {createStore} from 'redux-dynamic-modules';
import {routerMiddleware, connectRouter} from 'connected-react-router';
import {
	requestsPromiseMiddleware,
	createRequestInstance,
	watchRequests
} from 'redux-saga-requests';
import {createDriver} from 'redux-saga-requests-fetch';
import {getSagaExtension} from 'redux-dynamic-modules-saga';
import {fork} from 'redux-saga/effects';
import {createBrowserHistory} from 'history';
import {logger} from 'redux-logger/src';

const history = createBrowserHistory();

const requestSaga = function*() {
	yield createRequestInstance({
		driver: createDriver(window.fetch)
	});

	yield fork(watchRequests);
};

export const routeModule = () => {
	return {
		id: 'initial',
		reducerMap: {
			router: connectRouter(history)
		},
		middlewares: [
			logger,
			routerMiddleware(history),
			requestsPromiseMiddleware({
				auto: true
			})
		],
		sagas: [requestSaga]
	};
};

const store = createStore({
	extensions: [getSagaExtension()]
});

store.history = history;

export default store;
