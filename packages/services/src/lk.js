import {requestsReducer} from 'redux-saga-requests';

const name = '@bim-service-lk';

const api = 'http://localhost:3421/projects';

/* Types */

const LOAD_PROJECTS = `${name}/LOAD_PROJECTS`;

export const types = {
	LOAD_PROJECTS
};

/* Action creators */
const actions = {
	loadProjects() {
		return {
			type: types.LOAD_PROJECTS,
			payload: {
				request: {
					url: `${api}`
				}
			}
		};
	}
};

const reducer = requestsReducer({actionType: types.LOAD_PROJECTS});

export default {
	reducer,
	types,
	actions,
	name,
	api
};
