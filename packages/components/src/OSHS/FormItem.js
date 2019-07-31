import React from 'react'
import PropTypes from 'prop-types'
import {Form, Flex, Box, Text} from '@ursip/design-system'
import DynamicForm from './DynamicForm'

function FormItem({
	name,
	initialValue,
	label,
	options = {},
	children,
	required,
	form,
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
		<Flex flexDirection="column" {...props}>
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
						group={name}
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
}

FormItem.propTypes = {
	required: PropTypes.bool
}

FormItem.defaultProps = {
	required: false,
	mb: 3
}

export default FormItem
