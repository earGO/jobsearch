import React from 'react'
import PropTypes from 'prop-types'
import {Box, Flex} from '../../import'
import FiedlItemLine from './FiedlItemLine'
import styled from 'styled-components'
import {FlexContainerBottomDivider} from '../../import'

const Bordered = styled(Flex)`
	padding-bottom: 32px;
`

function FieldsItem({children, field, ...props}) {
	if (field !== undefined) {
		return (
			<Bordered flexDirection={'column'}>
				{field.map((fieldline, key) => {
					return (
						<FlexContainerBottomDivider key={key}>
							<FiedlItemLine fieldline={fieldline} />
						</FlexContainerBottomDivider>
					)
				})}
			</Bordered>
		)
	} else {
		return null
	}
}

FieldsItem.propTypes = {
	field: PropTypes.array
}

FieldsItem.defaultProps = {
	field: []
}

export default FieldsItem
