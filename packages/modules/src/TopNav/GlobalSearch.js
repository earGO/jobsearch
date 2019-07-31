import React from 'react'
import {SearchInput, Flex} from '../../import'

function GlobalSearch({props}) {
	/*some private methods*/
	return (
		<Flex mt={2}>
			<SearchInput width={560} />
		</Flex>
	)
}

GlobalSearch.propTypes = {}

GlobalSearch.defaultProps = {}

export default GlobalSearch
