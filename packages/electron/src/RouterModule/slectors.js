import * as types from './types';
import {createSelector} from 'reselect';

const navigationState = state => state[types.namespace];

export const currentRouteSelector = createSelector(
	navigationState,
	state => state.currentRoute
);
