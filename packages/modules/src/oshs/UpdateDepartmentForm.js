import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {
	actions as oshsDepartmentsActions,
	selectors as oshsDepartmentsSelectors
} from './module/departments'
import {
	Form,
	InputOSHS,
	ButtonsOSHS,
	TreeSelectOSHS,
	FormModal,
	arrayToTree
} from '../../import'

const createForm = Form.create

function UpdateDepartmentForm({close, isOpen, form}) {
	const allDepartments = useSelector(oshsDepartmentsSelectors.allDepartments)
	const selectedDepartment = useSelector(
		oshsDepartmentsSelectors.selectedDepartment
	)

	const dispatch = useDispatch()
	const {getFieldDecorator, validateFields, getFieldError} = form

	const onSubmit = () => {
		validateFields((err, values) => {
			if (!err) {
				dispatch(
					oshsDepartmentsActions.editDepartment({
						id: selectedDepartment.id,
						name: values.newSubDepartmentName,
						parentId: values.parentIdDepartment
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
			? allDepartments
					.filter(
						e =>
							selectedDepartment && e.id !== selectedDepartment.id
					)
					.map(e => ({
						value: e.id,
						label: e.name,
						id: e.id,
						parentId: e.parentId
					}))
			: null

	const treeData = arrayToTree(options, {id: 'id', parentId: 'parentId'})
		.rootItems

	let errors = getFieldError('newSubDepartmentName')
	if (isOpen) {
		return (
			<FormModal
				isOpen={isOpen}
				title={'Редактирование подразделения'}
				close={close}
			>
				{getFieldDecorator('newSubDepartmentName', {
					initialValue: selectedDepartment && selectedDepartment.name,
					rules: [
						{
							required: true,
							message: 'Заполните поле "Подразделение"'
						}
					]
				})(<InputOSHS errors={errors} label={'*Подразделение'} />)}
				{getFieldDecorator('parentIdDepartment', {
					initialValue:
						selectedDepartment && selectedDepartment.parentId
				})(
					<TreeSelectOSHS
						allowClear
						label={'Вышестоящее подразделение'}
						treeData={treeData}
						defaultValue={
							selectedDepartment && selectedDepartment.parentId
						}
					/>
				)}
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

export default createForm()(UpdateDepartmentForm)
