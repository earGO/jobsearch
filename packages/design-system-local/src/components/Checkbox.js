import React, {Component} from 'react'
import Flex from './Flex'
import Icon from './Icon'
import Text from './Text'
import propTypes from 'prop-types'
import styled, {css} from 'styled-components'
import {space, themeGet} from 'styled-system'
import {FIELD_DATA_PROP} from './Form'
import omit from 'lodash/omit'

const size = ({size = 'medium'}) => {
	const sizes = {
		small: {
			width: '14px',
			height: '14px'
		},
		medium: {
			width: '16px',
			height: '16px'
		},
		large: {
			width: '20px',
			height: '20px'
		}
	}
	return css(sizes[size])
}

// const iconSize = ({size = 'medium'}) => {
// 	const scales = {
// 		small: 0.6,
// 		medium: 0.7,
// 		large: 0.8
// 	}
// 	return `transform: scale(${scales[size]});`
// }

const background = ({checked, disabled, ...rest}) => {
	const {checkbox} = rest.theme.colors
	const getColor = (checked, disabled) => {
		if (disabled) {
			return checkbox.disabled
		}
		return checked ? checkbox.checked : checkbox.unchecked
	}
	return `background: ${getColor(checked, disabled)}`
}

const border = ({checked, disabled, ...rest}) => {
	const {colors} = rest.theme
	return !(checked || disabled) && `border: 1px solid ${colors.black}`
}

const CheckboxInput = styled.input.attrs({type: 'checkbox'})`
	border: 0;
	clip: rect(0 0 0 0);
	clippath: inset(50%);
	height: 1px;
	margin: -1px;
	overflow: hidden;
	padding: 0;
	position: absolute;
	white-space: nowrap;
	width: 1px;
`

export const StyledCheckbox = styled(Flex)`
  justify-content: center;
  align-items: center;
  border-radius: ${themeGet('radii[0]', 4)}px;
  transition: all ${themeGet('duration.fast', 300)};
  ${size}
  ${background}
  ${border}

  ${CheckboxInput}:focus + & {
    box-shadow: 0 0 0 1px ${props => props.theme.colors.blue};
  }
`

const Label = styled.label`
	display: inline-flex;
	align-items: center;
	cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
	${space}
`

const CheckboxContainer = styled(Flex)`
	display: inline-flex;
	align-content: center;
`

/** Используется для выбора одного или нескольких значений из представленных вариантов */
class Checkbox extends Component {
	constructor(props) {
		super(props)
		this.state = {
			checked:
				typeof props.checked !== 'undefined' ? props.checked : false
		}
	}

	handleChange = event => {
		const {checked} = event.target
		this.setState({checked})
		this.props.onChange && this.props.onChange(checked, event)
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

	render() {
		return (
			<Label {...this.props}>
				<CheckboxContainer onChange={this.handleChange}>
					<CheckboxInput
						{...omit(this.props, ['onChange', 'value'])}
						checked={this.state.checked}
						readOnly
					/>
					<StyledCheckbox
						checked={this.state.checked}
						size={this.props.size}
						disabled={this.props.disabled}
					>
						{this.state.checked ? (
							<Icon name="check" color="white" size={0} />
						) : (
							<Icon name="check" color="white" hidden size={0} />
						)}
					</StyledCheckbox>
				</CheckboxContainer>
				{/* this.props.children instead of text maybe? */}
				<Text inline regular ml={2}>
					{this.props.label}
				</Text>
			</Label>
		)
	}
}

Checkbox.propTypes = {
	/** Состояние чекбокса - выбран или нет. */
	checked: propTypes.bool,
	/** Возможность редактирования */
	disabled: propTypes.bool,
	/** Текст чекбокса. */
	label: propTypes.oneOfType([
		propTypes.number,
		propTypes.string,
		propTypes.node
	]),
	/** Размер чекбокса */
	size: propTypes.oneOf(['small', 'medium', 'large']),
	/** Функция - хендлер, вызывается при клике на чекбокс */
	onChange: propTypes.func,
	/** margin */
	m: propTypes.oneOfType([
		propTypes.number,
		propTypes.string,
		propTypes.array
	]),
	/** margin-top*/
	mt: propTypes.oneOfType([
		propTypes.number,
		propTypes.string,
		propTypes.array
	]),
	/** margin-right*/
	mr: propTypes.oneOfType([
		propTypes.number,
		propTypes.string,
		propTypes.array
	]),
	/** margin-bottom*/
	mb: propTypes.oneOfType([
		propTypes.number,
		propTypes.string,
		propTypes.array
	]),
	/** margin-left*/
	ml: propTypes.oneOfType([
		propTypes.number,
		propTypes.string,
		propTypes.array
	]),
	/** margin-left and margin-right */
	mx: propTypes.oneOfType([
		propTypes.number,
		propTypes.string,
		propTypes.array
	]),
	/** margin-top and margin-bottom */
	my: propTypes.oneOfType([
		propTypes.number,
		propTypes.string,
		propTypes.array
	]),
	/** padding */
	p: propTypes.oneOfType([
		propTypes.number,
		propTypes.string,
		propTypes.array
	]),
	/** padding-top*/
	pt: propTypes.oneOfType([
		propTypes.number,
		propTypes.string,
		propTypes.array
	]),
	/** padding-right*/
	pr: propTypes.oneOfType([
		propTypes.number,
		propTypes.string,
		propTypes.array
	]),
	/** padding-bottom*/
	pb: propTypes.oneOfType([
		propTypes.number,
		propTypes.string,
		propTypes.array
	]),
	/** padding-left*/
	pl: propTypes.oneOfType([
		propTypes.number,
		propTypes.string,
		propTypes.array
	]),
	/** padding-left and padding-right */
	px: propTypes.oneOfType([
		propTypes.number,
		propTypes.string,
		propTypes.array
	]),
	/** padding-top and padding-bottom */
	py: propTypes.oneOfType([
		propTypes.number,
		propTypes.string,
		propTypes.array
	])
}

/** @component */
export default Checkbox
