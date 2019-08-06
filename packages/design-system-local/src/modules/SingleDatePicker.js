import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Box} from '../index'
import moment from 'moment'
import 'moment/locale/ru'
import ru_RU from 'antd/lib/locale-provider/ru_RU'
import {DatePicker, LocaleProvider} from 'antd'

import styled from 'styled-components'

const Wrapper = styled(Box)`
	input {
		width: ${props => props.width + 'px'};
		height: ${props => props.height + 'px'};
	}
	input:hover:not(:focus) {
		border: 1px solid #0091ea !important;
		background: #ffffff !important;
	}
	input:not(:focus) {
		background: #f5f5f5 !important;
	}
`

moment.locale('ru')

function SingleDatePicker({
	onChange,
	id,
	value,
	dateFormat,
	width,
	height,
	placeholder,
	...rest
}) {
	const [localValue, setLocalValue] = useState(moment(new Date(), dateFormat))

	const handleChange = newDate => {
		setLocalValue(newDate)
		onChange && onChange(newDate)
	}

	return (
		<Wrapper width={width} height={height}>
			<LocaleProvider locale={ru_RU}>
				<DatePicker
					block // 100% ширины
					value={localValue} // momentPropTypes.momentObj or null
					onChange={handleChange} // PropTypes.func.isRequired
					format={dateFormat}
					placeholder={placeholder}
					{...rest}
				/>
			</LocaleProvider>
		</Wrapper>
	)
}
SingleDatePicker.propTypes = {
	value: PropTypes.array,
	onChange: PropTypes.func.isRequired,
	dateFormat: PropTypes.string,
	width: PropTypes.number,
	height: PropTypes.number,
	placeholder: PropTypes.string
}

SingleDatePicker.defaultProps = {
	value: [],
	dateFormat: 'DD/MM/YYYY',
	width: 192,
	height: 40,
	placeholder: 'дд/мм/гггг'
}

SingleDatePicker.displayName = 'SingleDatePicker'

export default SingleDatePicker
