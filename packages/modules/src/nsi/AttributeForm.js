import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {compose} from 'redux'
import Scrollbars from 'react-custom-scrollbars'
import {
	Card,
	Form,
	Input,
	Button,
	Toggle,
	Text,
	Heading,
	Box,
	Select,
	Textarea,
	Flex
} from '../../import'

import {FormItem} from '../../import'

import * as selectors from './module/selectors'

const typeOptions = [
	{label: 'Строка', value: 'string'},
	{label: 'Целое число', value: 'integer'},
	{label: 'Логическое', value: 'boolean'},
	{label: 'Другой справочник', value: 'link'}
]

function AttributeForm({
	form,
	width,
	contentHeight,
	dicts,
	dict,
	attribute = {},
	attributes,
	onSubmit,
	onCancel,

	catalogs
}) {
	const type = (form.getFieldValue('type') || []).value

	const handleSave = () =>
		form.validateFieldsAndScroll((errors, values) => {
			if (!errors) {
				const {type, link, ...data} = values

				onSubmit({
					...data,
					link: link ? link.value : null,
					type: type ? type.value : null
				})
			}
		})

	const selectDicts = catalogs.reduce((acc, dict) => {
		acc[dict.nick] = {
			label: dict.name,
			value: dict.nick
		}
		return acc
	}, {})

	return (
		<Card bg="white" p={2} width={width}>
			{dict ? (
				<Heading tag="h5" mb={3}>
					Новый атрибут для справочника &laquo;{dict.name}&raquo;
				</Heading>
			) : (
				<Heading tag="h5" mb={3}>
					Новый атрибут
				</Heading>
			)}
			<Scrollbars style={{height: contentHeight}} autoHide>
				<Box py={2} px={3}>
					<FormItem
						required
						mb={2}
						name="name"
						label="Название"
						form={form}
						initialValue={(attribute && attribute.name) || ''}
					>
						<Input placeholder="Введите название" />
					</FormItem>
					<FormItem
						required
						mb={2}
						name="nick"
						label="Ник"
						form={form}
						initialValue={attribute && attribute.nick}
						options={{
							rules: [
								{
									validator: (rule, value, callback) => {
										if (
											attribute &&
											!attribute.nick &&
											attributes.find(
												attr => attr.nick === value
											)
										) {
											callback(
												'Такой ник уже используется в этом справочнике'
											)
										}
										callback()
									}
								}
							]
						}}
					>
						<Input
							disabled={Boolean(attribute && attribute.nick)}
							placeholder="Введите ник"
						/>
					</FormItem>
					<FormItem
						mb={3}
						name="type"
						label="Тип"
						form={form}
						initialValue={
							(attribute &&
								typeOptions.find(
									type => type.value === attribute.type
								)) ||
							typeOptions[0]
						}
					>
						<Select options={typeOptions} />
					</FormItem>
					{type === 'link' && (
						<FormItem
							required
							mb={2}
							name="link"
							label="Справочник"
							form={form}
						>
							<Select options={Object.values(selectDicts)} />
						</FormItem>
					)}
					<FormItem
						mb={2}
						name="note"
						label="Описание"
						form={form}
						initialValue={(attribute && attribute.note) || ''}
					>
						<Textarea placeholder="Введите описание" />
					</FormItem>
					{/* <Flex mb={2}>
            <FormItem name="array" form={form}>
              <Toggle />
            </FormItem>
            <Text ml={2}>&mdash; Множественное</Text>
          </Flex> */}
					<Flex mb={2}>
						<FormItem name="required" form={form}>
							<Toggle />
						</FormItem>
						<Text ml={2}>&mdash; Обязательное</Text>
					</Flex>
					<Flex mb={2}>
						<FormItem name="unique" form={form}>
							<Toggle />
						</FormItem>
						<Text ml={2}>&mdash; Уникальное</Text>
					</Flex>
					<Flex mb={2}>
						<FormItem name="deleted" form={form}>
							<Toggle />
						</FormItem>
						<Text ml={2}>&mdash; Удалено</Text>
					</Flex>
					{form.getFieldDecorator('orders', {
						initialValue: attributes ? attributes.length : 0
					})}
				</Box>
			</Scrollbars>
			<Text align="right" mt={2}>
				<Button style={{width: 100}} size="small" onClick={handleSave}>
					Сохранить
				</Button>
				<Button
					style={{width: 100}}
					size="small"
					ml={2}
					type="bordered"
					onClick={onCancel}
				>
					Отмена
				</Button>
			</Text>
		</Card>
	)
}

AttributeForm.defaultProps = {
	closeModal: () => {},
	width: '50vw',
	contentHeight: '50vh'
}

export default compose(
	withRouter,
	connect(state => ({
		// dicts: nsiDuck.selectors.availableCatalogs(state),
		// dict: nsiDuck.selectors.currentCatalog(state),

		catalogs: Object.values(selectors.allCatalogs(state)),
		catalog: selectors.currentCatalog(state)
	})),
	Form.create({
		mapPropsToFields(props) {
			const data = props.attribute || {}

			const selectDicts = props.catalogs.reduce((acc, dict) => {
				acc[dict.nick] = {
					label: dict.name,
					value: dict.nick
				}
				return acc
			}, {})

			return Object.keys(data).reduce((acc, key) => {
				switch (key) {
					case 'type':
						acc[key] = Form.createFormField({
							value: typeOptions.find(
								type => type.value === data[key]
							)
						})
						break
					case 'link':
						acc[key] = Form.createFormField({
							value: selectDicts[data[key]]
						})
						break
					default:
						acc[key] = Form.createFormField({value: data[key]})
				}

				return acc
			}, {})
		}
	})
)(AttributeForm)
