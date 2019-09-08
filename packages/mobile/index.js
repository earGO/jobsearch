import React from 'react';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import Navigator from 'react-native-easy-router';
import Screens, {Alternate} from './routes';

const Application = () => (
	<Navigator screens={Alternate} initialStack="Dashboard" />
);

AppRegistry.registerComponent(appName, () => Application);
