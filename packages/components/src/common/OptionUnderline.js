import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

/* A button to render when tab is notselected */
const UnderlinedButton = styled.button`
	height: 58px;
	background-color: Transparent;
	background-repeat: no-repeat;
	border: none;
	cursor: pointer;
	overflow: hidden;
	outline: none;
	position: relative;
	margin-right: 6px;
	top: 1px;
	font-size: 13px;

	&:hover {
		border-bottom-style: solid;
		border-bottom-width: 1px;
		border-color: ${props => props.theme.colors[props.bottomColor]};
		cursor: pointer;
	}
`
/* A button to render when tab is selected */
const SelectedUnderlinedButton = styled.button`
	height: 58px;
	background-color: Transparent;
	background-repeat: no-repeat;
	border: none;
	cursor: pointer;
	overflow: hidden;
	outline: none;
	position: relative;
	margin-right: 6px;
	top: 1px;
	font-size: 13px;
	border-bottom-style: solid;
	border-bottom-width: 1px;
	border-color: ${props => props.theme.colors[props.bottomColor]};
`

function OptionUnderline({
	children,
	bottomColor,
	tabSelected,
	tabId,
	selectTab,
	...props
}) {
	/*if tab is selected - render this button*/
	if (tabId === tabSelected) {
		return (
			<SelectedUnderlinedButton
				bottomColor={bottomColor}
				onClick={() => selectTab(tabId)}
			>
				{children}
			</SelectedUnderlinedButton>
		)
	} else {
		/*if tab is not selected - render this button*/
		return (
			<UnderlinedButton
				bottomColor={bottomColor}
				onClick={() => selectTab(tabId)}
			>
				{children}
			</UnderlinedButton>
		)
	}
}

OptionUnderline.propTypes = {
	bottomColor: PropTypes.string
}

OptionUnderline.defaultProps = {
	bottomColor: 'primary'
}

export default OptionUnderline
