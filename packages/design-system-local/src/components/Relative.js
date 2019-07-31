import styled from 'styled-components'
import PropTypes from 'prop-types'
import { top, bottom, left, right, zIndex } from 'styled-system'
import Box from './Box'

/**
 * Применяется для относительного позиционирования.
 * Наследует `<Box />`  и расширяет его параметрами **top, right, bottom, left, zIndex**.
 * */
const Relative = styled(Box)`
  position: relative;

  ${top} 
  ${right}
  ${bottom} 
  ${left} 
  ${zIndex};
`

Relative.propTypes = {
  /** Смещение сверху */
  top: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array]),
  /** Смещение снизу */
  bottom: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array]),
  /** Смещение справа */
  right: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array]),
  /** Смещение слева */
  left: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array]),
  /**
   * Любые позиционированные элементы на веб-странице могут накладываться друг на друга в определенном порядке,
   * имитируя тем самым третье измерение, перпендикулярное экрану.
   * Каждый элемент может находиться как ниже, так и выше других объектов веб-страницы,
   * их размещением по z-оси и управляет z-index
   * */
  zIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

Relative.displayName = 'Relative'

/** @component */
export default Relative
