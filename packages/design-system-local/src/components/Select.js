import * as React from 'react'
import propTypes from 'prop-types'
import RSelect, {components} from 'react-select'
import AsyncRSelect from 'react-select/lib/Async'
import {FixedSizeList as List} from 'react-window'
import styled, {ThemeConsumer, css} from 'styled-components'
import Icon from './Icon'
import Box from './Box'

/**
 * TODO:
 * 1) Combobox values remake/restyling.
 * 2) Option groups с виртуализацией. Сейчас заработают только в простом виде.
 */

const OPTION_HEIGHT = 38

const getSize = size => {
	switch (size) {
		case 'small':
			return 0
		case 'medium':
			return 1
		case 'large':
			return 2
		default:
			return 1
	}
}

const customStyles = {
	placeholder: (base, props) => {
		const {systemTheme, size} = props.selectProps
		const sizeIndex = getSize(size)
		return {
			...base,
			fontSize: systemTheme.fontSizes[sizeIndex],
			color: systemTheme.colors.black
		}
	},
	input: (base, props, third) => {
		// Can't access system theme here... ?
		return {...base, fontSize: 14, color: '#3a3a3a'}
	},
	valueContainer: (base, props) => {
		const {systemTheme, size} = props.selectProps
		const sizeIndex = getSize(size)

		return {
			...base,
			fontSize: systemTheme.fontSizes[sizeIndex],
			color: systemTheme.colors.black,
			paddingLeft: systemTheme.space[3]
		}
	},
	control: (base, props) => {
		const {systemTheme} = props.selectProps
		const {isDisabled, isFocused, menuIsOpen} = props
		// Disabled styles
		if (isDisabled) {
			return {
				...base,
				borderColor: 'transparent',
				backgroundColor: systemTheme.colors.input.disabled,
				cursor: 'not-allowed'
			}
		}
		if (isFocused || menuIsOpen) {
			return {
				...base,
				borderColor: systemTheme.colors.input.focus,
				backgroundColor: systemTheme.colors.white,
				boxShadow: 'none'
			}
		}
		// Default
		return {
			...base,
			'&:hover': {
				borderColor: systemTheme.colors.black
			},
			borderColor: 'transparent',
			backgroundColor: systemTheme.colors.lightGrey
		}
	},
	menuList: (base, props) => {
		const {systemTheme} = props.selectProps
		// Пока скроллов тоже нет в макетах.
		return {
			...base,
			'&::-webkit-scrollbar': {
				height: '8px',
				backgroundColor: 'transparent',
				width: '4px'
			},
			'&::-webkit-scrollbar-thumb': {
				backgroundColor: `${systemTheme.colors.scrollbar}`,
				borderRadius: '8px'
			},
			scrollbarColor: `${systemTheme.colors.scrollbar} transparent`,
			scrollbarWidth: 'thin'
		}
	},
	indicatorSeparator: base => ({...base, width: '0px'}),
	option: (base, props) => {
		const {isSelected, isFocused} = props
		const {systemTheme, size} = props.selectProps
		const sizeIndex = getSize(size)
		const baseline = {
			...base,
			color: systemTheme.colors.black,
			fontSize: systemTheme.fontSizes[sizeIndex]
		}
		if (isSelected) {
			return {...baseline, backgroundColor: systemTheme.colors.lightGrey}
		}
		// Пока одинаковые, нет в макетах.
		if (isFocused) {
			return {...baseline, backgroundColor: systemTheme.colors.lightGrey}
		}
		return baseline
	}
}

const DropdownIndicator = props => {
	const {systemTheme} = props.selectProps

	// VERY FUCKING HACKY WAY TO DO THAT
	const {innerProps, ...rest} = props
	const withPadding = {...innerProps, style: {paddingRight: 16}}
	return (
		<components.DropdownIndicator {...rest} innerProps={withPadding}>
			<Icon
				name="arrow_drop_down"
				size={0}
				color={systemTheme.colors.black}
			/>
		</components.DropdownIndicator>
	)
}

// MenuList - выпадающее меню, открывается при клике на селект.
// Подход говно, надо бы рефакторнуть.
// #TODO - refactor this stuff.
const scrollStyles = ({theme}) => {
	return css`
		&::-webkit-scrollbar {
			height: 8px;
			background-color: transparent;
			width: 4px;
		}
		&::-webkit-scrollbar-thumb {
			background-color: ${theme.colors.scrollbar};
			border-radius: 10px;
		}
		scrollbar-color: ${theme.colors.scrollbar} transparent;
		scrollbar-width: thin;
	`
}

const StyledList = styled(List)`
	${scrollStyles}
`

const MenuList = optionHeight =>
	/** Класс, чтобы ArrowUp/ArrowDown скроллили List */
	class MenuList extends React.Component {
		state = {
			currentIndex: null
		}

		list = React.createRef()

		static getDerivedStateFromProps({children}) {
			const _children = Array.isArray(children) ? children : [children]
			const currentIndex = Math.max(
				_children.findIndex(({props: {isFocused}}) => isFocused),
				0
			)
			return {
				currentIndex
			}
		}

		componentDidUpdate() {
			const {currentIndex} = this.state
			currentIndex && this.list.current.scrollToItem(currentIndex)
		}

		render() {
			const {options, children, maxHeight, getValue} = this.props
			const [value] = getValue()
			const initialOffset = options.indexOf(value) * optionHeight
			if (!children.length) {
				/* No option message */
				return <Box>{children}1</Box>
			}
			return (
				<StyledList
					ref={this.list}
					height={maxHeight}
					itemCount={children.length}
					itemSize={optionHeight}
					initialScrollOffset={initialOffset}
				>
					{({index, style}) => (
						<div style={style}>{children[index]}</div>
					)}
				</StyledList>
			)
		}
	}

/**
 * Используется для выбора значения из списка.
 */
class Select extends React.Component {
	withSystemTheme = (size, systemTheme) => theme => {
		let controlHeight = 0
		// #TODO Probably will break in combobox + size===small.
		// https://github.com/JedWatson/react-select/issues/1322
		switch (size) {
			case 'small':
				controlHeight = 32
				break
			case 'large':
				controlHeight = 48
				break
			default:
				controlHeight = 40
		}

		return {
			...theme,
			borderRadius: systemTheme.radii[1],
			// can override colors with systemTheme here later?
			colors: theme.colors,
			spacing: {
				controlHeight,
				baseUnit: size === 'small' ? 2 : 4,
				menuGutter: size === 'small' ? 4 : 8
			}
		}
	}

	render() {
		const {optionHeight, size, async, virtualized} = this.props
		const selectProps = {
			styles: customStyles,
			components: {
				DropdownIndicator,
				MenuList: virtualized
					? MenuList(optionHeight || OPTION_HEIGHT)
					: components.MenuList
			},
			...this.props
		}
		return (
			<ThemeConsumer>
				{systemTheme =>
					async ? (
						<AsyncRSelect
							{...selectProps}
							systemTheme={systemTheme}
							theme={this.withSystemTheme(size, systemTheme)}
						/>
					) : (
						<RSelect
							{...selectProps}
							systemTheme={systemTheme}
							theme={this.withSystemTheme(size, systemTheme)}
						/>
					)
				}
			</ThemeConsumer>
		)
	}
}

Select.displayName = 'Select'

Select.defaultProps = {
	loadingMessage: () => 'Загрузка...',
	noOptionsMessage: () => 'Нет данных.',
	placeholder: 'Выбрать'
}

Select.propTypes = {
	/** Размер */
	size: propTypes.oneOf(['small', 'medium', 'large']),
	/** Можно ли выбирать несколько значений */
	isMulti: propTypes.bool,
	/** Доступен ли поиск. */
	isSearchable: propTypes.bool,
	/** Находится ли селект в состоянии загрузки */
	isLoading: propTypes.bool,
	/** Можно ли сбросить значение по кнопке */
	isClearable: propTypes.bool,
	value: propTypes.oneOfType([
		propTypes.object,
		propTypes.arrayOf(propTypes.object)
	]),
	/** Текст, который выводится при загрузке */
	loadingMessage: propTypes.func,
	/** Текст, который выводится при отсутствии опция для выбора. */
	noOptionsMessage: propTypes.func,
	/** Содержимое селекта по умолчанию. */
	placeholder: propTypes.string
}

/** @component */
export default Select
