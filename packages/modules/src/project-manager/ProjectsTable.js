import React from 'react'
import {
	Table,
	Flex,
	Box,
	Button,
	theme,
	DropdownMenu,
	Icon,
	TableContentBox
} from '../../import'
import styled from 'styled-components'

const ProjectButton = styled(Button)`
	transition: all;
	transition-duration: ${props => props.theme.duration.fast};
	transition-timing-function: ${props =>
		props.theme.timingFunctions.easeInOut};
	&:hover {
		color: ${props => props.theme.colors.primary};
		transform: scale(1.05);
	}
`

const ActionHover = styled(Box)`
	transition: all;
	transition-duration: ${props => props.theme.duration.fast};
	transition-timing-function: ${props =>
		props.theme.timingFunctions.easeInOut};
	cursor: pointer;
	i {
		color: black;
	}
	:hover {
		i {
			color: ${props => props.theme.colors.primary};
			transform: scale(1.15);
		}
	}
`

/* Here's where I'll render the progress svg based on passed progress data */
const ProgressCell = ({rowData, dataKey, ...props}) => (
	<Table.Cell {...props} style={{padding: 0}}>
		<Flex justifyContent={'center'} width={140}>
			<Box>{rowData[dataKey]}</Box>
		</Flex>
	</Table.Cell>
)

/* Here's where action to open project module will be at */
const ActionCell = ({rowData, dataKey, ...props}) => {
	const FunctionalContent = [
		{
			name: 'Добавить к сравнению',
			HandleClick: () => {
				console.log('clicked ' + dataKey)
			}
		},
		{
			name: 'Доступ',
			HandleClick: () => {
				console.log('clicked ' + dataKey)
			}
		},
		{
			name: 'Редактировать',
			HandleClick: () => {
				console.log('clicked ' + dataKey)
			}
		}
	]
	return (
		<Table.Cell {...props} style={{padding: 0}}>
			<Flex justifyContent={'center'} width={96}>
				<ActionHover>
					<DropdownMenu content={FunctionalContent} shiftLeft={-80}>
						<Icon name={'more_horiz'} />
					</DropdownMenu>
				</ActionHover>
			</Flex>
		</Table.Cell>
	)
}

const ProjectClick = ({rowData, dataKey, history, projectClick, ...props}) => {
	function handleAction() {
		console.log(rowData.idProject)
		projectClick(rowData.idProject, history)
	}
	return (
		<Table.Cell {...props} style={{padding: 0}}>
			<ProjectButton type={'flat'} onClick={handleAction}>
				{rowData[dataKey]}
			</ProjectButton>
		</Table.Cell>
	)
}

function ProjectsTable({projects, openTable, projectClick, history, ...props}) {
	let tableHeight = 144
	{
		openTable ? (tableHeight = 288) : (tableHeight = 144)
	}
	if (projects) {
		console.log(projects)
		return (
			<TableContentBox>
				<Table
					virtualized
					bordered
					disabledScroll={!openTable}
					data={projects}
					height={tableHeight}
					sortType={'asc'}
				>
					<Table.Column width={160}>
						<Table.HeaderCell
							style={{paddingLeft: '16px', zIndex: 1}}
						>
							Тип
						</Table.HeaderCell>
						<Table.Cell dataKey="type" />
					</Table.Column>
					<Table.Column width={80}>
						<Table.HeaderCell>Номер</Table.HeaderCell>
						<Table.Cell dataKey="number" />
					</Table.Column>

					<Table.Column width={272}>
						<Table.HeaderCell>Объект</Table.HeaderCell>
						<ProjectClick
							dataKey="objectName"
							projectClick={projectClick}
							history={history}
						/>
					</Table.Column>
					<Table.Column width={192}>
						<Table.HeaderCell>Стадии</Table.HeaderCell>
						<Table.Cell dataKey="stageName" />
					</Table.Column>
					<Table.Column width={160}>
						<Table.HeaderCell>Дата изменения</Table.HeaderCell>
						<Table.Cell dataKey="dateChange" />
					</Table.Column>
					<Table.Column width={160}>
						<Table.HeaderCell style={{padding: '6px'}}>
							Прогресс выполнения
						</Table.HeaderCell>
						<ProgressCell dataKey="progress" />
					</Table.Column>

					<Table.Column width={96}>
						<Table.HeaderCell>Действия</Table.HeaderCell>
						<ActionCell dataKey="actions" />
					</Table.Column>
				</Table>
			</TableContentBox>
		)
	} else {
		return <Box>Loading data...</Box>
	}
}

export default ProjectsTable
