import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {Scrollbars} from 'react-custom-scrollbars'
import {
	Flex,
	Box,
	Form,
	Input,
	Button,
	Toggle,
	Text,
	Textarea
} from '../../import'
import {nsi as nsiService, FormItem} from '../../import'

import AttributesTable from './AttributesTable'

import * as selectors from './module/selectors'
import * as actions from './module/actions'

import {baseRoute} from './module'

class CatalogForm extends React.Component {
	componentDidMount() {
		const {setCurrentCatalog, match, currentCatalogName} = this.props
		console.log(setCurrentCatalog, match, currentCatalogName)

		if (currentCatalogName !== match.params.nick) {
			setCurrentCatalog(match.params.nick)
		}

		this.forceUpdate()
	}

	handleSubmit = () => {
		const {metaDictSave, history, form} = this.props

		form.validateFieldsAndScroll((errors, values) => {
			if (!errors) {
				metaDictSave(values).finally(() => {
					history.push(baseRoute + '/' + values.nick)
				})
			}
		})
	}

	render() {
		const {form, history, catalog} = this.props

		return (
			<React.Fragment>
				<Flex pb={2} justifyContent="space-between" alignItems="center">
					<Text fontSize={3}>
						{catalog ? catalog.name : 'Новый справочник'}
					</Text>
					<Flex>
						<Box width={96}>
							<Button
								size="small"
								block
								onClick={this.handleSubmit}
							>
								Сохранить
							</Button>
						</Box>
						<Box ml={3} width={96}>
							<Button
								size="small"
								type="bordered"
								block
								onClick={history.goBack}
							>
								Отмена
							</Button>
						</Box>
					</Flex>
				</Flex>
				<Scrollbars autoHide>
					<FormItem
						required
						mb={3}
						name="name"
						label="Название"
						initialValue=""
						form={form}
					>
						<Input placeholder="Введите название" />
					</FormItem>
					<FormItem
						required
						name="nick"
						label="Ник справочника"
						initialValue=""
						form={form}
					>
						<Input
							disabled={catalog.nick}
							placeholder="Введите ник"
						/>
					</FormItem>
					<FormItem
						required
						name="sysName"
						label="Группа"
						initialValue=""
						form={form}
					>
						<Input placeholder="Введите название группы" />
					</FormItem>
					<FormItem
						name="note"
						label="Описание"
						initialValue=""
						form={form}
					>
						<Textarea placeholder="Описание справочника" />
					</FormItem>
					<Flex mb={2}>
						<FormItem name="hierarchy" form={form}>
							<Toggle />
						</FormItem>
						<Text ml={2}>&mdash; Иерархическй</Text>
					</Flex>
					<Flex mb={2}>
						<FormItem name="deleted" form={form}>
							<Toggle />
						</FormItem>
						<Text ml={2}>&mdash; Удален</Text>
					</Flex>
					<Flex mb={2}>
						<FormItem name="context" form={form}>
							<Toggle />
						</FormItem>
						<Text ml={2}>&mdash; Системный</Text>
					</Flex>
					{form.getFieldDecorator('attributes', {initialValue: []})(
						<AttributesTable form={form} />
					)}
				</Scrollbars>
			</React.Fragment>
		)
	}
}

const withConnect = connect(
	(state, {match}) => ({
		// dictData: match.params.nick ? selectors.currentCatalog(state) : {},
		catalog: match.params.nick ? selectors.currentCatalog(state) : {},
		currentCatalogName: selectors.currentCatalogName,
		attributes: match.params.nick
			? selectors.currentCatalogAttributes(state)
			: {}
	}),
	{
		metaDictSave: nsiService.actions.metaDictSave,
		loadElements: nsiService.actions.loadElements,
		setCurrentCatalog: actions.setCurrentCatalog
	}
)

const withForm = Form.create({
	mapPropsToFields({catalog, attributes}) {
		const createField = value => Form.createFormField({value})

		const out = Object.keys(catalog).reduce((acc, key) => {
			acc[key] = createField(catalog[key])
			return acc
		}, {})

		out['attributes'] = createField(Object.values(attributes))

		return out
	}
})

export default compose(
	withRouter,
	withConnect,
	withForm
)(CatalogForm)
