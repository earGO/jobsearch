import {namespace} from './types';
import reducers, {initialState} from './reducers';
import * as actions from './actions';

import sagas from './sagas';

const navigationModule = () => {
	return {
		id: namespace,
		reducerMap: {
			[namespace]: (state = initialState, action) => ({
				...state,
				...(reducers[action.type] &&
					reducers[action.type](state, action))
			})
		},
		sagas: [sagas],
		initialActions: [actions.navigationClick('/main')]
	};
};

export default navigationModule;
