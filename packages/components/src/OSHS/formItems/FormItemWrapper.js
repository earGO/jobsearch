import React from 'react'
import {Box, Text} from '../../../import'
import ErrorMessages from './errorMessage'

function FormItemWrapper({label, errors, pb, width, children}) {
	return (
		<Box width={width || '100%'} pb={pb || 2}>
			<Text my={2} color="slategray">
				{label}
			</Text>
			{children}
			<ErrorMessages errors={errors} />
		</Box>
	)
}

export default FormItemWrapper
