import React from 'react'
import {Helmet} from 'react-helmet'
import {ConnectedRouter} from 'connected-react-router'
import {Route, Switch} from 'react-router-dom'

import {name as appName} from '../package.json'

import {projectCard, Loading, NotFound, nsi, lk, Login, oshs} from './import'
import {Layout} from './Layout'
import PrivateRoute from './PrivateRoute'

const projectCardRoute = projectCard.baseRoute
const nsiModuleRoute = nsi.baseRoute
const lkModuleRoute = lk.baseRoute
const loginModuleRoute = Login.baseRoute
const oshsModuleRoute = oshs.baseRoute

const routes = [
	{
		key: 'Login',
		path: loginModuleRoute,
		component: React.lazy(() => import('./LazyLoad/Login'))
	},
	{
		key: 'Main',
		path: '/',
		exact: true,
		private: true,
		component: React.lazy(() => import('./Compound/LK'))
	},
	{
		key: 'backendMain',
		path: '/main',
		private: true,
		component: React.lazy(() => import('./Compound/LK'))
	},
	{
		key: 'lk',
		path: lkModuleRoute,
		private: true,
		component: React.lazy(() => import('./LazyLoad/LK'))
	},

	{
		key: 'project-card',
		path: projectCardRoute,
		private: true,
		component: React.lazy(() => import('./LazyLoad/ProjectCard'))
	},
	{
		key: 'Nsi',
		path: nsiModuleRoute,
		private: true,
		component: React.lazy(() => import('./LazyLoad/Nsi'))
	},

	{
		key: 'Oshs',
		private: true,
		path: oshsModuleRoute,
		component: React.lazy(() => import('./LazyLoad/Oshs'))
	}
]

function Routes({history}) {
	return (
		<React.Fragment>
			<Helmet>
				<title>{appName}</title>
			</Helmet>
			<ConnectedRouter history={history}>
				<Layout>
					<React.Suspense fallback={<Loading overlay />}>
						<Switch>
							{routes.map(route =>
								route.private ? (
									<PrivateRoute {...route} />
								) : (
									<Route {...route} />
								)
							)}
							<Route component={NotFound} />
						</Switch>
					</React.Suspense>
				</Layout>
			</ConnectedRouter>
		</React.Fragment>
	)
}

export default Routes
