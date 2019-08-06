import React from 'react'
import Link from '../common/Link'
import {Box, Heading} from '../../import'

function Main() {
	return (
		<Box m={3}>
			<Heading mb={2}>ursip frontend modules</Heading>
			<Box m={2}>
				<Link bordered to="/nsi">
					nsi
				</Link>
			</Box>
			<Box m={2}>
				<Link bordered to="/project-card">
					project-card
				</Link>
			</Box>
			<Box m={2}>
				<Link bordered to="/lk">
					lk
				</Link>
			</Box>
			<Box m={2}>
				<Link bordered to="/oshs">
					ОШС
				</Link>
			</Box>
		</Box>
	)
}

export default Main
