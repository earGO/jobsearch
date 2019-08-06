import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {
	actions as oshsDepartmentsActions,
	selectors as oshsDepartmentsSelectors
} from './module/departments'
import {
	Form,
	FormModal,
	InputOSHS,
	ButtonsOSHS,
	TreeSelectOSHS,
	arrayToTree
} from '../../import'

const createForm = Form.create

function CreateDepartmentForm({close, isOpen, form}) {
	const allDepartments = useSelector(oshsDepartmentsSelectors.allDepartments)
	const selectedDepartmentId = useSelector(
		oshsDepartmentsSelectors.selectedDepartmentId
	)

	const dispatch = useDispatch()
	const {getFieldDecorator, validateFields, getFieldError} = form

	const onSubmit = () => {
		validateFields((err, values) => {
			if (!err) {
				dispatch(
					oshsDepartmentsActions.createSubDepartment({
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
			? allDepartments.map(e => ({
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
				title={'Создание подразделения'}
				close={close}
			>
				{getFieldDecorator('newSubDepartmentName', {
					rules: [
						{
							required: true,
							message: 'Заполните поле "Подразделение"'
						}
					]
				})(<InputOSHS errors={errors} label={'*Подразделение'} />)}
				{getFieldDecorator('parentIdDepartment', {
					initialValue: selectedDepartmentId
				})(
					<TreeSelectOSHS
						allowClear
						label={'Вышестоящее подразделение'}
						treeData={treeData}
						defaultValue={selectedDepartmentId}
					/>
				)}
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

export default createForm()(CreateDepartmentForm)
