import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {Scrollbars} from 'react-custom-scrollbars'
import {debounce} from 'throttle-debounce'
import {Flex, Box, Text, Collapse} from '../../import'

import CatalogListItem from './CatalogListItem'
import CollapseItem from './CollapseItem'

import {SearchInput} from '../../import'

import * as actions from './module/actions'
import * as selectors from './module/selectors'

function CatalogList() {
	const dispatch = useDispatch()
	const grouped = useSelector(selectors.groupedCatalogs)
	const searchQuery = useSelector(selectors.catalogsSearchQuery)

	const groups = Object.keys(grouped)

	const handleSearch = debounce(200, query =>
		dispatch(actions.searchCatalogs(query))
	)

	const getTitle = text => (
		<CollapseItem>
			<Text bold>{text}</Text>
		</CollapseItem>
	)

	const renderList = props => <CatalogListItem key={props.nick} {...props} />

	const renderGroup = group => (
		<Collapse.Panel key={group} title={getTitle(group)}>
			{grouped[group].map(renderList)}
		</Collapse.Panel>
	)

	return (
		<Flex
			pl={2}
			flexDirection="column"
			alignItems="stretch"
			style={{height: '100%'}}
		>
			<Box mb={2} pr={2}>
				<SearchInput
					value={searchQuery}
					onSearch={handleSearch}
					placeholder="Найти справочник"
				/>
			</Box>
			<Scrollbars style={{height: '100%'}}>
				<Box pr={2}>
					<Collapse defaultActiveKeys={groups}>
						{groups.map(renderGroup)}
					</Collapse>
				</Box>
			</Scrollbars>
		</Flex>
	)
}

export default withRouter(CatalogList)
