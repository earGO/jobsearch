import React from 'react'
import * as personalNavigation from './module'
import {useSelector, useDispatch} from 'react-redux'
import {Box, ContentBox, Flex, Icon, Loading, Text} from '../../import'
import styled from 'styled-components'
import * as selectors from './module/selectors'
import {DynamicModuleLoader} from 'redux-dynamic-modules'
import ModuleNavigationTabs from './ModuleNavigationTabs'

const ZIndexed = styled(Box)`
	z-index: 3;
`

const CustomButton = styled(Flex)`
	border: 0.6px solid #b5b5b5;
	border-radius: 4px;
	position: absolute;
	left: -108px;
	width: 88px;
	height: 32px;!important;
	cursor: pointer;
	transition: all 0.15s ease-in-out;
	&:hover {
		transform: scale(1.025);
	}
`

function LkNav({scrollTop, onUpButtonClick, ...props}) {
	const loading = useSelector(selectors.tabsLoading)
	const LkNavTabs = useSelector(selectors.tabsSelector)
	const tabSelected = useSelector(selectors.selectedTabsSelector)

	const dispatch = useDispatch()

	const notReady = loading && !(LkNavTabs !== undefined)

	return (
		<DynamicModuleLoader modules={[personalNavigation.default]}>
			{notReady ? (
				<Loading overlay>Загрузка навигации</Loading>
			) : (
				<ZIndexed bg={'#f5f5f5'}>
					<ContentBox
						justifyContent={'flex-start'}
						alignItems={'center'}
					>
						<CustomButton
							justifyContent={'space-evenly'}
							alignItems={'center'}
							onClick={onUpButtonClick}
						>
							<Icon name={'arrow_upward'} size={1} />
							<Text fontSize={'12px'}>Наверх</Text>
						</CustomButton>
						<ModuleNavigationTabs
							LkNavTabs={LkNavTabs}
							tabSelected={tabSelected}
						/>
					</ContentBox>
				</ZIndexed>
			)}
		</DynamicModuleLoader>
	)
}

export default LkNav
