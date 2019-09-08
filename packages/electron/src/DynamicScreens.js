import {DynamicModuleLoader} from 'redux-dynamic-modules-react';
import {routeModule} from './store';
import Screens from './screens';
import store from './store';

import * as React from 'react';

const DynamicScreens = () => {
	return (
		<DynamicModuleLoader modules={[routeModule()]}>
			<Screens history={store.history} />
		</DynamicModuleLoader>
	);
};

export default DynamicScreens;
