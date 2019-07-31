import React, {Component} from 'react'
import propTypes from 'prop-types'
import styled, {css} from 'styled-components'
import {themeGet} from 'styled-system'
import Absolute from './Absolute'
import {FIELD_DATA_PROP} from './Form'

const noop = () => {}

const tracksBackground = props => {
	const {checked, disabled} = props
	if (disabled) {
		return css`
			background: ${themeGet('colors.grey', '#b5b5b5')};
		`
	}
	if (checked) {
		return css`
			background: ${themeGet('colors.lightBlue', '#0091ea')};
		`
	}
	return css`
		background: ${themeGet('colors.white', '#ffffff')};
	`
}

const tracksBorder = ({checked, disabled}) => {
	if (!checked && !disabled) {
		return css`
			border-color: ${themeGet('colors.black', '#3a3a3a')};
		`
	}
	return `border-color: transparent`
}

const handleBackground = ({disabled}) => {
	return css`
		background: ${disabled
			? themeGet('colors.lightGrey', '#f5f5f5')
			: themeGet('color.white', '#ffffff')};
	`
}

const handleBorder = ({checked, disabled}) => {
	if (!checked && !disabled) {
		return css`
			border-color: ${themeGet('colors.black', '#3a3a3a')};
		`
	}
	return 'border-color: transparent'
}

const handlePosition = ({checked, disabled, ...rest}) => {
	if (checked) {
		return css`
			top: 2px;
			left: 10px;
		`
	}
	return css`
		top: 2px;
		left: 2px;
	`
}

const cursor = ({disabled}) => {
	return disabled ? 'cursor: not-allowed;' : 'cursor: pointer;'
}

const ToggleHandle = styled(Absolute)`
  width: 10px;
  height: 10px;
  border-width: 1px;
  border-style: solid;
  border-radius: 8px;
  ${handleBackground}
  ${handlePosition}
  ${handleBorder}
  transition: left ${themeGet('durations.normal', '300ms')};
`

const ToggleTrack = styled.button.attrs({
	role: 'switch'
})`
  position: relative;
  outline: none;
  width: 24px;
  height: 16px;
  border-width: 1px;
  border-style: solid;
  border-radius: ${themeGet('radii[2]', '8px')};
  ${tracksBackground}
  ${tracksBorder}
  ${cursor}
  :focus {
    /* Выглядит не очень конечно */
    border-color: ${themeGet('color.blue', '#1e88e5')};
    ${ToggleHandle} {
      border-color: ${props =>
			!props.checked && themeGet('color.blue', '#1e88e5')};
    }
  }
`

/** Используется так же, как и Checkbox, но для единственного значения. */
class Toggle extends Component {
	constructor(props) {
		super(props)
		this.state = {
			checked:
				typeof props.checked !== 'undefined' ? props.checked : false
		}
	}

	static getDerivedStateFromProps(nextProps) {
		// If controlled by form
		if (nextProps[FIELD_DATA_PROP]) {
			return {
				checked: nextProps.value
			}
		}
		if ('checked' in nextProps) {
			return {
				checked: nextProps.checked
			}
		}
		return null
	}

	handleChange = event => {
		event.preventDefault()
		const flippedValue = !this.state.checked
		this.setState({checked: flippedValue})
		this.props.onChange && this.props.onChange(flippedValue)
	}

	render() {
		const {checked} = this.state
		const {disabled} = this.props
		return (
			<ToggleTrack
				checked={checked}
				disabled={disabled}
				onClick={disabled ? noop : this.handleChange}
			>
				<ToggleHandle checked={checked} disabled={disabled} />
			</ToggleTrack>
		)
	}
}

Toggle.propTypes = {
	/** Состояние тумблера. */
	checked: propTypes.bool,
	/** Возможность редактирования */
	disabled: propTypes.bool,
	/** Функция - хендлер, вызывается при клике на тумблер. */
	onChange: propTypes.func
}

/** @component */
export default Toggle
