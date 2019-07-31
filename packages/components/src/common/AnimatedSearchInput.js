import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {Input, Icon, Box,ResizableInput} from '../../import'

const ClearButton = styled(Icon)`
	cursor: pointer;
	opacity: 0.7;
	&:hover {
		opacity: 1;
	}
`
const SearchIcon = styled(Icon)`
	opacity: 0.7;
`

function AnimatedSearchInput({
	onChange,
	onSearch,
	placeholder,
	shrinkWidth,
	growWidth,
	...props
}) {
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

	const prefix = <SearchIcon name="search" />
	const suffix = (
		<ClearButton name="times" fontSize={0} onClick={handleClear} />
	)

	return (
		<Box {...props}>
			<ResizableInput
				size="small"
				value={value}
				placeholder={placeholder}
				prefix={prefix}
				suffix={Boolean(value) ? suffix : null}
				onChange={handleChange}
				shrinkWidth={shrinkWidth}
				growWidth={growWidth}
			/>
		</Box>
	)
}

AnimatedSearchInput.propTypes = {
	placeholder: PropTypes.string,
	onChange: PropTypes.func,
	value: PropTypes.string,
	shrinkWidth: PropTypes.number,
	growWidth: PropTypes.number
}

AnimatedSearchInput.defaultProps = {
	placeholder: 'Поиск',
	value: '',
	onChange: () => {},
	shrinkWidth: 40,
	growWidth: 120
}

export default AnimatedSearchInput
