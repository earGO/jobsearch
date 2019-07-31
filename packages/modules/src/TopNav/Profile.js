import React from 'react'
import styled from 'styled-components'
import {Icon, Flex, Relative} from '../../import'
import {useDispatch} from 'react-redux'
import * as loginActions from '../login/module/actions'

const Hoverer = styled(Flex)`
	transition: all 0.15s ease-in;
	cursor: pointer;
	&:hover {
		transform: scale(1.025);
	}
`

function Profile({...props}) {
	const dispatch = useDispatch()
	const handleLogout = () => {
		dispatch(loginActions.logout())
	}
	return (
		<Hoverer mt={2} onClick={handleLogout}>
			<Icon name={'account_circle'} color={'white'} size={28} />
			<Relative top={'6px'}>
				<Icon name={'arrow_drop_down'} color={'white'} size={24} />
			</Relative>
		</Hoverer>
	)
}

Profile.propTypes = {}

Profile.defaultProps = {}

export default Profile
