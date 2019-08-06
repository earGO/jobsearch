import {DynamicModuleLoader} from 'redux-dynamic-modules-react'
import {routeModule} from './store'
import Routes from './routes'
import store from './store'
import {request, Login} from './import'

import * as React from 'react'

const DynamicRoutes = () => {
	return (
		<DynamicModuleLoader
			modules={[routeModule(), Login.module, request.default]}
		>
			<Routes history={store.history} />
		</DynamicModuleLoader>
	)
}

export default DynamicRoutes
