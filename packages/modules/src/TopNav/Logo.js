import React from 'react'
import {Heading, Flex} from '../../import'
import styled from 'styled-components'

const Hoverer = styled(Flex)`
	transition: all 0.15s ease-in;
	cursor: pointer;
	&:hover {
		transform: scale(1.025);
	}
`

function FullLogo({history, ...props}) {
	const handleLogoClick = () => history.push('/')
	return (
		<Hoverer alignItems={'center'} pt={2} onClick={handleLogoClick}>
			<img
				width={'24px'}
				height={'24px'}
				src={require('./assets/gerbSmall.png')}
			/>
			<Heading tag={'h3'} color={'white'} ml={2} mr={3}>
				AИC BIM
			</Heading>
		</Hoverer>
	)
}

export default FullLogo
