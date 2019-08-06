import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {throttle, debounce} from 'throttle-debounce'
import {Flex, Box} from '../../import'

import * as selectors from './module/selectors'
import * as actions from './module/actions'

import CatalogHeader from './CatalogHeader'
import CatalogTable from './CatalogTable'
import {SearchInput} from '../../import'

function Catalog({match}) {
	const dispatch = useDispatch()
	const currentCatalogName = useSelector(selectors.currentCatalogName)

	React.useEffect(() => {
		if (currentCatalogName !== match.params.nick) {
			dispatch(actions.setCurrentCatalog(match.params.nick))
		}
	}, [dispatch, match.params.nick, currentCatalogName])

	const onChange = throttle(100, () => {
		dispatch(actions.setElementsLoading(true))
	})

	const handleSearch = debounce(200, query => {
		dispatch(actions.searchElements(query))
		dispatch(actions.setElementsLoading(false))
	})

	return (
		<Flex
			flexDirection="column"
			alignItems="stretch"
			style={{height: '100%'}}
		>
			<Box>
				<CatalogHeader mb={2} />
				<Flex
					className="controls"
					justifyContent="space-between"
					alignItems="center"
					mb={2}
				>
					<Box width="40%">
						<SearchInput
							onChange={onChange}
							onSearch={handleSearch}
							placeholder="Поиск по справочнику"
						/>
					</Box>
				</Flex>
			</Box>
			<Box height="100%">
				<CatalogTable />
			</Box>
		</Flex>
	)
}

export default Catalog
