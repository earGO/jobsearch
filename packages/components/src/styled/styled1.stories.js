import React from 'react';
import {storiesOf} from '@storybook/react';
import SomeComponent from './styled1';

storiesOf('STORYNAME', module)
    .add('substroy caption', () => (
        <SomeComponent />
    ));
