import React from 'react'
import styled from 'styled-components'
import {Input} from '../../../import'
import FormItemWrapper from './FormItemWrapper'

const InputOshs = styled(Input)`
	background-color: white;
	border-color: ${({theme}) => theme.colors.primary};
`

function FormInput({label, errors, pb, ...rest}) {
	const wrapperProps = {label, errors, pb}
	return (
		<FormItemWrapper {...wrapperProps}>
			<InputOshs {...rest} />
		</FormItemWrapper>
	)
}

export default FormInput
