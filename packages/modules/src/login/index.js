import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import PropTypes from 'prop-types'
import {
	Absolute,
	Relative,
	Card,
	Box,
	Button,
	Text,
	Flex,
	Icon
} from '../../import'
import {Redirect} from 'react-router-dom'
import {Helmet} from 'react-helmet'
import icon from '../assets/icon.svg'
import * as actions from './module/actions'
import {selectors} from './module/selectors'
import {DynamicModuleLoader} from 'redux-dynamic-modules'
import {InputLogin, LogoWrapper, Background} from './style'
import * as LoginModule from './module'
import request from '../request'

function Login({...props}) {
	/* State methods */
	const [login, setLogin] = useState('')
	const [pwd, setPwd] = useState('')

	/* Redux methods */
	const dispatch = useDispatch()
	const error = useSelector(selectors.authError)
	const loading = useSelector(selectors.authLoading)
	const loginStatus = useSelector(selectors.loginStatus)
	const authAction = (login, pwd) => dispatch(actions.auth(login, pwd))

	const loginHandler = e => {
		setLogin(e)
	}

	const passwordHandler = e => {
		setPwd(e)
	}

	const submitAuth = e => {
		e.preventDefault()
		authAction(login, pwd)
		setLogin('')
		setPwd('')
	}

	return (
		<Box>
			<Background />
			<Flex flexDirection="column" alignItems="center">
				<Helmet>
					<title>Логин</title>
				</Helmet>
				<Flex
					flexDirection="column"
					justifyContent="center"
					alignItems="center"
					width="100%"
					height="100vh"
					maxWidth={360}
				>
					<Relative width="100%">
						<Text
							fontSize={5}
							color="highlight"
							align="center"
							pb={80}
						>
							Сервис поддержки функций <br /> участников
							реализации <br /> ТИМ-проектов
						</Text>
						<Box>
							<Absolute top={-52} width="100%">
								<Flex justifyContent="center">
									<LogoWrapper
										bg="white"
										height={90}
										width={90}
										boxShadowSize="md"
									>
										<img src={icon} height={26} />
									</LogoWrapper>
								</Flex>
							</Absolute>

							<Card
								width="100%"
								bg="white"
								p={4}
								boxShadowSize="xl"
							>
								<form onSubmit={submitAuth}>
									<Box mt={4}>
										<Text py={2}>Логин</Text>
										<InputLogin
											width={1}
											value={login}
											onChange={loginHandler}
										/>
									</Box>

									<Box my={3}>
										<Text py={2}>Пароль</Text>
										<InputLogin
											type="password"
											width={1}
											value={pwd}
											onChange={passwordHandler}
										/>
									</Box>

									<Flex
										justifyContent="center"
										width="100%"
										flexDirection="column"
									>
										{loading ? (
											<Button mt={4} disabled block>
												<Icon
													spin
													name="spinner"
													mr={2}
													top={1}
												/>
												Loading...
											</Button>
										) : (
											<Button
												mt={4}
												onClick={submitAuth}
												block
											>
												Войти
											</Button>
										)}
										{error && (
											<Text
												mt={2}
												color="error"
												align="center"
											>
												{error !== null
													? 'Неправильный логин или пароль'
													: ' '}
											</Text>
										)}
									</Flex>
								</form>
							</Card>
						</Box>
					</Relative>

					{loginStatus ? <Redirect to="/nsi" /> : null}
				</Flex>
			</Flex>
		</Box>
	)
}

Login.propTypes = {
	authAction: PropTypes.func,
	error: PropTypes.any,
	loading: PropTypes.bool,
	loginStatus: PropTypes.bool
}

Login.baseRoute = LoginModule.baseRoute
Login.selectors = selectors
Login.module = LoginModule.default

export default Login
