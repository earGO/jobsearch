import React from 'react'
import styled from 'styled-components'
import {
	Table,
	Toggle,
	Flex,
	Box,
	Text,
	Icon,
	Tooltip,
	Button
} from '../../import'
import SortAttributeRow from './SortAttributeRow'
import AttributeForm from './AttributeForm'
import {Modal} from '../../import'

function HeaderCell(props) {
	const {children, align, ...rest} = props
	const Cell = styled(Table.HeaderCell)``

	return (
		<Cell {...rest}>
			<Text
				align={align}
				truncated
				children={children}
				title={children}
				style={{width: '100%'}}
			/>
		</Cell>
	)
}

function TableCell({align, children, ...props}) {
	const Cell = styled(Table.Cell)``
	return (
		<Cell {...props}>
			{row => (
				<Flex
					style={{width: '100%'}}
					justifyContent={align || 'flex-start'}
				>
					<Box>{children(row)}</Box>
				</Flex>
			)}
		</Cell>
	)
}

const AttributesTable = ({onChange, value}) => {
	const [currentAttribute, setCurrentAttribute] = React.useState(null)
	const [attrFormModalVisible, setModalVisibility] = React.useState(false)
	const attributes = value

	const handleItemChange = (field, nick) => value => {
		let attributeIndex = attributes.findIndex(item => item.nick === nick)
		let updatedAttribute = {...attributes[attributeIndex], [field]: value}
		let attributesCopy = attributes.slice()
		attributesCopy[attributeIndex] = updatedAttribute

		onChange(attributesCopy)
	}

	const handleAddAttr = attribute => {
		const attrExists = attributes.find(attr => attr.nick === attribute.nick)
		let newAttributes = []
		if (attrExists) {
			newAttributes = attributes.map(attr => {
				if (attr.nick === attribute.nick) {
					return attribute
				} else {
					return attr
				}
			})
		} else {
			newAttributes = attributes.concat(attribute)
		}

		onChange(newAttributes)
		setModalVisibility(false)
		setCurrentAttribute(null)
	}

	const handleEdit = attr => {
		setModalVisibility(true)
		setCurrentAttribute(attr)
	}

	const handleCancel = () => {
		setCurrentAttribute(null)
		setModalVisibility(false)
	}

	return (
		<Box>
			<Modal visible={attrFormModalVisible}>
				<AttributeForm
					attributes={attributes}
					attribute={currentAttribute}
					onSubmit={handleAddAttr}
					onCancel={handleCancel}
				/>
			</Modal>
			<Button
				mt={3}
				mb={2}
				size="small"
				onClick={() => setModalVisibility(true)}
			>
				<Icon name="plus" mr={2} />
				Добавить атрибут
			</Button>
			<Table rowKey="nick" autoHeight rowHeight={62} data={attributes}>
				{attributes.length > 1 && (
					<Table.Column width={70}>
						<HeaderCell align="center">
							<Tooltip text="Порядок сортировки колонки в таблице справочника">
								<Icon
									color="grey"
									style={{
										cursor: 'pointer'
									}}
									name="question"
								/>
							</Tooltip>
						</HeaderCell>
						<TableCell dataKey="orders" align="center">
							{row => (
								<SortAttributeRow
									row={row}
									attributes={attributes}
									onChange={onChange}
								/>
							)}
						</TableCell>
					</Table.Column>
				)}
				<Table.Column flexGrow={1}>
					<HeaderCell>
						<Text color="primary" inline bold>
							Ник
						</Text>
						&mdash; Название
					</HeaderCell>
					<TableCell dataKey="name">
						{row => {
							return (
								<React.Fragment>
									<Text
										onClick={() => handleEdit(row)}
										style={{cursor: 'pointer'}}
									>
										<Text inline bold color="primary">
											{row.nick}
										</Text>{' '}
										&mdash; {row.name}
									</Text>
									<Text color="grey" fontSize={0}>
										{row.note}
									</Text>
								</React.Fragment>
							)
						}}
					</TableCell>
				</Table.Column>
				<Table.Column width={100}>
					<HeaderCell align="center">Тип</HeaderCell>
					<TableCell dataKey="type" align="center">
						{row => <Text bold>{row.type}</Text>}
					</TableCell>
				</Table.Column>
				{/* <Table.Column width={130}>
          <HeaderCell align="center">Множественное</HeaderCell>
          <TableCell dataKey="array" align="center">
            {row => <Toggle checked={Boolean(row.array)} onChange={handleItemChange('array', row.nick)} />}
          </TableCell>
        </Table.Column> */}
				<Table.Column width={130}>
					<HeaderCell align="center">Обязательное</HeaderCell>
					<TableCell dataKey="required" align="center">
						{row => (
							<Toggle
								checked={Boolean(row.required)}
								onChange={handleItemChange(
									'required',
									row.nick
								)}
							/>
						)}
					</TableCell>
				</Table.Column>
				<Table.Column width={100}>
					<HeaderCell align="center">Уникальное</HeaderCell>
					<TableCell dataKey="unique" align="center">
						{row => (
							<Toggle
								checked={Boolean(row.unique)}
								onChange={handleItemChange('unique', row.nick)}
							/>
						)}
					</TableCell>
				</Table.Column>
				<Table.Column align="center" width={80}>
					<HeaderCell>Удалено</HeaderCell>
					<TableCell dataKey="deleted" align="center">
						{row => (
							<Toggle
								checked={Boolean(row.deleted)}
								onChange={handleItemChange('deleted', row.nick)}
							/>
						)}
					</TableCell>
				</Table.Column>
			</Table>
		</Box>
	)
}

export default AttributesTable
