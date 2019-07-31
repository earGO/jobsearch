import React, {useRef, useState} from 'react'
import {Box, Flex, LkNav, Scrollbars, lk, projectCard} from '../import'
import LazyLk from '../LazyLoad/LK'
import ProjectCard from '../LazyLoad/ProjectCard'
import {useSelector} from 'react-redux'

function LK({history, ...props}) {
	/* Create reference to scrollbars to invoke local methods */
	const scrollBarsRef = useRef(null)
	const onUpButtonClick = () => {
		/* Invoke local method of scrollbars to scroll to top */
		scrollBarsRef.current.scrollToTop()
	}
	const projectSelected = useSelector(lk.selectors.projectSelected) // Catch the action of project selection
	const projectId = useSelector(lk.selectors.selectedProjectId) // Catch selected project ID

	/* if user clicked on a project from table - load projectCard component with projectId in it
	 * else  load personal-page */
	const DisplayedChild = () => {
		if (projectSelected) {
			return <ProjectCard projectId={projectId} />
		} else {
			return <LazyLk history={history} />
		}
	}

	return (
		<Flex
			height="100vh"
			flexDirection="column"
			alignItems="stretch"
			{...props}
		>
			<LkNav onUpButtonClick={onUpButtonClick} />
			<Box flex={1} mx="auto" width="100%" style={{overflow: 'hidden'}}>
				<Scrollbars universal style={{height: 760}} ref={scrollBarsRef}>
					<DisplayedChild />
				</Scrollbars>
			</Box>
		</Flex>
	)
}

export default LK
