import React, {useState} from 'react'
import moment from 'moment'
import {Text, Flex, Card, DropdownMenuButton} from '../../import'

import DeleteDelegationForm from './DeleteDelegationForm'
import UpdateDelegationForm from './UpdateDelegationForm'

function DelegationCard({delegation = {}, delegationTo}) {
	const dropdownItems = [
		{
			name: ' Редактировать делегирование',
			onClick: () => setUpdateDelegation(true)
		},
		{
			name: ' Удалить делегирование',
			onClick: () => setDeleteDelegation(true)
		}
	]
	const {delegate, employee, startDate, endDate} = delegation

	const [deleteDelegation, setDeleteDelegation] = useState(null)
	const [updateDelegation, setUpdateDelegation] = useState(null)

	const displayEmployee = delegationTo ? delegate : employee
	const name = displayEmployee
		? `${displayEmployee.surname} ${displayEmployee.name &
				displayEmployee.name[0]}. ${displayEmployee.patronymic &&
				displayEmployee.patronymic[0]}.`
		: 'Имя не указано'

	const DelegationTime =
		(startDate ? `c ${moment(startDate).format('DD.MM.YY')} ` : '') +
		(startDate ? `до ${moment(endDate).format('DD.MM.YY')} ` : '')
	return (
		<Card p={1}>
			{deleteDelegation && (
				<DeleteDelegationForm
					isOpen={deleteDelegation}
					delegation={delegation}
					close={() => setDeleteDelegation(false)}
				/>
			)}
			{updateDelegation && (
				<UpdateDelegationForm
					delegationTo={delegationTo}
					isOpen={updateDelegation}
					delegation={delegation}
					close={() => setUpdateDelegation(false)}
				/>
			)}
			<Flex justifyContent="space-between" alignItems="center">
				<Text fontSize={2} pl={2}>
					{name}
				</Text>
				<Flex alignItems="center">
					<Text fontSize={2}> {DelegationTime} </Text>
					<DropdownMenuButton
						iconName="ellipsis-h"
						items={dropdownItems}
					/>
				</Flex>
			</Flex>
		</Card>
	)
}

DelegationCard.propTypes = {}

export default DelegationCard
