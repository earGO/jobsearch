import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {
	Form,
	FormModal,
	InputOSHS,
	ButtonsOSHS,
	TreeSelectOSHS,
	arrayToTree
} from '../../import'

import {actions as oshsEmployeesActions} from './module/employees'
import {selectors as oshsDepartmentsSelectors} from './module/departments'

const createForm = Form.create

function Subdivisions({close, isOpen, form}) {
	const allDepartments = useSelector(oshsDepartmentsSelectors.allDepartments)
	const selectedDepartment = useSelector(
		oshsDepartmentsSelectors.selectedDepartment
	)

	const dispatch = useDispatch()
	const {getFieldDecorator, validateFields, getFieldError} = form

	const onSubmit = () => {
		validateFields((err, values) => {
			if (!err) {
				const department = allDepartments.find(
					e => e.id === values.department
				)
				dispatch(
					oshsEmployeesActions.createEmployee({
						...values,
						department
					})
				)
				close()
			} else {
				console.log(err)
			}
		})
	}

	const options =
		allDepartments && allDepartments.length > 0
			? allDepartments.map(e => ({
					value: e.id,
					label: e.name,
					id: e.id,
					parentId: e.parentId
			  }))
			: null

	const treeData = arrayToTree(options, {id: 'id', parentId: 'parentId'})
		.rootItems

	if (isOpen) {
		return (
			<FormModal
				isOpen={isOpen}
				title={'Создание сотрудника'}
				close={close}
			>
				{getFieldDecorator('surname', {
					rules: [
						{required: true, message: 'Заполните поле "Фамилия"'}
					]
				})(
					<InputOSHS
						errors={getFieldError('surname')}
						label={'*Фамилия'}
					/>
				)}
				{getFieldDecorator('name', {
					rules: [{required: true, message: 'Заполните поле "Имя"'}]
				})(<InputOSHS errors={getFieldError('name')} label={'*Имя'} />)}
				{getFieldDecorator('patronymic', {
					rules: [
						{required: true, message: 'Заполните поле "Отчество"'}
					]
				})(
					<InputOSHS
						errors={getFieldError('patronymic')}
						label={'*Отчество'}
					/>
				)}
				{getFieldDecorator('department', {
					initialValue: selectedDepartment && selectedDepartment.id
				})(
					<TreeSelectOSHS
						label={'Отдел'}
						treeData={treeData}
						defaultValue={
							selectedDepartment && selectedDepartment.id
						}
					/>
				)}
				{getFieldDecorator('position')(
					<InputOSHS label={'Должность'} />
				)}
				{getFieldDecorator('email')(
					<InputOSHS label={'Электронная почта'} />
				)}
				{getFieldDecorator('phone')(<InputOSHS label={'Телефон'} />)}
				{getFieldDecorator('room')(<InputOSHS label={'Кабинет'} />)}
				{getFieldDecorator('note')(<InputOSHS label={'Примечания'} />)}

				<ButtonsOSHS
					btn1Label={'Создать'}
					btn2Label={'Отмена'}
					btn1OnClick={onSubmit}
					btn2OnClick={close}
				/>
			</FormModal>
		)
	}
	return ''
}

export default createForm()(Subdivisions)
