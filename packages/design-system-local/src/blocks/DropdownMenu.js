import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {
	Flex,
	Text,
	Card,
	Box,
	Popover,
	FlexContainerBottomDivider
} from '../index'
import styled from 'styled-components'
import theme from '../theme'

/** В компонент нужно обернуть кнопку/иконку, при клике на которую должно появиться меню  */

const PopoverMenuItem = styled(Box)`
	cursor: pointer;
	&:hover {
		background-color: ${theme.colors.lightGrey};
	}
	font-size: 12px;
	font-family: ${theme.font.main};
`

function PopoverItemSmart({item, ...props}) {
	const handleClick = e => {
		item.HandleClick('smart' + item.name)
	}
	return (
		<PopoverMenuItem onClick={handleClick} {...props}>
			{item.name}
		</PopoverMenuItem>
	)
}

function DropdownMenu({
	content,
	position,
	children,
	shiftLeft,
	shiftTop,
	...props
}) {
	const [open, setOpen] = useState(false)
	return (
		<Popover
			isOpen={open}
			onClickOutside={() => setOpen(false)}
			position={position} // preferred position
			content={({position, targetRect, popoverRect}) => (
				<Popover.ArrowContainer
					position={position}
					targetRect={targetRect}
					popoverRect={popoverRect}
					arrowColor={'white'}
					arrowSize={10}
					arrowStyle={{opacity: 1.0, zIndex: 6}}
				>
					<Card bg={'white'} p={2} boxShadowSize={'md'}>
						{content.map((item, key) => {
							return (
								<FlexContainerBottomDivider key={key}>
									<PopoverItemSmart item={item} {...props} />
								</FlexContainerBottomDivider>
							)
						})}
					</Card>
				</Popover.ArrowContainer>
			)}
			contentLocation={({nudgedLeft, nudgedTop}) => ({
				top: nudgedTop + shiftTop,
				left: nudgedLeft + shiftLeft
			})}
			{...props}
		>
			<Box onClick={() => setOpen(true)}>{children}</Box>
		</Popover>
	)
}

DropdownMenu.propTypes = {
	/** ['top','left','bottom','right'], определяет где относительно иконки появляется менюшка */
	position: PropTypes.string,
	/** Массив с опциями, из которых состоит появляющееся меню. Каждая опция - объект с полями  "name" для выводимого названия пункта, и
	 * HandleClick - содержит функцию со всеми параметрами, которую вызывает пункт меню по клику на него*/
	content: PropTypes.array,
	shiftLeft: PropTypes.number,
	shiftTop: PropTypes.number
}

DropdownMenu.defaultProps = {
	position: 'bottom',
	shiftLeft: 0,
	shiftTop: 0,
	content: [
		{
			name: 'Добавьте пункты',
			HandleClick: () => {
				console.log('click')
			}
		}
	],
	width: 208,
	height: 32,
	pt: 2
}

export default DropdownMenu
