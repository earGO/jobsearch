import React from 'react'
import {Helmet} from 'react-helmet'
import {Flex, ResizableSide, OSHSSearchInput as SearchInput} from '../../import'
import {useSelector, useDispatch} from 'react-redux'
import Departments from './departments'
import ListEmployees from './ListEmployees'
import {debounce} from 'throttle-debounce'
import {Route} from 'react-router-dom'
import EmployeeCard from './EmployeeCard'
import {
	selectors as oshsEmployeesSelectors,
	actions as oshsEmployeesActions
} from './module/employees'

export default function Main(props) {
	const {match} = props
	const dispatch = useDispatch()
	const inputValue = useSelector(oshsEmployeesSelectors.inputValue)

	const debounceSearch = debounce(200, query =>
		dispatch(oshsEmployeesActions.searchEmployees(query))
	)

	const handleSearch = query => {
		dispatch(oshsEmployeesActions.searchInputValue(query))
		debounceSearch(query)
	}

	return (
		<React.Fragment>
			<Helmet>
				<title>Организационно-штатная структура</title>
			</Helmet>
			<Flex style={{height: '100%'}}>
				<ResizableSide
					minWidth={250}
					maxWidth={2000}
					defaultSize={{width: '50%'}}
				>
					<Departments />
				</ResizableSide>
				<Flex
					flexDirection="row"
					style={{height: '100%'}}
					width={1}
					pt={2}
					px={2}
				>
					<Flex flexDirection="column" mx={2} flex={1}>
						<SearchInput
							value={inputValue}
							onSearch={handleSearch}
							placeholder="ФИО сотрудника"
							mb={2}
						/>
						<Route
							path={`${match.url}/:departmentId`}
							component={ListEmployees}
						/>
					</Flex>
					<Flex flexDirection="column" mx={2} flex={1}>
						<Route
							path={`${match.url}/:departmentId/:employeeId`}
							component={EmployeeCard}
						/>
					</Flex>
				</Flex>
			</Flex>
		</React.Fragment>
	)
}
