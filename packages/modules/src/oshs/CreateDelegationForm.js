import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'

import {actions as oshsDelegationActions} from './module/delegation'
import {
	selectors as oshsEmployeesSelectors,
	actions as oshsEmployeesActions
} from './module/formSelects'
import {selectors as oshsDepartmentsSelectors} from './module/departments'

import {
	Form,
	FormModal,
	InputOSHS,
	ButtonsOSHS,
	TreeSelectOSHS,
	SelectOSHS,
	DataPickerOSHS,
	FixedField,
	UploadFileOSHS,
	FormSector,
	arrayToTree
} from '../../import'

const createForm = Form.create

function CreateDelegationForm({close, employee, isOpen, form}) {
	const allDepartments = useSelector(oshsDepartmentsSelectors.allDepartments)
	const selectedDepartment = useSelector(
		oshsDepartmentsSelectors.selectedDepartment
	)
	const dispatch = useDispatch()

	const [department, setDepartment] = useState(
		selectedDepartment ? selectedDepartment.id : null
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
				const delegate = employeesByDepartmentList.find(
					e => e.id === values.delegate.id
				)
				dispatch(
					oshsDelegationActions.createDelegation({
						...values,
						delegate,
						employee
					})
				)
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

	const employeesOptions =
		employeesByDepartmentList && employeesByDepartmentList.length > 0
			? employeesByDepartmentList.map(e => ({
					value: e.id,
					label: `${e.surname} ${e.name} ${e.patronymic}`,
					id: e.id
			  }))
			: null

	const departmentOptions =
		allDepartments && allDepartments.length > 0
			? allDepartments.map(e => ({
					value: e.id,
					label: e.name,
					id: e.id,
					parentId: e.parentId
			  }))
			: null

	const departmentTreeData = departmentOptions
		? arrayToTree(departmentOptions, {id: 'id', parentId: 'parentId'})
				.rootItems
		: []

	const endDateOutsideRange = day =>
		Boolean(getFieldValue('startDate')) &&
		day.isBefore(getFieldValue('startDate'))

	const startDateOutsideRange = day =>
		Boolean(getFieldValue('endDate')) &&
		day.isAfter(getFieldValue('endDate'))

	if (!employee) {
		return <></>
	}
	return (
		<FormModal
			isOpen={isOpen}
			title={'Делегировать полномочия'}
			close={close}
		>
			{isOpen && (
				<>
					<FormSector label="Делегирующий полномочия">
						<FixedField label="Сотрудник">
							{employee.surname} {employee.name}{' '}
							{employee.patronymic}
						</FixedField>
					</FormSector>
					<FormSector label="Принимающий полномочия">
						{getFieldDecorator('department', {
							initialValue:
								selectedDepartment && selectedDepartment.id,
							getValueFromEvent: value => {
								onDepartmentChange(value)
								return value
							}
						})(
							<TreeSelectOSHS
								label={'Подразделение'}
								treeData={departmentTreeData}
								defaultValue={
									selectedDepartment && selectedDepartment.id
								}
							/>
						)}
						{getFieldDecorator('delegate', {
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
								isDisabled={!department}
								options={employeesOptions || []}
								placeholder={
									department ? '' : 'Выберете подразделение'
								}
								errors={getFieldError('delegate')}
							/>
						)}
					</FormSector>
					<FormSector label="Общие сведения">
						{getFieldDecorator('startDate')(
							<DataPickerOSHS
								isOutsideRange={startDateOutsideRange}
								label={'Дата начала'}
							/>
						)}
						{getFieldDecorator('endDate')(
							<DataPickerOSHS
								isOutsideRange={endDateOutsideRange}
								label={'Дата окончания'}
							/>
						)}
						{getFieldDecorator('docName')(
							<InputOSHS
								label={'Наименование документа основания'}
							/>
						)}
						{getFieldDecorator('docNumber')(
							<InputOSHS label={'№ документа основания'} />
						)}
						<UploadFileOSHS>Загрузить</UploadFileOSHS>
					</FormSector>
					<ButtonsOSHS
						btn1Label={'Создать'}
						btn2Label={'Отмена'}
						btn1OnClick={onSubmit}
						btn2OnClick={close}
					/>
				</>
			)}
		</FormModal>
	)
}

export default createForm()(CreateDelegationForm)
