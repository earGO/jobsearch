import React from 'react'
import {Heading, Text, Divider} from '../../import'

function NotFound() {
	return (
		<Text pt={2}>
			<Text bold fontSize={50} ml={2}>
				404
			</Text>
			<Divider />
			<Heading>Страница не найдена</Heading>
		</Text>
	)
}

export default NotFound
