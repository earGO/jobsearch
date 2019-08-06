import React from 'react'
import PropTypes from 'prop-types'
import * as actions from './module/actions'
import {useDispatch} from 'react-redux'
import {
	ContentBox,
	OptionUnderline,
	FlexContainerBottomDivider
} from '../../import'

function ModuleNaviTab({projectTabs, tabSelected}) {
	const dispatch = useDispatch()

	const selectTab = tabId => dispatch(actions.selectTab(tabId)) // The action to select  a tab

	if (projectTabs !== undefined) {
		return (
			<FlexContainerBottomDivider>
				<ContentBox>
					{projectTabs.map((tab, key) => {
						return (
							<OptionUnderline
								key={key}
								bottomColor={'primary'}
								tabSelected={tabSelected}
								tabId={tab.id}
								selectTab={selectTab}
							>
								{tab.name}
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

ModuleNaviTab.propTypes = {
	projectTabs: PropTypes.array
}

ModuleNaviTab.defaultProps = {
	projectTabs: [
		{
			name: 'loading tabs'
		}
	]
}

export default ModuleNaviTab
