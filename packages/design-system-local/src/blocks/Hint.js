import React, {useState, useRef, createRef} from 'react'
import PropTypes from 'prop-types'
import {Icon, Flex, Text, Popover, Card, Button} from '../index'
import styled from 'styled-components'

/* Styling component with grow animation for clickable Icon of hint */
const ClickableIcon = styled(Button)`
cursor: pointer;
transition: all;
transition-duration: {$props=>props.theme.duration.fast};
transition-timing-function: {$props=>props.theme.timingFunction.easeInOut};
&:hover{
  transform: scale(1.0015);
  color:  {$props=>props.theme.colors.primary};
}
`
/* Z-index adjustment for hint card */
const HintCard = styled(Card)`
z-index: 2147483649;!important;
	border-width: 0;
`

function Hint({
	size,
	arrowColor,
	bgColor,
	shiftLeft,
	shiftTop,
	hintText,
	color,
	position,
	...props
}) {
	const [isPopoverOpen, setPopoverOpen] = useState(false)
	return (
		<Popover
			isOpen={isPopoverOpen}
			onClickOutside={() => setPopoverOpen(false)}
			position={position} // popover position from ['top','left','right','bottom']
			/* Content of a hint */
			content={({position, targetRect, popoverRect}) => (
				<Popover.ArrowContainer
					position={position}
					targetRect={targetRect}
					popoverRect={popoverRect}
					arrowColor={arrowColor}
					arrowSize={10}
					arrowStyle={{opacity: 1.0, zIndex: 2147483649}}
				>
					<HintCard p={3} bg={bgColor} boxShadowSize={'md'}>
						<Text color={color}>{hintText}</Text>
					</HintCard>
				</Popover.ArrowContainer>
			)}
			/* Hint card adjustment related to Hint icon */
			contentLocation={({nudgedLeft, nudgedTop}) => ({
				top: nudgedTop + shiftTop,
				left: nudgedLeft + shiftLeft
			})}
			{...props}
		>
			<ClickableIcon
				type={'flat'}
				onClick={() => setPopoverOpen(!isPopoverOpen)}
			>
				<Icon name={'help_outline'} size={size} color={color} />
			</ClickableIcon>
		</Popover>
	)
}

Hint.propTypes = {
	arrowColor: PropTypes.string,
	bgColor: PropTypes.string,
	hintText: PropTypes.string,
	position: PropTypes.string,
	color: PropTypes.string,
	size: PropTypes.number,
	shiftTop: PropTypes.number,
	shiftLeft: PropTypes.number
}

Hint.defaultProps = {
	arrowColor: 'white',
	bgColor: 'white',
	hintText: 'Enter hint text',
	position: 'top',
	color: 'black',
	size: 18,
	shiftTop: 5,
	shiftLeft: -10
}

export default Hint
