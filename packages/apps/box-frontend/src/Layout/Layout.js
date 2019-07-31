import React from 'react'
import {Scrollbars} from 'react-custom-scrollbars'
import {Flex, Box, Text, TopNav, Login} from '../import'
import {withRouter} from 'react-router-dom'
import {useSelector} from 'react-redux'

/**
 * Main application layout
 */
function Layout({children, width, maxWidth, history, ...props}) {
	const handleLogoClick = () => history.push('/')
	const year = new Date().getFullYear()
	const isAuth = useSelector(Login.selectors.loginStatus)

	const NavigationComponent = () => {
		if (isAuth) {
			return <TopNav history={history} />
		} else {
			return null
		}
	}

	const FooterComponent = () => {
		if (isAuth) {
			return (
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
			)
		} else {
			return null
		}
	}

	return (
		<Flex
			height="100vh"
			flexDirection="column"
			alignItems="stretch"
			{...props}
		>
			<NavigationComponent />
			<Box flex={1} mx="auto" width="100%" style={{overflow: 'hidden'}}>
				{children}
			</Box>
			<FooterComponent />
		</Flex>
	)
}

Layout.defaultProps = {
	maxWidth: 1600,
	// Responsive breackpoints
	width: ['99%', '99%', '99%', '99%']
}

export default withRouter(Layout)
