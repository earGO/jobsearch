import styled from 'styled-components'
import PropTypes from 'prop-types'
import { space, color, width, height, minWidth, maxWidth, fontSize, flex, order, alignSelf } from 'styled-system'

/**
 * Используйте этот компонент для управления css-параметрами width, margin, padding, and color.
 */
const Box = styled('div')(
  {
    boxSizing: 'border-box',
    position: 'relative',
  },
  space,
  color,
  width,
  height,
  fontSize,
  flex,
  order,
  alignSelf,
  minWidth,
  maxWidth,
  props => props.css,
)

Box.displayName = 'Box'

Box.propTypes = {
  /** Обьект с css-правилами */
  css: PropTypes.object,
  /** margin */
  m: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array]),
  /** margin-top*/
  mt: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array]),
  /** margin-right*/
  mr: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array]),
  /** margin-bottom*/
  mb: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array]),
  /** margin-left*/
  ml: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array]),
  /** margin-left and margin-right */
  mx: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array]),
  /** margin-top and margin-bottom */
  my: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array]),
  /** padding */
  p: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array]),
  /** padding-top*/
  pt: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array]),
  /** padding-right*/
  pr: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array]),
  /** padding-bottom*/
  pb: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array]),
  /** padding-left*/
  pl: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array]),
  /** padding-left and padding-right */
  px: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array]),
  /** padding-top and padding-bottom */
  py: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array]),
  /** Фоновый цвет блока */
  bg: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  /** Цвет текста */
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  /** Ширина блока */
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array]),
  /** Высота блока */
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array]),
  /** Размер шрифта */
  fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array]),
  /** Минимальная ширина */
  minWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array]),
  /** Максимальная ширина */
  maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array]),
}

/** @component */
export default Box
