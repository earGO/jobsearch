import React from 'react'
import {useSelector} from 'react-redux'
import * as projectCard from './module'
import {Flex} from '../../import'
import * as selectors from './module/selectors'
import {DynamicModuleLoader} from 'redux-dynamic-modules'
import Title from './Title'
import ModuleNaviTab from './ModuleNaviTab'
import Sections from './Sections'
import Fields from './Fields'
import {ContentBox, Loading} from '../../import'

function ProjectCard({...props}) {
	const loading = useSelector(selectors.projectLoading)
	const projectData = useSelector(selectors.projectSelector)
	const projectTitle = useSelector(selectors.projectTitleSelector)
	const projectTabs = useSelector(selectors.tabsSelector)
	const projectSections = useSelector(selectors.sectionsSelector)
	const projectFields = useSelector(selectors.fieldsSelector)
	const tabSelected = useSelector(selectors.selectedTabsSelector)

	const notReady =
		loading &&
		!(projectData !== undefined) &&
		!(projectSections !== undefined) &&
		!(projectFields !== undefined)
	return (
		<DynamicModuleLoader modules={[projectCard.default]}>
			{notReady ? (
				<Loading overlay>Загрузка карточки проекта</Loading>
			) : (
				<Flex
					style={{height: '100%'}}
					flexDirection={'column'}
					justifyContent={'flex-start'}
				>
					<Title projectTitle={projectTitle} />
					<ModuleNaviTab
						projectTabs={projectTabs}
						tabSelected={tabSelected}
					/>
					<ContentBox
						flexDirection={'row'}
						alignItems={'flex-start'}
						padding={16}
					>
						<Sections projectSections={projectSections} />
						<Fields projectFields={projectFields} />
					</ContentBox>
				</Flex>
			)}
		</DynamicModuleLoader>
	)
}

ProjectCard.propTypes = {}

ProjectCard.defaultProps = {}

ProjectCard.baseRoute = projectCard.baseRoute

export default ProjectCard
