import React from 'react'
import * as actions from './module/actions'
import {useDispatch} from 'react-redux'
import {
	ContentBox,
	OptionUnderline,
	FlexContainerBottomDivider
} from '../../import'

function ModuleNavigationTabs({LkNavTabs, tabSelected, ...props}) {
	const dispatch = useDispatch()

	const selectTab = tabId => dispatch(actions.selectOption(tabId)) // The action to select  a tab

	if (LkNavTabs !== undefined && LkNavTabs !== null) {
		return (
			<FlexContainerBottomDivider>
				<ContentBox>
					{LkNavTabs.map((tab, key) => {
						return (
							<OptionUnderline
								key={key}
								bottomColor={'primary'}
								tabSelected={tabSelected}
								tabId={tab.id}
								selectTab={selectTab}
							>
								{tab.value}
							</OptionUnderline>
						)
					})}
				</ContentBox>
			</FlexContainerBottomDivider>
		)
	} else {
		return null
	}
}

ModuleNavigationTabs.propTypes = {}

ModuleNavigationTabs.defaultProps = {}

export default ModuleNavigationTabs
