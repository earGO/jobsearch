import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { space } from 'styled-system'
import theme from '../theme'

const vertical = ({ vertical }) =>
  vertical && {
    display: 'inline-block',
    borderBottom: 0,
    width: '1px',
    height: '0.9em',
    top: '0.1em',
  }

/** Используется для разделения информации линиями. */
const DividerComponent = styled.div`
  position: relative;
  border: 0;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-color: ${props => props.theme.colors[props.color]};
  background-color: ${props => props.theme.colors[props.color]};

  ${space}
  ${vertical};
`

const HorizontalDivider = Object.assign({}, DividerComponent)

HorizontalDivider.defaultProps = {
  theme: theme,
  mt: 3,
  mb: 3,
  ml: 0,
  mr: 0,
}

const VerticalDivider = Object.assign({}, DividerComponent)
VerticalDivider.defaultProps = {
  theme: theme,
  mt: 0,
  mb: 0,
  ml: 3,
  mr: 3,
}

/** @component */
const Divider = ({ vertical, ...rest }) => {
  if (vertical) return <VerticalDivider vertical={true} {...rest} />
  return <HorizontalDivider vertical={false} {...rest} />
}

Divider.displayName = 'Divider'

Divider.propTypes = {
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
  /** Делает линию вертикальной и превращает ее в инлайн элемент */
  vertical: PropTypes.bool,
  /** Цвет */
  color: PropTypes.string,
  /** @ignore */
  theme: PropTypes.any,
}

Divider.defaultProps = {
  color: 'border',
}

export default Divider
