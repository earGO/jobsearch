import styled from 'styled-components'
import {Card, Input, Flex} from '../../import'
import background from '../assets/background.png'

export const InputLogin = styled(Input)`
	background-color: ${({theme}) => theme.colors.semiLightGrey};
	&:hover {
		border-color: ${props => props.theme.colors.lightBlue};
	}
`

export const Background = styled(Flex)`
	background: ${({theme}) => theme.colors.primary};
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	background-image: url(${background});
	filter: blur(2px);
	position: fixed;
	left: 0;
	right: 0;
	z-index: 0;
	width: 100%;
	height: 100%;
`

export const LogoWrapper = styled(Card)`
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	z-index: 1;
`
