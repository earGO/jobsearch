import React, {Component} from 'react'
import Flex from './Flex'
import propTypes from 'prop-types'
import styled, {css} from 'styled-components'
import {space, themeGet} from 'styled-system'
import {FIELD_DATA_PROP} from './Form'
import RadioGroup from './RadioGroup'
import Icon from './Icon'
import Text from './Text'
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

const background = ({checked, disabled, ...rest}) => {
	const {colors} = rest.theme
	const {radio} = colors
	const bgColor = checked && disabled ? radio.disabled : colors.lightGrey
	return `background: ${bgColor}`
}

const border = ({checked, disabled, ...rest}) => {
	const {colors} = rest.theme
	const {radio} = colors
	if (disabled) {
		return `border: solid 3px ${radio.disabled}`
	} else if (checked) {
		return `border: solid 3px ${radio.checked}`
	}
	return `border: solid 1px ${colors.black}`
}

const RadioInput = styled.input.attrs({type: 'radio'})`
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

export const StyledRadio = styled(Flex)`
  justify-content: center;
  align-items: center;
  transition: all ${themeGet('duration.fast', 300)};
  border-radius: 50%;
  ${size}
  ${background}
  ${border}
`

const Label = styled.label`
	display: inline-flex;
	align-items: center;
	cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
	${space}
`

const RadioContainer = styled(Flex)`
	display: inline-flex;
	align-content: center;
`

class Radio extends Component {
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
		console.log('Radio handleChange', {'this.props': this.props})
		this.props.onChange && this.props.onChange(checked, this.props.value)
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
				<RadioContainer onChange={this.handleChange}>
					<RadioInput
						{...omit(this.props, ['onChange', 'value'])}
						checked={this.state.checked}
						name={this.props.name}
						readOnly
					/>
					<StyledRadio
						checked={this.state.checked}
						size={this.props.size}
						disabled={this.props.disabled}
					>
						{/* Icon для выстраивания чекбоксов с разными border-width на base line  */}
						<Icon name="radio_button_unchecked" hidden />
					</StyledRadio>
				</RadioContainer>
				{/* this.props.children instead of text maybe? */}
				<Text inline regular ml={2}>
					{this.props.label}
				</Text>
			</Label>
		)
	}
}

Radio.propTypes = {
	/** Состояние радио баттона - выбран или нет. */
	checked: propTypes.bool,
	/** Возможность редактирования */
	disabled: propTypes.bool,
	/** Текст радио баттона */
	label: propTypes.string,
	/** Размер радио баттона */
	size: propTypes.oneOf(['small', 'medium', 'large']),
	/** Функция - хендлер, вызывается при клике на радио баттон */
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

Radio.Group = RadioGroup

/** @component */
export default Radio
