import React from 'react';
import {Button, Text, View} from 'react-native';
import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import AddInterview from './screens/AddInterview';
import Interview from './screens/Interview';

const First = ({navigator}) => (
	<View
		style={{
			alignItems: 'center',
			backgroundColor: 'white',
			flex: 1,
			flexDirection: 'column',
			justifyContent: 'center'
		}}
	>
		<Text>First screen</Text>
		<Text onPress={() => navigator.push('Second', {name: 'John'})}>
			Go forward
		</Text>
	</View>
);

const Second = ({navigator, name}) => (
	<View
		style={{
			alignItems: 'center',
			backgroundColor: 'pink',
			flex: 1,
			flexDirection: 'column',
			justifyContent: 'center'
		}}
	>
		<Text>Second screen</Text>
		<Text>Hello {name}!</Text>
		<Text onPress={() => navigator.pop()}>Go back</Text>
	</View>
);

export default {
	First,
	Second
};

export const Alternate = {
	Login,
	Dashboard,
	AddInterview,
	Interview
};
