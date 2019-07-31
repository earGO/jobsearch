import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import Positional from './Positional'
import PropTypes from 'prop-types'
import theme from '../theme'

const Body = styled.div.attrs(props => ({
  font: props.font,
  placement: props.placement,
}))`
  position: relative;
  font-family: ${props => props.font};
  font-size: ${props => props.theme.fontSizes[0] + 'px'};
  padding: ${props => `${props.theme.space[2]}px ${props.theme.space[3]}px`};
  background-color: ${props => props.theme.colors.black};
  border-radius: ${props => props.theme.radii[2] + 'px'};
  opacity: 0.85;
  animation: all 0.5s;
  min-width: 50px;
  text-align: center;

  & p {
    color: #ffffff;
    margin: 0;
  }

  &:after {
    position: absolute;
    width: 8px;
    height: 8px;
    content: '';
    transform: rotate(45deg);
    background-color: ${props => props.theme.colors.black};
    margin: -4px 0 0 -4px;

    ${props =>
      props.placement === 'top' &&
      css`
        left: 50%;
        top: 100%;
      `}

      ${props =>
        props.placement === 'topLeft' &&
        css`
          left: 25%;
          top: 100%;
        `}
      ${props =>
        props.placement === 'topRight' &&
        css`
          left: 75%;
          top: 100%;
        `}
      ${props =>
        props.placement === 'bottom' &&
        css`
          left: 50%;
          top: 0%;
        `}
      ${props =>
        props.placement === 'bottomLeft' &&
        css`
          left: 25%;
          top: 0%;
        `}
      ${props =>
        props.placement === 'bottomRight' &&
        css`
          left: 75%;
          top: 0%;
        `}
      ${props =>
        props.placement === 'left' &&
        css`
          left: 100%;
          top: 50%;
        `}
      ${props =>
        props.placement === 'right' &&
        css`
          left: 0%;
          top: 50%;
        `}
  }
`

const Wrapper = styled.span`
  font-size: ${props => props.theme.fontSizes[1] + 'px'};
`

const getAlign = placement => {
  switch (placement) {
    case 'left':
      return {
        offsetX: -8,
        offsetY: 0,
      }
    case 'right':
      return {
        offsetX: 8,
        offsetY: 0,
      }
    case 'bottom':
    case 'bottomRight':
    case 'bottomLeft':
      return {
        offsetX: 0,
        offsetY: 8,
      }
    case 'topRight':
    case 'topLeft':
    case 'top':
      return {
        offsetX: 0,
        offsetY: -8,
      }
    default:
      return {
        offsetX: 0,
        offsetY: 0,
      }
  }
}

/** Применяется для вывода уточняющей информации во всплывающем окне */
class Tooltip extends Component {
  render() {
    const { children, events, font, placement, text, transitionName } = this.props

    const popupComponent = (
      <Body font={font} placement={placement}>
        <p>{text}</p>
      </Body>
    )

    return (
      <Positional
        align={getAlign(placement)}
        events={events}
        placement={placement}
        popupComponent={popupComponent}
        transitionName={transitionName}
      >
        <Wrapper>{children}</Wrapper>
      </Positional>
    )
  }
}

Tooltip.propTypes = {
  /** Элемент, относительно которого будет позиционироваться тултип */
  children: PropTypes.element,
  /** Ивенты, вызывающие появляение тултипа. Возможные ивенты - click, contextMenu, focus, hover */
  events: PropTypes.arrayOf(PropTypes.string),
  /** Шрифт, используемый в тултипе */
  font: PropTypes.string,
  /** Позиционирование компонента относительно родительского компонента. Аргументы формируются исходя из параметра builtinPlacements */
  placement: PropTypes.oneOf(['left', 'right', 'top', 'bottom', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight']),
  /** Текст в тултипе */
  text: PropTypes.string,
  /** Имя класса для анимаций. Например, rc-trigger-popup-zoom. Стандартная анимация убирается передачей null */
  transitionName: PropTypes.string,
}

Tooltip.defaultProps = {
  children: <span>Default tooltip</span>,
  events: ['hover'],
  font: theme.font.main,
  placement: 'top',
  text: 'help',
  transitionName: 'rc-trigger-popup-fade',
  theme,
}

Tooltip.displayName = 'Tooltip'

/** @component */
export default Tooltip
