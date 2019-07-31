import React from 'react'
import PropTypes from 'prop-types'
import {Flex, Box, Text} from '../../import'
import styled from 'styled-components'
import {
	ContentBox,
	OptionWithIcon,
	FlexContainerBottomDivider
} from '../../import'

const OffsetBox = styled(Box)`
	padding: 0;
	margin: 0;
	position: relative;
	top: -12%;
`

const AdressText = styled(Text)``

function Title({projectTitle}) {
	if (projectTitle !== undefined) {
		return (
			<FlexContainerBottomDivider dividercolor={'border'}>
				<ContentBox padding={33} justifyContent={'space-between'}>
					<Flex id-={'leftBox'}>
						<Box
							id={'greenLine'}
							bg="#2e7d32"
							width={'8px'}
							height={'40px'}
							mr={16}
						>
							{''}
						</Box>
						<Flex
							id={'projectNameAndAdress'}
							flexDirection="column"
							height={'40px'}
							align-content={'space-between'}
						>
							<OffsetBox
								id={'projectNameBox'}
								p={0}
								width={'264px'}
								height={'24px'}
							>
								<Text id={'projectName'} fontSize={3}>
									{projectTitle.projectName}
								</Text>
							</OffsetBox>
							<Box>
								<AdressText
									id={'projectAdress'}
									fontSize={1}
									m={0}
									p={0}
									width={'320px'}
									height={'16px'}
									color={'disabled'}
								>
									{projectTitle.projectAdress}
								</AdressText>
							</Box>
						</Flex>
					</Flex>
					<Box id={'rightBox'}>
						<Flex>
							<OptionWithIcon
								icon={'filter_none'}
								option={'Сравнить'}
							/>
							<OptionWithIcon
								icon={'account_box'}
								option={'Участники'}
							/>
							<OptionWithIcon
								icon={'create'}
								option={'Редактировать'}
							/>
						</Flex>
					</Box>
				</ContentBox>
			</FlexContainerBottomDivider>
		)
	} else {
		return null
	}
}

Title.propTypes = {
	jokes: PropTypes.array,
	seen: PropTypes.array,
	opened: PropTypes.array
}

Title.defaultProps = {
	jokes: [],
	seen: [],
	opened: []
}

export default Title
