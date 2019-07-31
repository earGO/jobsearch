import React from 'react'
import {Select} from '../../../import'
import FormItemWrapper from './FormItemWrapper'

function FormSelect({label, errors, pb, width, ...rest}) {
	const wrapperProps = {label, errors, pb, width}
	return (
		<FormItemWrapper {...wrapperProps}>
			<Select
				styles={{menuPortal: base => ({...base, zIndex: 9999})}}
				menuPortalTarget={document.body}
				menuPosition={'absolute'}
				menuPlacement={'bottom'}
				{...rest}
			/>
		</FormItemWrapper>
	)
}

export default FormSelect
