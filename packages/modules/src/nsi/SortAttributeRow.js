import React from 'react'
import styled from 'styled-components'
import {Flex, Box, Icon} from '../../import'

const Button = styled(Icon)`
	cursor: pointer;
	color: ${props => props.theme.colors.grey};
	&:hover {
		color: ${props => props.theme.colors.primary};
	}
`
function SortAttributeRow({row, onChange, attributes}) {
	const name = 'orders'

	const {nick, orders} = row
	const onClick = action => () => {
		const actions = {
			increment: index => index + 1,
			decrement: index => index - 1
		}

		let attributeIndex = attributes.findIndex(item => item.nick === nick)
		let nexAttributeIndex = actions[action](attributeIndex)

		let updatedAttribute = {
			...attributes[attributeIndex],
			[name]: nexAttributeIndex
		}

		let nextUpdatedAttribute = {
			...attributes[nexAttributeIndex],
			[name]: attributeIndex
		}

		let attributesCopy = attributes.slice()
		attributesCopy[attributeIndex] = updatedAttribute
		attributesCopy[nexAttributeIndex] = nextUpdatedAttribute

		onChange(attributesCopy.sort((a, b) => a.orders - b.orders))
	}

	return (
		<Flex
			style={{width: '100%'}}
			flexDirection="column"
			alignItems="center"
			justifyContent="center"
		>
			{orders > 0 && (
				<Box>
					<Button name="arrow-up" onClick={onClick('decrement')} />
				</Box>
			)}
			{orders < attributes.length - 1 && (
				<Box>
					<Button name="arrow-down" onClick={onClick('increment')} />
				</Box>
			)}
		</Flex>
	)
}

SortAttributeRow.defaultProps = {
	onChange: value => console.log(value) || value,
	value: null,
	maxCount: 0
}

export default SortAttributeRow
