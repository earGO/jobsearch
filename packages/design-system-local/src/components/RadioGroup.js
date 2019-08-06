import React, {Component} from 'react'
import Box from './Box'
// import propTypes from 'prop-types'

class RadioGroup extends Component {
	constructor(props) {
		super(props)
		const activeValue = this.props.value
		const defaultValue = this.props.defaultValue
		this.state = {
			activeValue: activeValue || defaultValue || ''
		}
	}

	handleChange = newActiveValue => {
		this.setState({activeValue: newActiveValue})
		this.props.onChange && this.props.onChange(newActiveValue)
	}

	onRadioChange = (checked, value) => {
		if (checked && value) {
			this.handleChange(value)
		}
	}

	getChildren = () => {
		const {children} = this.props
		const {activeValue} = this.state
		return children.map(child => {
			const value = child.props.value
			const props = {
				key: value,
				checked: activeValue === value,
				onChange: this.onRadioChange
			}
			return React.cloneElement(child, props)
		})
	}

	render() {
		return <Box>{this.getChildren()}</Box>
	}
}

/** @component */
export default RadioGroup
