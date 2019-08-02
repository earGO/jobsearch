import React from 'react'
import theme from '../theme'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {Icon, Text, Flex} from '../index'

const Container = styled(Flex)`
	cursor: pointer;
	transition: all;
	transition-timing-function: ${theme.timingFunctions.easeInOut};
	transition-duration: ${theme.duration.fast};
	&:hover {
		transform: scale(1.0005);
		opacity: 0.75;
	}
`

const LabeledIconButton = ({
	iconName,
	caption,
	color,
	size,
	fontSize,
	onClick,
	...props
}) => {
	return (
		<Container onClick={onClick}>
			<Icon name={iconName} color={color} size={size} />
			<Flex flexDirection={'column'} justifyContent={'center'} {...props}>
				<Text color={color} fontSize={fontSize}>
					{caption}
				</Text>
			</Flex>
		</Container>
	)
}

LabeledIconButton.propTypes = {
	iconName: PropTypes.string,
	size: PropTypes.number,
	color: PropTypes.string,
	caption: PropTypes.string,
	fontSize: PropTypes.number
}

LabeledIconButton.defaultProps = {
	iconName: 'error',
	size: 24,
	color: 'black',
	caption: 'Default text',
	fontSize: 2
}

export default LabeledIconButton
