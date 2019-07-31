import PropTypes from 'prop-types'
import Trigger from 'rc-trigger'
import 'rc-trigger/assets/index.css' // @todo подключить
import React, { Component } from 'react'

function getPopupAlign(align) {
  return {
    offset: [align.offsetX, align.offsetY],
    overflow: {
      adjustX: 1,
      adjustY: 1,
    },
  }
}

/**
 * Применяется для создания всплывающих элементов.
 * */
class Positional extends Component {
  render() {
    const {
      align,
      builtinPlacements,
      children,
      destroyPopupOnHide,
      events,
      placement,
      popupComponent,
      stretch,
      transitionName,
    } = this.props
    return (
      <Trigger
        destroyPopupOnHide={destroyPopupOnHide}
        popup={popupComponent}
        popupAlign={getPopupAlign(align)}
        popupPlacement={placement}
        popupTransitionName={transitionName}
        action={events}
        builtinPlacements={builtinPlacements}
        stretch={stretch}
      >
        {children}
      </Trigger>
    )
  }
}

Positional.propTypes = {
  /** Отступы от родительского контейнера в пикселях */
  align: PropTypes.shape({
    offsetX: PropTypes.number,
    offsetY: PropTypes.number,
  }),
  /** Настройки позиционирования компонента относительно родительского контейнера */
  builtinPlacements: PropTypes.object,
  /** Элемент, относительно которого будет позиционироваться наш компонент */
  children: PropTypes.element,
  /** Уничтожать ли попап когда он скрыт */
  destroyPopupOnHide: PropTypes.bool,
  /** Ивенты, вызывающие появляение компонента. Возможные ивенты - click, contextMenu, focus, hover */
  events: PropTypes.arrayOf(PropTypes.string),
  /** Задержка перед появлением компонента (в секундах) */
  mouseEnterDelay: PropTypes.number,
  /** Задержка перед исчезанием компонента (в секундах) */
  mouseLeaveDelay: PropTypes.number,
  /** Позиционирование компонента относительно родительского компонента. Аргументы формируются исходя из параметра builtinPlacements */
  placement: PropTypes.oneOf(['left', 'right', 'top', 'bottom', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight']),
  /** Компонент для отображения */
  popupComponent: PropTypes.element,
  /** Дает возможность попап элементу растягиваться относительно родительского контейнера. Варианты - 'width', 'minWidth', 'height', 'minHeight' и их вариации, напр. 'height minWidth' */
  stretch: PropTypes.string,
  /** Имя класса для анимаций. Например, rc-trigger-popup-zoom */
  transitionName: PropTypes.string,
}

Positional.defaultProps = {
  align: {
    offsetX: 0,
    offsetY: 0,
  },
  builtinPlacements: {
    left: {
      points: ['cr', 'cl'],
    },
    right: {
      points: ['cl', 'cr'],
    },
    top: {
      points: ['bc', 'tc'],
    },
    bottom: {
      points: ['tc', 'bc'],
    },
    topLeft: {
      points: ['bl', 'tl'],
    },
    topRight: {
      points: ['br', 'tr'],
    },
    bottomRight: {
      points: ['tr', 'br'],
    },
    bottomLeft: {
      points: ['tl', 'bl'],
    },
  },
  destroyPopupOnHide: false,
  events: ['click', 'hover'],
  mouseEnterDelay: 0,
  mouseLeaveDelay: 0.1,
  placement: 'left',
  popupComponent: <h5>I'm default popup element!</h5>,
  stretch: null,
  transitionName: null,
}

Positional.displayName = 'Positional'

/** @component */
export default Positional
