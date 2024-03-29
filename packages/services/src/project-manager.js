import {requestsReducer} from 'redux-saga-requests';

const name = '@bim-service-project-manager';
/* Using global port to give access to PMs and others and stuff */
const api = 'http://192.168.5.90:3421/projects';

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
