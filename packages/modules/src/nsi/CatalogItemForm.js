import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {compose} from 'redux'
import Scrollbars from 'react-custom-scrollbars'
import {
	Card,
	Flex,
	Form,
	Input,
	Button,
	Heading,
	Box,
	Toggle,
	Select
} from '../../import'
import {nsi as nsiService, FormItem} from '../../import'
import LinkField from './LinkField'

import * as selectors from './module/selectors'
import * as actions from './module/actions'

function CatalogItemForm({
	form,
	width,
	elements,
	attributes,
	catalog,
	contentHeight
}) {
	const dispatch = useDispatch()
	const row = useSelector(selectors.currentElement)

	const closeModal = () => dispatch(actions.hideElementsForm())
	const saveDictRow = (data, nick) =>
		dispatch(nsiService.actions.saveDictRow(data, nick))

	const selectElements = Object.values(elements || {})
		.filter(el => !el.deleted && row && row.elementId !== el.elementId)
		.reduce((acc, {elementId, values}) => {
			const val = values[Object.keys(attributes)[0]]

			acc[elementId] = {
				label: val && val.value,
				value: elementId
			}
			return acc
		}, {})

	function prepare({parentId, ...values}) {
		return {
			elementId: (row && row.elementId) || null,
			elementParent:
				(parentId && parentId.value && {parentId: parentId.value}) ||
				null,
			deleted: false,
			values: Object.keys(values).map(nick => {
				const output = {
					...(row && row.values && row.values[nick]),
					nick,
					deleted: false
				}

				if (attributes[nick].link) {
					output.linkValue = {id: values[nick] || null}
				} else {
					output.value = values[nick]
				}

				return output
			})

			// values: Object.keys(values).map(nick => {
			//   console.log(row)
			//   const attribute = attributes[nick]
			//   const output = {
			//     nick,
			//   }
			//   if (attribute.link) {
			//     output.linkValue = { id: values[nick] || null }
			//   } else {
			//     output.value = values[nick]
			//   }

			//   return output
			// }),
		}

		// return {
		//   elementId: (row && row.elementId) || null,
		//   deleted: false,
		//   sortValue: '1',
		//   elementParent: (values.parentId && values.parentId.value && { parentId: values.parentId.value }) || null,
		//   values: Object.keys(values)
		//     .filter(name => name !== 'parentId')
		//     .map(nick => {
		//       console.log(row, values[nick])
		//       const attribute = attributes[nick]
		//       const values = (row && row.values) || {}
		//       const output = {
		//         ...values[nick],
		//         nick,
		//         deleted: 0,
		//       }

		//       if (attribute.link) {
		//         output.linkValue = { id: values[nick] || null }
		//       } else {
		//         output.value = values[nick]
		//       }
		//       return output
		//     }),
		// }
	}

	const handleSave = () =>
		form.validateFieldsAndScroll((errors, values) => {
			if (!errors) {
				// console.log(prepare(values))
				saveDictRow(prepare(values), catalog.nick).finally(closeModal)
			}
		})

	return (
		<Card id="catalogItemForm" bg="white" p={2} width={width}>
			<Heading>&laquo;{catalog.name}&raquo;</Heading>
			<Scrollbars style={{height: contentHeight}} autoHide>
				<Box py={2} px={3}>
					{catalog.hierarchy && (
						<FormItem
							key="parentId"
							mb={2}
							name="parentId"
							label="Родительский элемент"
							form={form}
						>
							<Select options={Object.values(selectElements)} />
						</FormItem>
					)}
					{Object.values(attributes)
						.filter(attr => !attr.deleted)
						.map(attr => {
							switch (true) {
								case attr.type === 'boolean':
									return (
										<FormItem
											required={attr.required}
											initialValue={0}
											key={attr.nick}
											mb={2}
											name={attr.nick}
											label={attr.name}
											form={form}
										>
											<Toggle />
										</FormItem>
									)

								case attr.type === 'integer':
									return (
										<FormItem
											required={attr.required}
											initialValue={0}
											key={attr.nick}
											mb={2}
											name={attr.nick}
											label={attr.name}
											form={form}
										>
											<Input type="number" />
										</FormItem>
									)

								case attr.type === 'link':
									return (
										<FormItem
											key={attr.nick}
											mb={2}
											name={attr.nick}
											label={attr.name}
											form={form}
										>
											<LinkField nick={attr.link} />
										</FormItem>
									)

								default:
									return (
										<FormItem
											required={attr.required}
											key={attr.nick}
											mb={2}
											name={attr.nick}
											label={attr.name}
											form={form}
										>
											<Input placeholder={attr.name} />
										</FormItem>
									)
							}
						})}
				</Box>
			</Scrollbars>
			<Flex justifyContent="space-between" alignItems="center" mt={2}>
				<Box ml="auto">
					<Button
						style={{width: 100}}
						size="small"
						onClick={handleSave}
					>
						{row ? 'Сохранить' : 'Создать'}
					</Button>
					<Button
						style={{width: 100}}
						size="small"
						ml={2}
						type="bordered"
						onClick={closeModal}
					>
						Отмена
					</Button>
				</Box>
			</Flex>
		</Card>
	)
}

CatalogItemForm.defaultProps = {
	closeModal: () => false,
	dict: {},
	width: '40vw',
	contentHeight: '50vh'
}

const withForm = Form.create({
	mapPropsToFields({row, catalog, elements, attributes}) {
		const fields = Object.values(attributes || {}).filter(
			attr => !Boolean(attr.deleted)
		)

		const selectElements = Object.values(elements || {})
			.filter(el => !el.deleted)
			.reduce((acc, {elementId, values}) => {
				const val = values[Object.keys(attributes)[0]]

				acc[elementId] = {
					label: val && val.value,
					value: elementId
				}
				return acc
			}, {})

		let out = {}
		if (row) {
			out = fields.reduce((acc, field) => {
				const value = (row.values && row.values[field.nick]) || {}
				acc[field.nick] = Form.createFormField({value: value.value})
				return acc
			}, {})
		}

		if (row && row.parentId) {
			out['parentId'] = Form.createFormField({
				value: selectElements[row.parentId]
			})
		}

		return out
	}
})

export default compose(
	withRouter,
	withForm
)(CatalogItemForm)
