import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {actions as oshsEmployeesActions} from './module/employees'
import {selectors as oshsDepartmentsSelectors} from './module/departments'

import {
	Form,
	arrayToTree,
	FormModal,
	TreeSelectOSHS,
	InputOSHS,
	ButtonsOSHS
} from '../../import'

const createForm = Form.create

function Subdivisions({close, employee, isOpen, form}) {
	const allDepartments = useSelector(oshsDepartmentsSelectors.allDepartments)

	const dispatch = useDispatch()
	const {getFieldDecorator, validateFields, getFieldError} = form

	const onSubmit = () => {
		validateFields((err, values) => {
			if (!err) {
				const department = allDepartments.find(
					e => e.id === values.department
				)
				dispatch(
					oshsEmployeesActions.updateEmployee({
						...values,
						id: employee.id,
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

	const treeData =
		options &&
		arrayToTree(options, {id: 'id', parentId: 'parentId'}).rootItems

	if (isOpen) {
		return (
			<FormModal
				isOpen={isOpen}
				title={'Редактировать сотрудника'}
				close={close}
			>
				{getFieldDecorator('surname', {
					initialValue: employee && employee.surname,
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
					initialValue: employee && employee.name,
					rules: [{required: true, message: 'Заполните поле "Имя"'}]
				})(<InputOSHS errors={getFieldError('name')} label={'*Имя'} />)}
				{getFieldDecorator('patronymic', {
					initialValue: employee && employee.patronymic,
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
					initialValue: employee && employee.department.id
				})(
					<TreeSelectOSHS
						label={'Отдел'}
						treeData={treeData}
						defaultValue={employee && employee.department.id}
					/>
				)}
				{getFieldDecorator('position', {
					initialValue: employee && employee.position
				})(<InputOSHS label={'Должность'} />)}
				{getFieldDecorator('email', {
					initialValue: employee && employee.email
				})(<InputOSHS label={'Электронная почта'} />)}
				{getFieldDecorator('phone', {
					initialValue: employee && employee.phone
				})(<InputOSHS label={'Телефон'} />)}
				{getFieldDecorator('room', {
					initialValue: employee && employee.room
				})(<InputOSHS label={'Кабинет'} />)}
				{getFieldDecorator('note', {
					initialValue: employee && employee.note
				})(<InputOSHS label={'Примечания'} />)}
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

export default createForm()(Subdivisions)
