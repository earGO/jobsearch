
import moment from 'moment';
import 'moment/locale/ru';
import ru_RU from 'antd/lib/locale-provider/ru_RU';
import {Box} from '../../import'
import {DatePicker,LocaleProvider  } from 'antd'
import React, {Component} from 'react'
import styled from 'styled-components'


moment.locale('ru')

// TBD - подумать.
const Wrapper = styled(Box)`
	input:hover:not(:focus) {
		border: 1px solid #3a3a3a !important;
		background: #ffffff !important;
	}
	input:not(:focus) {
		background: #f5f5f5 !important;
	}
`

/** Используется для получение данных типа "Дата" от пользователя.*/
class Datepicker extends Component {
	constructor(props) {
		super(props)
		if (!this.props.id) {
			throw new Error('id prop обязателен для компонента.')
		}
		this.state = {
			value:
				props.value === undefined
					? props.value
					: props.defaultValue || null
		}
	}

	static getDerivedStateFromProps(nextProps) {
		if ('value' in nextProps) {
			return {
				value: nextProps.value
			}
		}
		return null
	}

	handleChange = newDate => {
		this.setState({
			value: newDate
		})
		this.props.onChange && this.props.onChange(newDate)
	}

	render() {
		const {value, onChange, ...rest} = this.props
		return (
			<Wrapper>
				<LocaleProvider locale={ru_RU}>
				<DatePicker
					block // 100% ширины
					// required props
					id={this.props.id}
					value={this.state.value} // momentPropTypes.momentObj or null
					onChange={this.handleChange} // PropTypes.func.isRequired
					{...rest}
				/>
				</LocaleProvider>
			</Wrapper>
		)
	}
}

/** @component */
export default Datepicker
