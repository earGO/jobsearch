import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {Text, Heading, Box, Flex} from '../../import'

import {nsi as nsiService, Modal, DropdownMenuButton} from '../../import'

import CatalogItemForm from './CatalogItemForm'

import * as selectors from './module/selectors'
import * as actions from './module/actions'
import {baseRoute} from './module'

function CatalogHeader({match, location, history, ...props}) {
	const dispatch = useDispatch()
	const catalog = useSelector(selectors.currentCatalog)
	const attributes = useSelector(selectors.currentCatalogAttributes)
	const elements = useSelector(selectors.currentCatalogElements)
	const modalVisible = useSelector(selectors.elementsModalVisible)
	const currentElement = useSelector(selectors.currentElement)

	const dropdownItems = [
		{
			name: ' Добавить элемент',
			onClick: () => dispatch(actions.showElementsForm())
		},
		{
			name: 'Редактировать',
			onClick: () => history.push(`${location.pathname}/edit`)
		},
		{
			name: 'Удалить справочник',
			onClick: () => {
				if (
					global.confirm(
						'Вы действительно хотите удалить справочник?'
					)
				) {
					dispatch(
						nsiService.actions.metaDictSave({
							...catalog,
							deleted: true,
							attributes: Object.values(attributes)
						})
					).finally(() => {
						history.push('/nsi')
					})
				}
			}
		},
		{
			name: 'Создать новый справочник',
			onClick: () => history.push(`${baseRoute}/create`)
		},
		{
			name: 'Скачать справочник',
			onClick: () => dispatch(nsiService.actions.makeReport(catalog.nick))
		}
	]

	return (
		<Box {...props}>
			<Flex justifyContent="space-between" alignItems="center" mb={1}>
				<Heading tag="h3" color="primary">
					{catalog.name} ({catalog.nick})
				</Heading>
				<Box>
					<DropdownMenuButton type="bordered" items={dropdownItems}>
						Мои действия
					</DropdownMenuButton>
				</Box>
			</Flex>
			{catalog.note && <Text color="grey">{catalog.note}</Text>}
			<Modal visible={modalVisible}>
				<CatalogItemForm
					catalog={catalog}
					elements={elements}
					attributes={attributes}
					row={currentElement}
				/>
			</Modal>
		</Box>
	)
}

export default withRouter(CatalogHeader)
