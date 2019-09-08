import * as types from './types';

export const initialState = {
	navigationLoading: false,
	currentRoute: null
};

export default {
	[types.CHANGE_ROUTE]: (_, {payload}) => {
		console.log(payload.newRoute);
		return {
			currentRoute: payload.newRoute
		};
	}
};
