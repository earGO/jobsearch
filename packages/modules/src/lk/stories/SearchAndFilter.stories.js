import React from 'react'
import {storiesOf} from '@storybook/react'
import {Box, Text, Flex} from '@ursip/design-system'
import DatePicker from '../DatePickerRange'

storiesOf(`SearchAndFilter`, module)
	.addParameters({
		info: {
			inline: true,
			header: false,
			styles: {
				header: {
					h1: {
						color: 'red'
					}
				}
			}
		}
	})
	.add(
		'DatePicker',
		() => (
			<Box width={260} p={1}>
				<DatePicker />
			</Box>
		),
		{
			info: {
				text: `
          Компонент пишет начальную и конечную даты в state родительского компонента DatePickerRange, откуда их можно забирать обычным способом. 
        `
			}
		}
	)
