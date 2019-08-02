import React, {useState} from 'react'
import {
	TableContentBox,
	ContentBox,
	AnimatedSearchInput,
	RangeDatePicker,
	Box,
	Select,
	Heading,
	Text,
	Flex,
	Relative,
	Button,
	Collapse
} from '../../import'

import styled from 'styled-components'
import {debounce} from 'throttle-debounce'
import * as actions from '../nsi/module/actions'
import {useDispatch} from 'react-redux'

const Corrector = styled(TableContentBox)`
	z-index: 12;
`

const NonCollapseContainer = styled(Flex)`
	position: absolute;
	z-index: 13;
`

const CollapseContentContainer = styled(ContentBox)`
	z-index: 14;
`

function SearchAndFilter({
	amnt,
	handleProjectsSort,
	handleDateFilterChange,
	...props
}) {
	const dispatch = useDispatch()
	/* A group of variables for the filtering input */
	const options = [
		{value: 'type', label: `По типу`},
		{value: 'number', label: `По номеру`},
		{value: 'objectName', label: `По объекту`},
		{value: 'stageName', label: `По стадии`},
		{value: 'dateChange', label: `По дате изменения`}
	]
	const functionOptions = [
		{value: 'type', label: `Есть многое такое `},
		{value: 'number', label: `Друг Горацио`},
		{value: 'objectName', label: `Что и не снилось`},
		{value: 'stageName', label: `Нашим мудрецам`}
	]

	/* A state to handle filter selector */
	const [value, setOption] = useState(options[4])

	const searchQuery = ''

	const onChange = newOption => {
		setOption(newOption)
		handleProjectsSort(newOption.value)
	}
	const onFunctionalChange = newOption => {}

	const handleSearch = debounce(200, query =>
		dispatch(actions.searchCatalogs(query))
	)

	const handleDatesPick = (dates, dateStrings) => {
		handleDateFilterChange(dates[0], dates[1], 'dateCreated')
	}

	if (props !== undefined) {
		return (
			<Corrector>
				<ContentBox flexDirection={'column'}>
					<Flex
						flexDirection={'row'}
						justifyContent={'space-between'}
					>
						<NonCollapseContainer>
							<Box p={3}>
								<AnimatedSearchInput
									value={searchQuery}
									onSearch={handleSearch}
									placeholder="Поиск"
									shrinkWidth={80}
									growWidth={160}
								/>
							</Box>
							<Box p={3} pl={0}>
								<Heading>Проекты ({amnt})</Heading>
							</Box>
							<Box width={630}>{''}</Box>
						</NonCollapseContainer>
						<Collapse>
							<Collapse.Panel
								key="key1"
								title="Расширенный поиск"
								titleAlignment={'flex-end'}
								pt={2}
								pb={1}
							>
								<CollapseContentContainer
									flexFlow={'row nowrap'}
								>
									<Box p={2} id={'sortTypePickerGroup'}>
										<Box pl={1}>
											<Text
												fontSize={'12px'}
												color="grey"
											>
												Сортировка
											</Text>
										</Box>
										<Box width={160} p={1}>
											<Select
												value={value}
												onChange={onChange}
												options={options}
												size="medium"
											/>
										</Box>
									</Box>
									<Box p={2} pl={0} id={'datePickerGroup'}>
										<Box pl={1}>
											<Text
												fontSize={'12px'}
												color="grey"
											>
												Дата подачи от и до
											</Text>
										</Box>
										<Box width={292} p={1}>
											<RangeDatePicker
												onChange={handleDatesPick}
												height={42}
											/>
										</Box>
									</Box>
									<Relative
										p={2}
										pl={0}
										id={'functionPickerGroup'}
										left={-90}
									>
										<Box pl={0}>
											<Text
												fontSize={'12px'}
												color="grey"
											>
												Функциональное значение
											</Text>
										</Box>
										<Box width={160} p={1}>
											<Select
												onChange={onFunctionalChange}
												options={functionOptions}
												size="medium"
												placeholder={'Выбрать'}
											/>
										</Box>
									</Relative>
								</CollapseContentContainer>
							</Collapse.Panel>
						</Collapse>
					</Flex>

					<ContentBox
						flexDirection={'row'}
						justifyContent={'flex-end'}
						alignItems={'flex-end'}
						flexWrap={'nowrap'}
					>
						<Box p={2}>
							<Button
								type={'flat'}
								color={'primary'}
								onClick={() => {
									handleDateFilterChange(null, null, null)
								}}
							>
								Сбросить фильтры
							</Button>
						</Box>
					</ContentBox>
				</ContentBox>
			</Corrector>
		)
	} else {
		return null
	}
}

export default SearchAndFilter
