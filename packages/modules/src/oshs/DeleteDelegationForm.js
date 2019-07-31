import React from 'react'
import {useDispatch} from 'react-redux'

import {actions as oshsDelegationActions} from './module/delegation'

import {FormModal, ButtonsOSHS} from '../../import'

export default function DeleteDelegationForm({close, isOpen, delegation}) {
	const dispatch = useDispatch()
	if (isOpen) {
		return (
			<FormModal
				isOpen={isOpen}
				title={'Удалить делегирование?'}
				close={close}
			>
				<ButtonsOSHS
					btn1Label={'Удалить'}
					btn2Label={'Отмена'}
					btn1OnClick={() => {
						if (delegation.id) {
							dispatch(
								oshsDelegationActions.deleteDelegation(
									delegation.id
								)
							)
							close()
						}
					}}
					btn2OnClick={close}
				/>
			</FormModal>
		)
	}
	return ''
}
