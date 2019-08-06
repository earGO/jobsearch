import React, {useEffect} from 'react'
import {Text, Flex, Box, Card, Heading, Divider, Scrollbars} from '../../import'
import {useSelector, useDispatch} from 'react-redux'
import {
	selectors as oshsEmployeesSelectors,
	actions as oshsEmployeesActions
} from './module/employees'
import DelegationCard from './DelegationCard'

import AccountLogo from '../assets/icons/baseline-account_circle-24px.svg'
import CommentIcon from '../assets/icons/baseline-comment-24px.svg'
import EmailIcon from '../assets/icons/outline-email-24px.svg'
import PhoneIcon from '../assets/icons/baseline-call-24px.svg'

function isEmpty(obj) {
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) return false
	}
	return true
}

export default function EmployeeCard(props) {
	const dispatch = useDispatch()
	const {match} = props

	const employeeId = match.params.employeeId
	useEffect(() => {
		dispatch(oshsEmployeesActions.setSelectedEmployeeId(employeeId))
	}, [employeeId])

	useEffect(
		() => () => dispatch(oshsEmployeesActions.setSelectedEmployeeId()),
		[]
	)

	const employeeInfo = useSelector(oshsEmployeesSelectors.selectedEmployee)
	return isEmpty(employeeInfo) ? (
		<Flex>
			<Text>Выберите сотрудника из списка</Text>
		</Flex>
	) : (
		<Scrollbars autoHide autoHideTimeout={100}>
			<Card p={3}>
				<Flex flexDirection="column">
					<Flex>
						<Flex width={1 / 2} flexDirection="column">
							<Heading tag="h4">
								{employeeInfo.surname} {employeeInfo.name}{' '}
								{employeeInfo.patronymic}
							</Heading>
							<Text>{employeeInfo.departmentName}</Text>
							<Text color="gray">{employeeInfo.position}</Text>
						</Flex>
						<Flex justifyContent="center" width={1 / 2}>
							<img
								src={AccountLogo}
								height={170}
								width={170}
								alt="Photo"
							/>
						</Flex>
					</Flex>
					<Flex>
						<Flex width={1 / 2} flexDirection="column">
							<Flex my={2} flexDirection="column">
								<Box>
									<img
										src={EmailIcon}
										height={20}
										alt="Email"
									/>{' '}
									<Text>Почта </Text>
								</Box>
								<Flex py={1} justifyContent="space-between">
									<Box>Рабочая: </Box>
									<Box>
										<a
											href={`mailto:${employeeInfo.email}`}
										>
											{employeeInfo.email}
										</a>
									</Box>
								</Flex>
							</Flex>
							<Flex my={2} flexDirection="column">
								<Box>
									<img
										src={PhoneIcon}
										height={20}
										alt="Phone"
									/>{' '}
									<Text> Телефон </Text>
								</Box>
								<Flex py={1} justifyContent="space-between">
									<Box>Мобильный: </Box>
									<Box>{employeeInfo.phone}</Box>
								</Flex>
							</Flex>
							<Flex my={2} flexDirection="column">
								<Box>
									<img
										src={CommentIcon}
										height={20}
										alt="Phone"
									/>{' '}
									<Text> Примечания </Text>
								</Box>
								<Box>{employeeInfo.note}</Box>
							</Flex>
							<Flex>
								<Box width={1 / 2}>
									<Text>Кабинет:</Text>
								</Box>
								<Box width={1 / 2}>
									<Text>{employeeInfo.room}</Text>
								</Box>
							</Flex>
						</Flex>
						<Flex width={1 / 2} />
					</Flex>
					{(employeeInfo.delegationsTo &&
						employeeInfo.delegationsTo.length) ||
					(employeeInfo.delegationsFrom &&
						employeeInfo.delegationsFrom.length) ? (
						<Divider />
					) : (
						''
					)}
					{employeeInfo.delegationsTo &&
					employeeInfo.delegationsTo.length ? (
						<Text fontSize={2} pb={2}>
							Полномочия делегированы на:
						</Text>
					) : (
						''
					)}
					{employeeInfo.delegationsTo &&
					employeeInfo.delegationsTo.length
						? employeeInfo.delegationsTo.map(delegation => (
								<DelegationCard
									key={delegation.id}
									delegation={delegation}
									delegationTo
								/>
						  ))
						: ''}
					{employeeInfo.delegationsFrom &&
					employeeInfo.delegationsFrom.length ? (
						<Text fontSize={2} py={2}>
							Полномочия приняты от:
						</Text>
					) : (
						''
					)}
					{employeeInfo.delegationsFrom &&
					employeeInfo.delegationsFrom.length
						? employeeInfo.delegationsFrom.map(delegation => (
								<DelegationCard
									key={delegation.id}
									delegation={delegation}
								/>
						  ))
						: ''}
				</Flex>
			</Card>
		</Scrollbars>
	)
}
