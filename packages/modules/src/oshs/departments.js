import React, {useState, useEffect, useMemo} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {push} from 'connected-react-router'
import {DynamicModuleLoader} from 'redux-dynamic-modules'
import {debounce} from 'throttle-debounce'
import * as R from 'ramda'

import oshsDepartmentsModule, {
	actions as oshsDepartmentsActions,
	selectors as oshsDepartmentsSelectors
} from './module/departments'
import {
	actions as oshsEmployeesActions,
	selectors as oshsEmployeesSelectors
} from './module/employees'
import {
	Flex,
	Box,
	Button,
	Icon,
	Text,
	Loading,
	FormModal,
	arrayToTree,
	Table,
	DropdownMenuButton,
	ButtonsOSHS,
	SearchInput
} from '../../import'
import CreateDepartmentForm from './CreateDepartmentForm'
import CreateEmployeeForm from './CreateEmployeeForm'
import UpdateDepartmentForm from './UpdateDepartmentForm'

function Departments() {
	const [
		CreateDepartmentFormIsOpen,
		setCreateDepartmentFormIsOpen
	] = useState(false)

	const [createEmployeeFormIsOpen, setCreateEmployeeFormIsOpen] = useState(
		false
	)

	const [
		UpdateDepartmentFormIsOpen,
		setUpdateDepartmentFormIsOpen
	] = useState(false)

	const [deleteDepartmentModal, setDeleteDepartmentModal] = useState(false)

	const [
		abortDeleteDepartmentModal,
		setAbortDeleteDepartmentModal
	] = useState(false)

	const dispatch = useDispatch()

	const allDepartments = useSelector(oshsDepartmentsSelectors.allDepartments)

	const selectedDepartment = useSelector(
		oshsDepartmentsSelectors.selectedDepartment
	)
	const employeesByDepartmentId = useSelector(
		oshsEmployeesSelectors.employeesByDepartmentId
	)
	const [expandedRowKeys, SetExpandedRowKeys] = useState([])

	const inputValue = useSelector(
		oshsDepartmentsSelectors.inputDepartmentValue
	)
	const searchDepartment = useSelector(
		oshsDepartmentsSelectors.searchDepartment
	)

	const debounceSearch = debounce(200, query =>
		dispatch(oshsDepartmentsActions.searchDepartment(query))
	)

	const handleInputSearch = query => {
		dispatch(oshsDepartmentsActions.searchDepartmentInputValue(query))
		debounceSearch(query)
	}

	const dropdownItems = [
		{
			name: ' Редактировать подразделение',
			onClick: () => setUpdateDepartmentFormIsOpen(true)
		},
		{
			name: ' Удалить подразделение',
			onClick: () =>
				checkEmployeesWhileDeleteDepartmentHandler(
					employeesByDepartmentId
				)
		}
	]

	const handleExpandedRowsChange = (expanded, rowData) => {
		SetExpandedRowKeys(
			expanded
				? [...expandedRowKeys, rowData.id]
				: expandedRowKeys.filter(id => id !== rowData.id)
		)
	}

	const checkEmployeesWhileDeleteDepartmentHandler = listEmployees => {
		listEmployees === null
			? setDeleteDepartmentModal(true)
			: setAbortDeleteDepartmentModal(true)
	}

	const showDepartments = (
		searchDepartmentArray,
		allDepartmentArray,
		inputValue
	) => {
		const list =
			inputValue &&
			searchDepartmentArray &&
			searchDepartmentArray.content &&
			searchDepartmentArray.content.length > 0
				? arrayToTree(searchDepartmentArray.content, {
						id: 'id',
						parentId: 'parentId'
				  })
				: allDepartmentArray && allDepartmentArray.length > 0
				? arrayToTree(allDepartmentArray, {
						id: 'id',
						parentId: 'parentId'
				  })
				: []

		return list
	}

	const departmentsTree = useMemo(
		() => showDepartments(searchDepartment, allDepartments, inputValue),
		[searchDepartment, allDepartments, inputValue]
	)

	const departmentsTableData = departmentsTree.rootItems

	useEffect(() => {
		const setParentsList = (departmentId, parentsList = []) => {
			if (allDepartments) {
				const department = allDepartments.find(
					element => element.id === departmentId
				)
				if (
					department &&
					department.parentId &&
					department.id !== department.parentId
				) {
					return setParentsList(department.parentId, [
						...parentsList,
						department.parentId
					])
				} else {
					return parentsList
				}
			}
			return parentsList
		}

		if (selectedDepartment && selectedDepartment.id) {
			const parentsList = setParentsList(selectedDepartment.id)
			const newList = R.uniq([...expandedRowKeys, ...parentsList])
			if (newList.length > expandedRowKeys.length) {
				SetExpandedRowKeys([...expandedRowKeys, ...parentsList])
			}
		}
	}, [selectedDepartment])

	const scrollHeight = document.body.clientHeight

	return (
		<DynamicModuleLoader modules={[oshsDepartmentsModule]}>
			{allDepartments && allDepartments.length > 0 ? (
				<>
					{createEmployeeFormIsOpen && (
						<CreateEmployeeForm
							close={() => setCreateEmployeeFormIsOpen(false)}
							isOpen={createEmployeeFormIsOpen}
						/>
					)}
					{CreateDepartmentFormIsOpen && (
						<CreateDepartmentForm
							isOpen={CreateDepartmentFormIsOpen}
							close={() => {
								setCreateDepartmentFormIsOpen(false)
							}}
						/>
					)}
					{UpdateDepartmentFormIsOpen && (
						<UpdateDepartmentForm
							isOpen={UpdateDepartmentFormIsOpen}
							close={() => setUpdateDepartmentFormIsOpen(false)}
						/>
					)}
					<FormModal
						isOpen={deleteDepartmentModal}
						title={`Удалить подразделение ${selectedDepartment &&
							selectedDepartment.name} ?`}
						close={() => {
							setDeleteDepartmentModal(false)
						}}
					>
						<ButtonsOSHS
							btn1Label={'Удалить'}
							btn2Label={'Отмена'}
							btn1OnClick={() => {
								dispatch(
									oshsDepartmentsActions.deleteDepartment(
										selectedDepartment &&
											selectedDepartment.id
									)
								)
								setDeleteDepartmentModal(false)
							}}
							btn2OnClick={() => {
								setDeleteDepartmentModal(false)
							}}
						/>
					</FormModal>
					<FormModal isOpen={abortDeleteDepartmentModal}>
						<Text
							bold
							color="red"
						>{`Удалить подразделение невозможно. Для удаления подразделения ${selectedDepartment &&
							selectedDepartment.name} удалите из него всех сотрудников`}</Text>
						<ButtonsOSHS
							btn1Hide
							btn2Label={'OK'}
							btn2OnClick={() => {
								setAbortDeleteDepartmentModal(false)
							}}
						/>
					</FormModal>
					<Flex flexDirection="column" pt={2} px={2}>
						<Flex>
							<Box width={1 / 2} mr={2} mb={2}>
								<Button
									block
									size="small"
									width={1 / 2}
									type="secondary"
									onClick={() =>
										setCreateEmployeeFormIsOpen(true)
									}
								>
									+ Создать сотрудника
								</Button>
							</Box>
							<Box width={1 / 2} ml={2} mb={2}>
								<Button
									style={{
										textOverflow: 'ellipsis',
										overflow: 'hidden'
									}}
									block
									size="small"
									type="secondary"
									onClick={() =>
										setCreateDepartmentFormIsOpen(true)
									}
								>
									+ Создать подразделение
								</Button>
							</Box>
						</Flex>
						<Box mt={2}>
							<SearchInput
								value={inputValue}
								onSearch={handleInputSearch}
								placeholder="Название подразделения"
								mb={2}
							/>
						</Box>

						{inputValue &&
						searchDepartment &&
						searchDepartment.content.length === 0 ? (
							<Text>По Вашему запросу ничего не найдено</Text>
						) : (
							<Box my={3}>
								<Table
									data={departmentsTableData}
									virtualized
									height={scrollHeight - 180}
									isTree
									rowKey="id"
									rowClassName={rowData => {
										if (
											selectedDepartment &&
											rowData.id === selectedDepartment.id
										)
											return 'activeClass'
									}}
									renderTreeToggle={(icon, rowData) => {
										return expandedRowKeys.includes(
											rowData.id
										) ? (
											<Icon
												style={{outlineStyle: 'none'}}
												name="chevron-up"
												onClick={icon.props.onClick}
											/>
										) : (
											<Icon
												name="chevron-down"
												onClick={icon.props.onClick}
											/>
										)
									}}
									expandedRowKeys={expandedRowKeys}
									onExpandChange={handleExpandedRowsChange}
									showHeader={false}
									onRowClick={rowData => {
										if (
											!selectedDepartment ||
											selectedDepartment.id !== rowData.id
										) {
											dispatch(
												push(`/oshs/${rowData.id}`)
											)
											dispatch(
												oshsEmployeesActions.clearInputValue()
											)
										}
										dispatch(
											oshsDepartmentsActions.clearDepartmentInputValue()
										)
									}}
								>
									<Table.Column flexGrow={1}>
										<Table.HeaderCell>
											Название подразделения
										</Table.HeaderCell>
										<Table.Cell dataKey="name" />
									</Table.Column>
									<Table.Column fixed="right" width={50}>
										<Table.HeaderCell>
											Название подразделения
										</Table.HeaderCell>
										<Table.Cell style={{padding: '0'}}>
											<DropdownMenuButton
												tableIcon
												iconName="ellipsis-h"
												items={dropdownItems}
											/>
										</Table.Cell>
									</Table.Column>
								</Table>
							</Box>
						)}
					</Flex>
				</>
			) : (
				<Loading overlay>Загрузка...</Loading>
			)}
		</DynamicModuleLoader>
	)
}

export default Departments
