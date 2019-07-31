import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Flex, Box, Button, Icon} from '@ursip/design-system'

function DynamicForm(props) {
	const {group, form} = props
	const [keys, setKeys] = useState([0])
	const [id, setId] = useState(0)

	React.useEffect(() => {
		const initialCount = form.getFieldValue('_initial_' + group)

		if (initialCount) {
			const initialKeys = Array.from(
				Array(initialCount),
				(_, index) => index
			)
			setKeys(initialKeys)
			setId(initialCount)
		}
	}, [])

	const add = () => {
		const newKeys = keys.concat(id)
		setKeys(newKeys)
		setId(id + 1)
	}

	const remove = keyForRemove => {
		const newKeys = keys.filter(key => key !== keyForRemove)
		setKeys(newKeys)
		const groupData = form.getFieldValue(group)

		form.setFieldsValue({
			[group]: groupData.filter((_, index) => newKeys.includes(index))
		})
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
						{keys.length > 1 && (
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
					</Box>
				</Flex>
			))}
			<Button
				mt={2}
				block
				type="dashed"
				size="small"
				onClick={e => {
					e.preventDefault()
					add()
				}}
			>
				<Icon name="plus" top={1} />
			</Button>
		</Box>
	)
}

DynamicForm.propTypes = {
	form: PropTypes.object,
	renderTemplate: PropTypes.func,
	group: PropTypes.string
}

export default DynamicForm
