import React from 'react'
import PropTypes from 'prop-types'
import {Flex, Box, Text} from '../../import'
import styled from 'styled-components'

const IconSized = styled(Box)`
	transform: scale(0.68);
	font-size: 12px;
	padding: 0;
	margin: 0;
	position: relative;
	top: 20%;
`
const FlexedItem = styled(Flex)`
	transition: all 0.4s ease-in-out;
	padding: 0;
	margin: 0;
	&:hover {
		transform: scale(1.01);
		cursor: pointer;
	}
`
const IconedItemText = styled(Text)`
	padding-left: 4px;
	padding-right: 24px;
`

function OptionWithIcon({icon, option}) {
	/*some private methods*/
	return (
		<FlexedItem
			id={'compare'}
			flexDirection={'row'}
			alignItems={'flex-end'}
		>
			<IconSized>
				<i className={'material-icons'}>{icon}</i>
			</IconSized>
			<IconedItemText fontSize={1}>{option}</IconedItemText>
		</FlexedItem>
	)
}

OptionWithIcon.propTypes = {
	icon: PropTypes.string,
	option: PropTypes.string
}

OptionWithIcon.defaultProps = {
	icon: 'question',
	option: 'somethingWrong'
}

export default OptionWithIcon
