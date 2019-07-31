import React from 'react'
import styled from 'styled-components'
import {Box} from '../../../import'

function intersperseSpace(list) {
	return list.reduce((current, item) => [...current, ' ', item], []).slice(1)
}

const getHelpMessage = errors => {
	if (errors) {
		return intersperseSpace(
			errors.map(e => {
				return e
			})
		)
	}
	return ''
}

const HelpWrapper = styled(Box)`
	color: ${props => props.theme.colors.error};
	font-size: ${props => props.theme.fontSizes[1]};
`

const HelpMessage = ({errors}) => {
	return <HelpWrapper color="red">{getHelpMessage(errors)}</HelpWrapper>
}

export default HelpMessage
