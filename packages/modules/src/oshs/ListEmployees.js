import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {
	Card,
	Flex,
	Text,
	Box,
	Scrollbars,
	Loading,
	DropdownMenuButton,
	FormModal,
	ButtonsOSHS
} from '../../import'
import {push} from 'connected-react-router'

import AccountLogo from '../assets/icons/baseline-account_circle-24px.svg'
import styled from 'styled-components'
import {
	selectors as oshsEmployeesSelectors,
	actions as oshsEmployeesActions
} from './module/employees'
import {actions as oshsDepartmentsActions} from './module/departments'
import CreateDelegationForm from './CreateDelegationForm'
import UpdateEmployeeForm from './UpdateEmployeeForm'

const AccountIcon = styled.img`
	user-select: none;
`

export default function ListEmployees(props) {
	const {match} = props
	const employeesByDepartmentId = useSelector(
		oshsEmployeesSelectors.employeesByDepartmentId
	)
	const employeesListLoading = useSelector(
		oshsEmployeesSelectors.employeesLoading
	)
	const inputValue = useSelector(oshsEmployeesSelectors.inputValue)
	const searchQueryEmployees = useSelector(
		oshsEmployeesSelectors.searchQueryEmployees
	)
	const departmentIdURL = match.params.departmentId
	const dispatch = useDispatch()
	const selectedEmployee = useSelector(
		oshsEmployeesSelectors.selectedEmployee
	)

	useEffect(() => {
		dispatch(
			oshsDepartmentsActions.setSelectedDepartmentId(departmentIdURL)
		)
	}, [departmentIdURL])

	useEffect(
		() => () =>
			dispatch(oshsDepartmentsActions.clearSelectedDepartmentId()),
		[]
	)

	useEffect(() => {
		dispatch(
			oshsEmployeesActions.getEmployeesByDepartmentId(departmentIdURL)
		)
	}, [departmentIdURL])

	const [
		CreateDelegationFormEmployee,
		setCreateDelegationFormEmployee
	] = useState(false)
	const [updateFormEmployee, setupdateFormEmployee] = useState(false)
	const [deleteFormEmployee, setDeleteFormEmployee] = useState(false)

	const dropdownItems = employee => [
		{
			name: ' Делегировать полномочия',
			onClick: () => setCreateDelegationFormEmployee(employee)
		},
		{
			name: ' Редактировать сотрудника',
			onClick: () => setupdateFormEmployee(employee)
		},
		{
			name: ' Уволить сотрудника',
			onClick: () => setDeleteFormEmployee(true)
		}
	]

	const showListEmployees = (searchList, departmentList, inputValue) => {
		const list =
			inputValue &&
			searchList &&
			searchList.content &&
			searchList.content.length > 0
				? searchList.content
				: departmentList && departmentList.length > 0
				? departmentList
				: []

		const listEmployees = list.map(e => (
			<Card
				key={e.id}
				my={1}
				bg="highlight"
				p={3}
				style={
					selectedEmployee &&
					selectedEmployee.id &&
					e.id === selectedEmployee.id
						? {
								backgroundColor: '#b1b1b1',
								color: 'white',
								cursor: 'pointer'
						  }
						: {cursor: 'pointer'}
				}
				onClick={() => {
					if (!selectedEmployee || e.id !== selectedEmployee.id)
						dispatch(push(`/oshs/${e.department.id}/${e.id}`))
					dispatch(oshsDepartmentsActions.clearDepartmentInputValue())
					dispatch(oshsEmployeesActions.clearInputValue())
				}}
			>
				<Flex justifyContent="space-between">
					<Flex>
						<Box>
							<AccountIcon
								height={50}
								src={AccountLogo}
								alt="Logo"
							/>
						</Box>
						<Box mx={2}>
							<Text
								style={
									selectedEmployee &&
									selectedEmployee.id &&
									e.id === selectedEmployee.id
										? {color: 'white'}
										: null
								}
								fontSize={2}
							>
								{e.surname} {e.name} {e.patronymic}
							</Text>
							<Text fontSize={1}>{e.position}</Text>
						</Box>
					</Flex>
					<Box>
						<DropdownMenuButton
							iconName="ellipsis-v"
							items={dropdownItems(e)}
						/>
					</Box>
				</Flex>
			</Card>
		))
		return listEmployees
	}

	return (
		<>
			{CreateDelegationFormEmployee && (
				<CreateDelegationForm
					isOpen={CreateDelegationFormEmployee}
					close={() => setCreateDelegationFormEmployee(false)}
					employee={CreateDelegationFormEmployee}
				/>
			)}

			{updateFormEmployee && (
				<UpdateEmployeeForm
					employee={updateFormEmployee}
					isOpen={updateFormEmployee}
					title={'Редактировать сотрудника'}
					close={() => {
						setupdateFormEmployee(false)
					}}
				/>
			)}
			{updateFormEmployee && (
				<UpdateEmployeeForm
					close={() => setupdateFormEmployee(false)}
					employee={updateFormEmployee}
				/>
			)}
			{deleteFormEmployee && (
				<FormModal
					isOpen={deleteFormEmployee}
					title={`Уволить сотрудника "${selectedEmployee &&
						selectedEmployee.surname} ${selectedEmployee &&
						selectedEmployee.name} ${selectedEmployee &&
						selectedEmployee.patronymic}"?`}
					close={() => {
						setDeleteFormEmployee(false)
					}}
				>
					<ButtonsOSHS
						btn1Label={'Уволить'}
						btn2Label={'Отмена'}
						btn1OnClick={() => {
							dispatch(
								oshsEmployeesActions.deleteEmployee(
									selectedEmployee && selectedEmployee.id
								)
							)
							setDeleteFormEmployee(false)
						}}
						btn2OnClick={() => {
							setDeleteFormEmployee(false)
						}}
					/>
				</FormModal>
			)}
			<Scrollbars autoHide autoHideTimeout={100}>
				<Flex flexDirection="column" mr={3}>
					{employeesListLoading ? (
						<Loading />
					) : inputValue &&
					  searchQueryEmployees &&
					  searchQueryEmployees.content.length === 0 ? (
						<Text>По Вашему запросу ничего не найдено</Text>
					) : employeesByDepartmentId &&
					  employeesByDepartmentId.length > 0 ? (
						showListEmployees(
							searchQueryEmployees,
							employeesByDepartmentId,
							inputValue,
							dispatch
						)
					) : searchQueryEmployees &&
					  searchQueryEmployees.content &&
					  searchQueryEmployees.content.length > 0 ? (
						showListEmployees(
							searchQueryEmployees,
							employeesByDepartmentId,
							inputValue,
							dispatch
						)
					) : null}
				</Flex>
			</Scrollbars>
		</>
	)
}
