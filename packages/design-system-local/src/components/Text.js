import styled from 'styled-components'
import PropTypes from 'prop-types'
import { fontSize, space, color } from 'styled-system'
import theme from '../theme'

const align = ({ align }) => Boolean(align) && { textAlign: align }
const regular = ({ regular, theme }) => Boolean(regular) && { fontWeight: theme.fontWeights.regular }
const bold = ({ bold, theme }) => Boolean(bold) && { fontWeight: theme.fontWeights.bold }
const italic = ({ italic }) => Boolean(italic) && { fontStyle: 'italic' }
const caps = ({ caps }) => Boolean(caps) && { textTransform: 'uppercase' }
const inline = ({ inline }) => Boolean(inline) && { display: 'inline-block' }
const strike = ({ strike }) => Boolean(strike) && { textDecoration: 'line-through' }
const truncated = ({ truncated }) =>
  Boolean(truncated) && {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  }

/**
 * Используется для вывода любой текстовой информации.
 */
const Text = styled.div`
  color: ${props => props.theme.colors.text};

  ${italic} 
  ${fontSize} 
  ${space} 
  ${truncated}
  ${color}
  ${caps}
  ${regular}
  ${bold} 
  ${align}
  ${inline}
  ${strike};
`

// Text.span = Text.withComponent('span')
// Text.p = Text.withComponent('p')
// Text.s = Text.withComponent('s')

Text.displayName = 'Text'

Text.propTypes = {
  /** Размер шрифта */
  fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array]),
  /** Выравнивание текста по горизонтали */
  align: PropTypes.oneOf(['left', 'center', 'right', 'justify']),
  /** Капитель */
  caps: PropTypes.bool,
  /** Толщина текста по-умолчанию */
  regular: PropTypes.bool,
  /** Жирный текст */
  bold: PropTypes.bool,
  /** Курсивный текст  */
  italic: PropTypes.bool,
  /** Цвет текста */
  color: PropTypes.string,
  /** Обрезать текст по ширине родительского блока */
  truncated: PropTypes.bool,
  /** Инлайновый текст */
  inline: PropTypes.bool,
  /** Зачеркнутый текст */
  strike: PropTypes.bool,
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
  /** @ignore */
  theme: PropTypes.any,
}

Text.defaultProps = {
  fontSize: 1,
  regular: true,
  bold: false,
  italic: false,
  caps: false,
  truncated: false,
  theme,
}

/** @component */
export default Text
