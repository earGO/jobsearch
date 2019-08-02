import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {Input, Icon, Box} from '../index'

const IconButton = styled(Box)`
	cursor: pointer;
	opacity: 0.7;
	&:hover {
		opacity: 1;
	}
`

function SearchInput({onChange, onSearch, placeholder, ...props}) {
	/**
	 * Компонент с иконкой поиска и очистки поля запроса.
	 * Доступ к содержимому поля запроса через проп value
	 * Дополнение функции управления нажатием на иконку поиска - проп onSearch
	 * Дополнение функции управления поиском по мере введения запрсоа - проп onChange
	 * */
	const [value, setValue] = React.useState('')
	const handleChange = value => {
		setValue(value)
		onChange && typeof onChange === 'function' && onChange(value)
		onSearch && typeof onSearch === 'function' && onSearch(value)
	}

	const handleClear = () => {
		setValue('')
		onChange && typeof onChange === 'function' && onChange('')
		onSearch && typeof onSearch === 'function' && onSearch('')
	}

	const handleSearch = value => {
		onSearch && typeof onSearch === 'function' && onSearch(value)
	}

	const prefix = (
		<IconButton onClick={handleSearch} pt={1}>
			{' '}
			<Icon name="search" />
		</IconButton>
	)
	const suffix = (
		<IconButton onClick={handleClear} pt={1}>
			<Icon name="close" />
		</IconButton>
	)

	return (
		<Box {...props}>
			<Input
				size="small"
				value={value}
				placeholder={placeholder}
				prefix={prefix}
				suffix={Boolean(value) ? suffix : null}
				onChange={handleChange}
			/>
		</Box>
	)
}

SearchInput.propTypes = {
	placeholder: PropTypes.string,
	onChange: PropTypes.func,
	value: PropTypes.string
}

SearchInput.defaultProps = {
	placeholder: 'Поиск',
	value: '',
	onChange: () => {}
}

export default SearchInput
