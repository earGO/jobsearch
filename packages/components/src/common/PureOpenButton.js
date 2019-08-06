import React from 'react'
import PropTypes from 'prop-types'
import styled, {css} from 'styled-components'
import {Flex, Icon, Box} from '../../import'
import themeGet from '@styled-system/theme-get'

const noop = () => {}

const AnimatedScaledIcon = styled(Box)`
	color: ${themeGet('color.black', '#080808')};
	transition: transform ${themeGet('duration.normal', '300ms')};
	${props => props.isOpen && `transform: rotate(180deg);`}
`

function PureOpenButton({...props}) {
	return (
		<div>
			<p>PureOpenButton stateless</p>
		</div>
	)
}

PureOpenButton.propTypes = {}

PureOpenButton.defaultProps = {}

export default PureOpenButton
