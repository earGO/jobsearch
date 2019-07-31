import styled from 'styled-components'
import PropTypes from 'prop-types'
import {borderRadius} from 'styled-system'
import Box from './Box'
import theme from '../theme'

const boxShadow = props => {
	const boxShadows = {
		sm: {
			'box-shadow': props.theme.boxShadows[0]
		},
		md: {
			'box-shadow': props.theme.boxShadows[1]
		},
		lg: {
			'box-shadow': props.theme.boxShadows[2]
		},
		xl: {
			'box-shadow': props.theme.boxShadows[3]
		}
	}
	return boxShadows[props.boxShadowSize] || {}
}

const boxBorder = props => ({
	border: `1px solid ${props.theme.colors.border}`
})

/** Наследует компонент `<Box />` и расширяет его параметрами **boxShadowSize, borderColor, borderRadius, borderWidth**.
 * Используется для создания блока с тенью и границами.
 * */
const Card = styled(Box)`
  overflow: hidden;
  position: relative;

  ${boxShadow} 
  ${boxBorder} 
  ${borderRadius};
`

Card.propTypes = {
	/** Размер тени */
	boxShadowSize: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
	/** Радиус скругления блока */
	borderRadius: PropTypes.oneOf([0, 1, 2]),
	/** Ширина бордера */
	borderWidth: PropTypes.oneOf([0, 1, 2]),
	/** @ignore */
	theme: PropTypes.any
}

Card.defaultProps = {
	borderRadius: 1,
	borderWidth: 0,
	theme: theme
}

Card.displayName = 'Card'

/** @component */
export default Card
