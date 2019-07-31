import React from 'react'
import styled from 'styled-components'
import {Button} from '../../../import'
import FormItemWrapper from './FormItemWrapper'

const Fild = styled(Button)`
	cursor: initial;
	text-align: start;
`

function FixedField({label, pb, width, children}) {
	const wrapperProps = {label, pb, width}
	return (
		<FormItemWrapper {...wrapperProps}>
			<Fild type="secondary" block>
				{children}
			</Fild>
		</FormItemWrapper>
	)
}

export default FixedField
