import React from 'react'
import PropTypes from 'prop-types'
import {Form, Flex, Box, Text} from '../../import'
import DynamicForm from './DynamicForm'
const multiplePrefix = '$'

function FormItem({
	name,
	initialValue,
	label,
	options = {},
	labelWidth = 128,
	children,
	required,
	form,
	type,
	multiple,
	...props
}) {
	const requiredRule = {required: true, message: 'Заполните поле ' + label}
	const rules = options.rules ? options.rules : []
	const field = React.cloneElement(React.Children.only(children))
	const decoratorOptions = {
		initialValue,
		...options,
		rules: required ? rules.concat(requiredRule) : []
	}
	const renderTemplate = decorator => {
		return (
			<Form.Item required={required}>
				{decorator(name, decoratorOptions)(field)}
			</Form.Item>
		)
	}

	return (
		<Flex flexDirection="column" mb={2}>
			{label && (
				<Box>
					{label}{' '}
					{required && (
						<Text inline color="error">
							*
						</Text>
					)}
				</Box>
			)}
			<Box>
				{multiple ? (
					<DynamicForm
						form={form}
						group={multiplePrefix + name}
						renderTemplate={renderTemplate}
					/>
				) : (
					<Form.Item required={required}>
						{form.getFieldDecorator(name, decoratorOptions)(field)}
					</Form.Item>
				)}
			</Box>
		</Flex>
	)

	// if (multiple) {
	//   return <DynamicForm form={form} group={multiplePrefix + name} renderTemplate={renderTemplate} />

	//     <Form.Item required={required} label={label} labelProps={{ mb: 1 }} mb={3}>
	//     {field}
	//   </Form.Item>
	// } else {
	// }

	// return form.getFieldDecorator(name, decoratorOptions)(field)
}

FormItem.propTypes = {
	required: PropTypes.bool
}

FormItem.defaultProps = {
	required: false
}

export default FormItem
