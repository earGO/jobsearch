import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import {Provider} from 'react-redux';
import store from './store';
import DynamicScreens from './DynamicScreens';

ReactDOM.render(
	<Provider store={store}>
		<DynamicScreens />
	</Provider>,
	document.getElementById('root')
);
