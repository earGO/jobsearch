import React, {useRef, useState} from 'react'
import {Box, Flex, Scrollbars, ProjectManager, LocalNavigation} from '../import'
import ProjectManagerLazy from '../LazyLoad/ProjectManagerLazy'
import ProjectCard from '../LazyLoad/ProjectCard'
import {useSelector} from 'react-redux'

function ProjectManagerCompound({history, ...props}) {
	/* Create reference to scrollbars to invoke local methods */
	const scrollBarsRef = useRef(null)
	const onUpButtonClick = () => {
		/* Invoke local method of scrollbars to scroll to top */
		scrollBarsRef.current.scrollToTop()
	}
	const projectSelected = useSelector(ProjectManager.selectors.projectSelected) // Catch the action of project selection
	const projectId = useSelector(ProjectManager.selectors.selectedProjectId) // Catch selected project ID

	/* if user clicked on a project from table - load projectCard component with projectId in it
	 * else  load personal-page */
	const DisplayedChild = () => {
		if (projectSelected) {
			return <ProjectCard projectId={projectId} />
		} else {
			return <ProjectManagerLazy history={history} />
		}
	}

	return (
		<Flex
			height="100vh"
			flexDirection="column"
			alignItems="stretch"
			{...props}
		>
			<LocalNavigation onUpButtonClick={onUpButtonClick} />
			<Box flex={1} mx="auto" width="100%" style={{overflow: 'hidden'}}>
				<Scrollbars universal style={{height: 760}} ref={scrollBarsRef}>
					<DisplayedChild />
				</Scrollbars>
			</Box>
		</Flex>
	)
}

export default ProjectManagerCompound
