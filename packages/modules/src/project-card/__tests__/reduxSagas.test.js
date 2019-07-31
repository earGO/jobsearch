import {error, success} from 'redux-saga-requests'
import thunk from 'redux-thunk'
import {selectors} from '../module/selectors'
import * as moduleActions from '../module/actions'
import fetchMock from 'fetch-mock'
import {projectCardService} from '../../../import'
import configureStore from 'redux-mock-store'

const {
	projectCardReducer,
	name,
	types,
	actions,
	api,
	endpoints
} = projectCardService

const initialMockState = {
	mockTitle: 'mockTitle',
	mockData: ['papul', 'banana', 'minion']
}

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const store = mockStore({project: []})

describe('Test projectCard service', () => {
	for (var prop in types) {
		if (types.hasOwnProperty(prop)) {
			it('type format should be correct', () => {
				const typeValue = name + '/' + prop
				expect(types[prop]).toBe(typeValue)
			})
		}
	}
})

describe('Test projectCard service reducer', () => {
	it('should handle LOAD_PROJECT', () => {
		const successAction = {
			type: success(types.LOAD_PROJECT),
			payload: {data: {test: 'test'}}
		}
		expect(projectCardReducer({}, successAction)).toEqual({
			project: {test: 'test'}
		})
	})
	it('should return emptyState when error', () => {
		const errorAction = {
			type: error(types.LOAD_PROJECT),
			payload: "if you see it reducer doesn't works"
		}
		expect(
			projectCardReducer({initialState: 'initialState'}, errorAction)
		).toEqual({initialState: 'initialState'})
	})
})

describe('Test projectCard service actions', () => {
	beforeEach(() => {
		// Runs before each test in the suite
		store.clearActions()
	})
	afterEach(() => {
		fetchMock.restore()
	})
	test('Dispatches the correct action and payload', () => {
		const expectedActions = [
			{
				payload: {request: {url: 'http://localhost:3000/project/'}},
				type: 'project-card/LOAD_PROJECT'
			}
		]
		store.dispatch(actions.loadProject())
		expect(store.getActions()).toEqual(expectedActions)
	})
})
