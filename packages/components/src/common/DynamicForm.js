import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Flex, Box, Button, Icon} from '../../import'

function ExampleForm(props) {
	const {group, form} = props
	const [keys, setKeys] = useState([0])
	const [id, setId] = useState(0)

	const add = () => {
		setKeys([...keys, id + 1])
		setId(id + 1)
	}

	const remove = keyForRemove => {
		setKeys(keys.filter(key => key !== keyForRemove))
	}

	const getFieldName = (name, group, index) => `${group}[${index}].${name}`

	const getFieldGenerator = (group, index) => (name, ...args) =>
		form.getFieldDecorator(getFieldName(name, group, index), ...args)

	return (
		<Box>
			{keys.map((key, index) => (
				<Flex key={key} mb={index === keys.length - 1 ? 0 : 2}>
					<Box flex={1}>
						{props.renderTemplate(
							getFieldGenerator(group, key),
							key
						)}
					</Box>
					<Box pl={2} pt={12}>
						{keys.length > 1 && index < keys.length - 1 && (
							<Button
								circle
								type="dashed"
								size="small"
								onClick={e => {
									e.preventDefault()
									global.confirm('Удалить значение?') &&
										remove(key)
								}}
							>
								<Icon name="times" top={1} />
							</Button>
						)}
						{index === keys.length - 1 && (
							<Button
								circle
								type="dashed"
								size="small"
								onClick={e => {
									e.preventDefault()
									add()
								}}
							>
								<Icon name="plus" top={1} />
							</Button>
						)}
					</Box>
				</Flex>
			))}
		</Box>
	)
}

ExampleForm.propTypes = {
	form: PropTypes.object,
	renderTemplate: PropTypes.func,
	group: PropTypes.string
}

export default ExampleForm
