import React from 'react'
import PropTypes from 'prop-types'
import {Box} from '../../import'
import styled from 'styled-components'

const ContentBoxStyle = styled(Box)`
	margin: 0 auto;
	width: ${props => props.contentwidth + 'px'};
	z-index: 0;
`

function TableContentBox({
	children,
	padding,
	justifyContent,
	alignItems,
	contentwidth,
	alignSelf,
	...props
}) {
	return (
		<ContentBoxStyle
			padding={padding}
			justifyContent={justifyContent}
			contentwidth={contentwidth}
			alignItems={alignItems}
			alignSelf={alignSelf}
			{...props}
		>
			{children}
		</ContentBoxStyle>
	)
}

TableContentBox.propTypes = {
	padding: PropTypes.number,
	justifyContent: PropTypes.string,
	contentwidth: PropTypes.number,
	alignSelf: PropTypes.string,
	alignItems: PropTypes.string
}

TableContentBox.defaultProps = {
	padding: 0,
	justifyContent: 'flex-start',
	contentwidth: 1120,
	alignSelf: 'center',
	alignItems: 'flex-start'
}

export default TableContentBox
