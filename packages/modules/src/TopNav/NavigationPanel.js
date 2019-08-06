import React from 'react'
import {useDispatch} from 'react-redux'
import * as actions from './module/actions'
import {ContentBox, OptionUnderline} from '../../import'

function NavigationPanel({mainNavTabs, tabSelected, history, ...props}) {
	const dispatch = useDispatch()

	const selectTab = tabId => dispatch(actions.selectOption(tabId)) // The action to select  a tab

	const handleRouteChange = tabId => history.push('/' + tabId)

	const handleSelectTab = tabId => {
		selectTab(tabId)
		handleRouteChange(tabId)
	}

	if (mainNavTabs !== undefined && mainNavTabs !== null) {
		return (
			<ContentBox justifyContent={'flex-start'} alignItems={'center'}>
				{mainNavTabs.map((tab, key) => {
					return (
						<OptionUnderline
							key={key}
							bottomColor={'primary'}
							tabSelected={tabSelected}
							tabId={tab.id}
							selectTab={handleSelectTab}
						>
							{tab.value}
						</OptionUnderline>
					)
				})}
			</ContentBox>
		)
	} else {
		return null
	}
}

export default NavigationPanel
