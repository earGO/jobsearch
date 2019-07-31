import styled from 'styled-components'
import PropTypes from 'prop-types'
import Box from './Box'
import { top, bottom, left, right, zIndex } from 'styled-system'

/**
 * Применяется для абсолютного позиционирования.
 * Обычно используется в качестве потомка для компонента `<Relative />`.
 * Наследует `<Box />`  и расширяет его параметрами **top, right, bottom, left, zIndex**.
 * */
const Absolute = styled(Box)`
  position: absolute;
  
  ${top}
  ${right}
  ${bottom}
  ${left}
  ${zIndex};
`

Absolute.propTypes = {
  /** Смещение сверху */
  top: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array]),
  /** Смещение снизу */
  bottom: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array]),
  /** Смещение слева */
  left: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array]),
  /** Смещение справа */
  right: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array]),
  /**
   * Любые позиционированные элементы на веб-странице могут накладываться друг на друга в определенном порядке,
   * имитируя тем самым третье измерение, перпендикулярное экрану.
   * Каждый элемент может находиться как ниже, так и выше других объектов веб-страницы,
   * их размещением по z-оси и управляет z-index
   * */
  zIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

Absolute.displayName = 'Absolute'

/** @component */
export default Absolute
