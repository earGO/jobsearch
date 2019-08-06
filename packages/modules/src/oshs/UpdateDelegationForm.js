import React, {useState, useEffect, useMemo} from 'react'
import {useSelector, useDispatch} from 'react-redux'

import {actions as oshsDelegationActions} from './module/delegation'
import {
	selectors as oshsEmployeesSelectors,
	actions as oshsEmployeesActions
} from './module/formSelects'

import {selectors as oshsDepartmentsSelectors} from './module/departments'

import {
	Form,
	arrayToTree,
	FormModal,
	InputOSHS,
	FixedField,
	FormSector,
	UploadFileOSHS,
	ButtonsOSHS,
	TreeSelectOSHS,
	SelectOSHS,
	DataPickerOSHS
} from '../../import'
import moment from 'moment'

const createForm = Form.create

function CreateDelegationForm({close, delegation, delegationTo, isOpen, form}) {
	const allDepartments = useSelector(oshsDepartmentsSelectors.allDepartments)
	const selectedDepartment = useSelector(
		oshsDepartmentsSelectors.selectedDepartment
	)
	const dispatch = useDispatch()
	const {
		employee,
		delegate,
		startDate,
		endDate,
		docName,
		docNumber
	} = delegation

	const [department, setDepartment] = useState(
		delegation
			? delegationTo
				? delegation.employee.department.id
				: delegation.delegate.department.id
			: null
	)

	useEffect(() => {
		if (department) {
			dispatch(
				oshsEmployeesActions.getEmployeesByDepartmentId(department)
			)
		}
	}, [])

	const employeesByDepartmentList = useSelector(
		oshsEmployeesSelectors.employeesByDepartmentId
	)
	const employeesLoading = useSelector(
		oshsEmployeesSelectors.employeesByDepartmentIdLoading
	)

	const {
		getFieldDecorator,
		validateFields,
		setFields,
		getFieldError,
		getFieldValue
	} = form

	const onSubmit = () => {
		validateFields((err, {department, ...values}) => {
			if (!err) {
				if (delegationTo) {
					const employee = delegation.employee
					const delegate = employeesByDepartmentList.find(
						e => e.id === values.delegate.id
					)
					dispatch(
						oshsDelegationActions.updateDelegation({
							...values,
							delegate,
							employee,
							id: delegation.id
						})
					)
				} else {
					const delegate = delegation.delegate
					const employee = employeesByDepartmentList.find(
						e => e.id === values.employee.id
					)
					dispatch(
						oshsDelegationActions.updateDelegation({
							...values,
							delegate,
							employee,
							id: delegation.id
						})
					)
				}

				close()
			} else {
				console.log(err)
			}
		})
	}

	const onDepartmentChange = value => {
		const dep = allDepartments.find(el => el.id === value)
		setDepartment(dep)
		if (dep) {
			dispatch(oshsEmployeesActions.getEmployeesByDepartmentId(dep.id))
			setFields({delegate: {value: ''}})
		}
	}

	const getEmployeeSelectOption = employee => ({
		value: employee.id,
		label: `${employee.surname} ${employee.name} ${employee.patronymic}`,
		id: employee.id
	})

	const getDepartmentOptions = department => ({
		value: department.id,
		label: department.name,
		id: department.id,
		parentId: department.parentId
	})

	const employeesOptions =
		employeesByDepartmentList && employeesByDepartmentList.length > 0
			? employeesByDepartmentList.map(getEmployeeSelectOption)
			: null

	const departmentOptions =
		allDepartments && allDepartments.length > 0
			? allDepartments.map(getDepartmentOptions)
			: null

	const departmentTreeData = departmentOptions
		? arrayToTree(departmentOptions, {id: 'id', parentId: 'parentId'})
				.rootItems
		: []

	const employeeSelectOption = useMemo(
		() => getEmployeeSelectOption(delegationTo ? delegate : employee),
		[employee, delegate]
	)

	const endDateOutsideRange = day =>
		Boolean(getFieldValue('startDate')) &&
		day.isBefore(getFieldValue('startDate'))

	const startDateOutsideRange = day =>
		Boolean(getFieldValue('endDate')) &&
		day.isAfter(getFieldValue('endDate'))

	if (isOpen && delegation) {
		return (
			<FormModal
				isOpen={isOpen}
				title={'Редактировать делегирование'}
				close={close}
			>
				<FormSector label="Делегирующий полномочия">
					{delegationTo ? (
						<FixedField label="Сотрудник">
							{employee.surname} {employee.name}{' '}
							{employee.patronymic}
						</FixedField>
					) : (
						<>
							{getFieldDecorator('department', {
								initialValue:
									employee.department &&
									employee.department.id,
								getValueFromEvent: value => {
									onDepartmentChange(value)
									return value
								}
							})(
								<TreeSelectOSHS
									label={'Подразделение'}
									treeData={departmentTreeData}
									defaultValue={
										employee.department &&
										employee.department.id
									}
								/>
							)}
							{getFieldDecorator('employee', {
								initialValue: employeeSelectOption,
								rules: [
									{
										required: true,
										message: 'Заполните поле "Сотрудник"'
									}
								]
							})(
								<SelectOSHS
									key={department}
									label={'*Сотрудник'}
									isLoading={employeesLoading}
									isDisabled={!department}
									options={employeesOptions || []}
									placeholder={
										department
											? ''
											: 'Выберете подразделение'
									}
									errors={getFieldError('employee')}
								/>
							)}
						</>
					)}
				</FormSector>
				<FormSector label="Принимающий полномочия">
					{!delegationTo ? (
						<FixedField label="Сотрудник">
							{delegate.surname} {delegate.name}{' '}
							{delegate.patronymic}
						</FixedField>
					) : (
						<>
							{getFieldDecorator('department', {
								initialValue:
									delegate.department &&
									delegate.department.id,
								getValueFromEvent: value => {
									onDepartmentChange(value)
									return value
								}
							})(
								<TreeSelectOSHS
									label={'Подразделение'}
									treeData={departmentTreeData}
									defaultValue={
										delegate.department &&
										delegate.department.id
									}
								/>
							)}
							{getFieldDecorator('delegate', {
								initialValue: employeeSelectOption,
								rules: [
									{
										required: true,
										message: 'Заполните поле "Сотрудник"'
									}
								]
							})(
								<SelectOSHS
									label={'*Сотрудник'}
									isLoading={employeesLoading}
									placeholder={delegate.id}
									isDisabled={!department}
									options={employeesOptions || []}
									placeholder={
										department
											? ''
											: 'Выберете подразделение'
									}
									errors={getFieldError('delegate')}
								/>
							)}
						</>
					)}
				</FormSector>
				<FormSector label="Общие сведения">
					{getFieldDecorator('startDate', {
						initialValue: startDate && moment(startDate)
					})(
						<DataPickerOSHS
							isOutsideRange={startDateOutsideRange}
							label={'Дата начала'}
						/>
					)}
					{getFieldDecorator('endDate', {
						initialValue: endDate && moment(endDate)
					})(
						<DataPickerOSHS
							isOutsideRange={endDateOutsideRange}
							label={'Дата окончания'}
						/>
					)}
					{getFieldDecorator('docName', {initialValue: docName})(
						<InputOSHS label={'Наименование документа основания'} />
					)}
					{getFieldDecorator('docNumber', {initialValue: docNumber})(
						<InputOSHS label={'№ документа основания'} />
					)}
					<UploadFileOSHS>Загрузить</UploadFileOSHS>
				</FormSector>
				<ButtonsOSHS
					btn1Label={'Сохранить'}
					btn2Label={'Отмена'}
					btn1OnClick={onSubmit}
					btn2OnClick={close}
				/>
			</FormModal>
		)
	}
	return ''
}

export default createForm()(CreateDelegationForm)
