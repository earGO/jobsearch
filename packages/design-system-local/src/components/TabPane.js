import PropTypes from 'prop-types'
import styled from 'styled-components'
import { space } from 'styled-system'
import Box from './Box'
import theme from '../theme'

const TabPane = styled(Box)`
  ${props => !props.isActive && 'display: none;'}
  ${space};
`

TabPane.propTypes = {
  /** Активна ли вкладка */
  isActive: PropTypes.bool,
  /** Текст вкладки. */
  tab: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  /** Уникальный ключ вкладки */
  tabKey: PropTypes.string.isRequired,
  /** Заблокирована ли вкладка */
  disabled: PropTypes.bool,
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

TabPane.defaultProps = {
  p: 2,
  disabled: false,
  theme,
}

TabPane.displayName = 'Tabs.TabPane'

/** @component */
export default TabPane
