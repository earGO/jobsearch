import React from 'react'
import PropTypes from 'prop-types'
import SectionsItem from './SectionsItem'
import {Flex, Box} from '../../import'
import styled from 'styled-components'
import AddSection from './AddSection'
import {useDispatch} from 'react-redux'
import * as actions from './module/actions'
import {ContentBox} from '../../import'

const Bordered = styled(Flex)``

function Sections({projectSections}) {
	const dispatch = useDispatch()
	const selectSection = id => dispatch(actions.selectSection(id))
	if (projectSections !== undefined) {
		return (
			<ContentBox contentwidth={352} style={{alignSelf: 'flex-start'}}>
				<Bordered flexDirection={'column'}>
					<Box mb={1}>
						<AddSection />
					</Box>

					<Flex flexDirection={'column'}>
						{projectSections.map((section, key) => {
							return (
								<SectionsItem
									key={key}
									sectionId={section.id}
									selectSection={selectSection}
								>
									{section.name}
								</SectionsItem>
							)
						})}
					</Flex>
				</Bordered>
			</ContentBox>
		)
	} else {
		return null
	}
}

Sections.propTypes = {
	projectSections: PropTypes.array
}

Sections.defaultProps = {
	projectSections: [
		{
			author: 'Barney Stinson',
			dateCreated: '02-02-2019',
			id: 'm21n-solutions-id',
			name: "Something wrong, data haven't came",
			nick: 'someNick',
			sort: 'some-sort',
			tabId: 'someId',
			version: '1.0.0'
		}
	]
}

SectionsItem.propTypes = {
	projectSections: PropTypes.array
}

SectionsItem.defaultProps = {
	projectSections: []
}

export default Sections
