import React from 'react'
import {useDispatch} from 'react-redux'
import {Flex, Box, Text, Button} from '@ursip/design-system'
import {withRouter} from 'react-router-dom'

import Logo from './Logo'
import {actions as loginActions} from '../login/login-duck'
import pkg from '../../../package.json'

/**
 * Main application layout
 */
function Layout({children, width, maxWidth, history, ...props}) {
	const dispatch = useDispatch()
	const handleLogoClick = () => history.push('/')
	const handleLogout = () => {
		dispatch(loginActions.logout())
	}
	const isLoginPage = props.location.pathname === '/login'

	const year = new Date().getFullYear()

	return (
		<Flex
			height="100vh"
			flexDirection="column"
			alignItems="stretch"
			{...props}
		>
			{!isLoginPage && (
				<Box bg="primary">
					<Flex
						px={2}
						mx="auto"
						alignItems="center"
						height={53}
						style={{maxWidth}}
					>
						<Box>
							<Logo
								style={{cursor: 'pointer'}}
								onClick={handleLogoClick}
							/>
						</Box>
						<Box ml={3}>
							<Text color="white" fontSize={2}>
								{pkg.description}
							</Text>
						</Box>
						<Box ml="auto">
							<Button
								style={{color: 'white', borderColor: 'white'}}
								size="small"
								type="bordered"
								onClick={handleLogout}
							>
								Выход
							</Button>
						</Box>
					</Flex>
				</Box>
			)}
			<Box
				flex={1}
				mx="auto"
				width="100%"
				style={{overflow: 'hidden', maxWidth}}
			>
				{children}
			</Box>
			{!isLoginPage && (
				<Box bg="lightGrey">
					<Box
						p={2}
						mx="auto"
						style={{maxWidth}}
						justifyContent="space-between"
					>
						<Text color="darkGrey" fontSize={0} align="right">
							URSiP &copy; {year}
						</Text>
					</Box>
				</Box>
			)}
		</Flex>
	)
}

Layout.defaultProps = {
	maxWidth: 1800,
	// Responsive breackpoints
	width: ['99%', '99%', '99%', '99%']
}

export default withRouter(Layout)
