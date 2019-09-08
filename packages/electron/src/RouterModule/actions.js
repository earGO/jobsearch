import * as types from './types';

export const navigationClick = newRoute => ({
	type: types.CHANGE_ROUTE,
	payload: {newRoute}
});
