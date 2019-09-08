import {DynamicModuleLoader} from 'redux-dynamic-modules-react';
import {routeModule} from './store';
import navigationModule from './RouterModule/index';
import Screens from './screens';
import store from './store';

import * as React from 'react';

const DynamicScreens = () => {
	return (
		<DynamicModuleLoader modules={[routeModule(), navigationModule()]}>
			<Screens history={store.history} />
		</DynamicModuleLoader>
	);
};

export default DynamicScreens;
