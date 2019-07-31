import React from 'react'
import propTypes from 'prop-types'
import Box from './Box'
import CollapsePanel from './CollapsePanel'

/** Используется, если необходимо сгруппировать или скрыть большое количество содержимого. */
class Collapse extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeKeys: this.props.activeKeys || this.props.defaultActiveKeys || [],
    }
  }

  handleChange = newActiveKeys => {
    this.setState({
      activeKeys: newActiveKeys,
    })
    this.props.onChange && this.props.onChange(newActiveKeys)
  }

  onPanelClick = panelKey => {
    const { activeKeys } = this.state
    let newActiveKeys = [...activeKeys]
    if (activeKeys.includes(panelKey)) {
      // Closed the panel
      newActiveKeys = activeKeys.filter(key => key !== panelKey)
    } else {
      // Opened the panel
      newActiveKeys = [...activeKeys, panelKey]
    }
    this.handleChange(newActiveKeys)
  }

  getChildren = () => {
    const { children } = this.props
    return children.map((child, i) => {
      let key = child.key || String(i)
      let props = {
        key: child.key || String(i),
        panelKey: key,
        togglePanel: this.onPanelClick,
        // If controlled, props should be the source of truth.
        isOpen: this.props.activeKeys ? this.props.activeKeys.includes(key) : this.state.activeKeys.includes(key),
      }
      return React.cloneElement(child, props)
    })
  }

  render() {
    return <Box>{this.getChildren()}</Box>
  }
}

Collapse.propTypes = {
  /** Список открытых панелей. */
  activeKeys: propTypes.arrayOf(propTypes.string),
  /** Список открытых панелей по умолчанию */
  defaultActiveKeys: propTypes.arrayOf(propTypes.string),
  /** Функция-хендлер */
  onChange: propTypes.func,
}

Collapse.Panel = CollapsePanel

/** @component */
export default Collapse
