import React from 'react'
import styled from 'styled-components'
import {Button, Icon, Flex} from '../../../import'
import FormItemWrapper from './FormItemWrapper'

const Field = styled(Button)`
	text-align: start;
`

function UploadFileOSHS({label, pb, width, children}) {
	const wrapperProps = {label, pb, width}
	return (
		<FormItemWrapper {...wrapperProps}>
			<Field type="secondary" block>
				<Flex justifyContent="space-between" pr={2}>
					{children}{' '}
					<Icon name="arrow-up" top={2} style={{fontSize: 16}} />
				</Flex>
			</Field>
		</FormItemWrapper>
	)
}

export default UploadFileOSHS
