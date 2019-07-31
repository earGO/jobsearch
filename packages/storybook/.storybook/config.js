import {addParameters, configure, addDecorator} from '@storybook/react';
import {create} from '@storybook/theming';
import {withInfo} from '@storybook/addon-info';

addDecorator(withInfo);

const theme = create({
	base: 'light',
	colorPrimary: '#0e0e0e',
	colorSecondary: '#1EA7FD'
});
addParameters({options: {theme}});

const comps = require.context('../..', true, /.stories.js$/);

configure(() => {
	comps.keys().forEach(filename => comps(filename));
}, module);
