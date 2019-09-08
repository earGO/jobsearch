import React from 'react';
import {ConnectedRouter} from 'connected-react-router';
import {Route, Switch} from 'react-router-dom';
import Layout from './Common/Layout';

import Loading from './Common/Loading';

export const screens = [
	{
		key: 'main',
		exact: true,
		menuName: 'Dashboard',
		iconName: 'dashboard',
		path: '/main',
		component: React.lazy(() => import('./Screens/Dashboard'))
	},
	{
		key: 'dictionaries',
		menuName: 'Dictionaries',
		iconName: 'unordered-list',
		path: '/dictionaries',
		component: React.lazy(() => import('./Screens/Dictionaries'))
	}
];

function Screens({history}) {
	return (
		<React.Fragment>
			<ConnectedRouter history={history}>
				<Layout>
					<React.Suspense fallback={<Loading />}>
						<Switch>
							{screens.map(screen => {
								return <Route {...screen} />;
							})}
						</Switch>
					</React.Suspense>
				</Layout>
			</ConnectedRouter>
		</React.Fragment>
	);
}

export default Screens;
