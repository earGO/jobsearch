import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import themeGet from '@styled-system/theme-get'
import {Text} from '../../import'

const Counter = styled.div`
	display: flex;
	width: ${props => props.size * 3 + 'px'};
	height: ${props => props.size * 2 + 'px'};
	background-color: ${themeGet('colors.input.error', '#f5f5f5')};
	border-radius: ${props => props.size + 'px'};
	margin: auto;
	justify-content: center;
	align-items: center;
`

function NotificationsCounter({color, count, size, ...props}) {
	return (
		<Counter size={size} color={color}>
			<Text color={'white'} fontSize={'12px'}>
				{count}
			</Text>
		</Counter>
	)
}

NotificationsCounter.propTypes = {
	count: PropTypes.number,
	color: PropTypes.string,
	size: PropTypes.number
}

NotificationsCounter.defaultProps = {
	count: 30,
	size: 8,
	color: 'warning'
}

export default NotificationsCounter
