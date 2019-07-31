import React from 'react'
import PropTypes from 'prop-types'
import {Box, Flex, Heading, Text} from '../../import'
import styled from 'styled-components'

const SecondField = styled(Box)`
	padding-top: 8px;
	padding-bottom: 8px;
	width: 472px;
`

const FirstField = styled(Box)`
	width: 256px;
	padding-right: 8px;
	padding-top: 8px;
	padding-bottom: 8px;
`

function FiedlItemLine({fieldline}) {
	if (fieldline.type === 'group') {
		return (
			<Flex flexDirection={'row'} justifyContent={'space-between'}>
				<FirstField>
					<Heading tag={'h4'}>{fieldline.name}</Heading>
				</FirstField>
			</Flex>
		)
	} else {
		return (
			<Flex flexDirection={'row'} justifyContent={'space-between'}>
				<FirstField>
					<Text>{fieldline.name}</Text>
				</FirstField>
				<SecondField>
					<Text color={'#727070'}>{fieldline.value}</Text>
				</SecondField>
			</Flex>
		)
	}
}

FiedlItemLine.propTypes = {
	fieldline: PropTypes.object
}

FiedlItemLine.defaultProps = {
	fieldline: {
		name: "Data haven't came from backend",
		value: "Data haven't came from backend"
	}
}

export default FiedlItemLine
