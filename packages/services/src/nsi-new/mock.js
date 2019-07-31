/* eslint-disable no-console */
import {actions} from '.';

export default Object.values(actions).reduce((output, action) => {
	const {type, meta} = action();

	if (meta && meta.mock && typeof meta.mock === 'function') {
		output[type] = requestConfig => ({
			data: meta.mock(requestConfig)
		});
	}

	return output;
}, {});
