import React from 'react'
import Datapicker from '../Datapicker'
import FormItemWrapper from './FormItemWrapper'

function DatapickerOSHS({label, errors, pb, ...rest}) {
	const wrapperProps = {label, errors, pb}
	return (
		<FormItemWrapper {...wrapperProps}>
			<Datapicker {...rest} />
		</FormItemWrapper>
	)
}

export default DatapickerOSHS
