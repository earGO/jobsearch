import React from 'react'
import styled from 'styled-components'
import {Button, Flex, Text,NotificationsCounter} from '../../import'

const Hoverer = styled(Flex)`
	transition: all 0.15s ease-in;
	&:hover {
		transform: scale(1.025);
	}
`

function Notifications({props}) {
	/*some private methods*/
	return (
		<Hoverer
			ml={'24px'}
			mt={2}
			alignItems={'center'}
			justifyContent={'space-between'}
		>
			<NotificationsCounter size={8} count={30} />
			<Button type={'flat'}>
				<Text color={'white'}>Уведомления</Text>
			</Button>
		</Hoverer>
	)
}

Notifications.propTypes = {}

Notifications.defaultProps = {}

export default Notifications
