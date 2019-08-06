import React from 'react'
import {Text, Box, Divider} from '../../../import'

function FormSector({label, children}) {
	return (
		<Box>
			<Text py={1}>{label}</Text>
			{children}
			<Divider my={1} />
		</Box>
	)
}

export default FormSector
