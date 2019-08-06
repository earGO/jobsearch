import styled from 'styled-components'
import PropTypes from 'prop-types'
import { alignItems, justifyContent, flexWrap, flexDirection } from 'styled-system'
import Box from './Box'
import theme from '../theme'

/**
 * Наследует компонент `<Box />`, добавляет ему **display: flex** и расширяет свойствами **alignItems, justifyContent, flexWrap, flexDirection**.
 */
const Flex = styled(Box)`
  display: flex;

  ${alignItems} 
  ${justifyContent} 
  ${flexWrap} 
  ${flexDirection};
`

Flex.propTypes = {
  /** Выравнивание по-вертикали */
  alignItems: PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'baseline', 'stretch']),
  /**
   * Выравнивание по-горизонтали: One of: flex-start, flex-end, center, space-between, space-around, space-evenly.
   * При использовании брейкпоинтов указываем массив. Например, для трех брейкпоинтов: ['flex-start', 'flex-end', 'center']
   * */
  justifyContent: PropTypes.oneOfType([
    PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly']),
    PropTypes.array,
  ]),
  /**
   * Задает правила вывода flex-элементов —  в одну строку или в несколько, с переносом блоков.
   * Если перенос разрешен, то возможно задать направление, в котором выводятся блоки
   * */
  flexWrap: PropTypes.oneOf(['nowrap', 'wrap', 'wrap-reverse']),
  /**
   * Задаёт направление основных осей в контейнере и тем самым определяет положение флексов в контейнере
   */
  flexDirection: PropTypes.oneOf(['row', 'row-reverse', 'column', 'column-reverse']),
  /** @ignore */
  theme: PropTypes.any,
}

Flex.defaultProps = {
  justifyContent: 'flex-start',
  alignItems: 'stretch',
  flexDirection: 'row',
  flexWrap: 'nowrap',
  theme,
}

Flex.displayName = 'Flex'

/** @component */
export default Flex
