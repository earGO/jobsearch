import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Flex, Icon} from '../../import'
import styled from 'styled-components'

import * as actions from './module/actions'
import * as selectors from './module/selectors'

const SortIcon = styled(({isActive, up, ...rest}) => (
	<Icon name="caret-down" {...rest} />
))`
	cursor: pointer;
	transform: ${props => props.up && 'rotate(180deg)'};
	opacity: ${props => (props.isActive ? 1 : 0.7)};
	color: ${props =>
		props.isActive ? props.theme.colors.primary : props.theme.colors.grey};

	&:hover {
		opacity: 1;
		color: ${props => props.theme.colors.primary};
	}
`

function SortableColumn({nick, ...props}) {
	const dispatch = useDispatch()
	const activeSort = useSelector(selectors.sort)

	const handleSort = (order, column) => () =>
		dispatch(actions.sort({order, column}))
	const isActive = order =>
		activeSort.column === nick && order === activeSort.order

	return (
		<Flex {...props} flexDirection="column">
			<SortIcon
				up
				isActive={isActive('asc')}
				onClick={handleSort('asc', nick)}
			/>
			<SortIcon
				isActive={isActive('desc')}
				onClick={handleSort('desc', nick)}
			/>
		</Flex>
	)
}

SortableColumn.defaultProps = {
	nick: ''
}

export default SortableColumn
