// THEMING IS HARD WITH THIS ONE.
// Сначала - темы.
import {DatePicker,LocaleProvider} from 'antd'
import moment from 'moment';
import 'moment/locale/ru';
import ru_RU from 'antd/lib/locale-provider/ru_RU';
import React, {useState} from 'react'
import styled from 'styled-components'
import {DateRangePicker} from 'react-dates'
import {Box, Flex, Text,Icon} from '../../import'
import 'moment/locale/ru'
import TestCustomArrowIcon from './TestCustomArrowIcon'
// https://github.com/airbnb/react-dates/blob/master/src/theme/DefaultTheme.js

/* Since air-bnb datepicker is awesome as hell, but won't give you much control
 * on it's styles on a dates widget itself, I'll use overlaying component
 * to hide original styles and to have full control over a widget display
 * in user interface */

// Проставим локаль чтобы календарь был на руском.

moment.locale('ru')

const {RangePicker} = DatePicker

// Here's a wrapper to control styles of a widget
const Wrapper = styled(Box)`
	input:hover:not(:focus) {
		border: 1px solid #3a3a3a !important;
		background: #ffffff !important;
	}
	input:not(:focus) {
		background: #f5f5f5 !important;
	}
`

// And here-s the overlaying component styles
const Overlay = styled(Flex)`
	cursor: pointer;
	width: 216px;
	height: 42px;
	border-radius: 4px;
	background-color: #f5f5f5;
	z-index: 2;
	position: absolute;
	top: -1px;
	&:hover:not(:focus) {
		border: 1px solid #3a3a3a !important;
	}
	&:not(:focus) {
		background: #f5f5f5 !important;
	}
`

/* The Icon component imported with some STRANGE bounding box
 * And it was unchangeable (this doesn't happens
 * in DesighSystem docs and in storybook btw - so here goes positioner box */
const OverlayIconBox = styled(Flex)`
	width: 28px;
	position: absolute;
	left: -36px;
	top: 8px;
`

const OverlayIconCloseBox = styled(Flex)`
	width: 28px;
	position: absolute;
	right: -218px;
	top: 0px;
`

/* A wrapper for presise date message positioning */
const OverlayDates = styled(Box)`
	position: absolute;
	top: 12px;
	left: 16px;
`

/* A function to format moment() object to needed string format */
const formatDate = momentDate => {
	let d = momentDate.toDate()
	return [d.getDate(), d.getMonth() + 1, d.getFullYear()]
		.map(n => (n < 10 ? `0${n}` : `${n}`))
		.join('/')
}

/** Используется для получение данных типа "Дата" от пользователя.*/

function Datepicker({handleDateFilterChange, ...props}) {
	/* Three variables to get data from calendar and to capture click/focus events on
	 * overlaying compinent and send them to datePicker component. */
	const [stateStartDate, setStartDate] = useState(null)
	const [stateEndDate, setEndDate] = useState(null)
	const [focusedInput, setFocusedInput] = useState(null)
	const {value, onChange, ...rest} = props

	const handleLocalDateChange = (startDate, endDate, criteria) => {
		setStartDate(startDate)
		setEndDate(endDate)
		handleDateFilterChange(startDate, endDate, criteria)
	}
	return (
		<Wrapper>
			<Overlay
				onClick={() => setFocusedInput('startDate')}
				justifyContent={'flex-end'}
			>
				<OverlayDates>
					{stateStartDate && stateEndDate ? (
						<Text fontSize={'12px'}>
							{formatDate(stateStartDate)} -{' '}
							{formatDate(stateEndDate)}
						</Text>
					) : (
						<Text fontSize={`12px`}>дд/мм/гггг</Text>
					)}
				</OverlayDates>

				<OverlayIconBox>
					{stateStartDate == null || stateEndDate == null ? (
						<Icon name={'calendar_today'} />
					) : (
						<OverlayIconCloseBox
							onClick={() => {
								handleLocalDateChange(null, null, null)
								setFocusedInput(null)
							}}
						>
							<Icon name={'close'} />
						</OverlayIconCloseBox>
					)}
				</OverlayIconBox>
			</Overlay>
			<LocaleProvider locale={ru_RU}>
			<RangePicker
				block // 100% ширины
				{...rest}
				// Required props
				startDateId="startDate"
				endDateId="endDate"
				startDate={stateStartDate}
				endDate={stateEndDate}
				onCalendarChange={({startDate, endDate}) => {
					handleLocalDateChange(startDate, endDate, 'dateCreated')
				}}
				focusedInput={focusedInput}
				onFocusChange={focusedInput => {
					setFocusedInput(focusedInput)
				}}
				// Other props
				hideKeyboardShortcutsPanel
				small
				enableOutsideDays
				reopenPickerOnClearDates={false}
				customArrowIcon={<TestCustomArrowIcon />}
			/>
			</LocaleProvider>
		</Wrapper>
	)
}

export default Datepicker
