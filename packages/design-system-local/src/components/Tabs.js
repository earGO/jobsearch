import React from 'react'
import styled, { css } from 'styled-components'
import propTypes from 'prop-types'
import Flex from './Flex'
import Box from './Box'
import TabPane from './TabPane'
import { themeGet } from 'styled-system'

const noop = () => {}

const borderBottom = props => css`
  ${props.isActive && `border-bottom: 1px solid ${props.theme.colors.tabs.active}`}
  :hover {
    ${!props.disabled && !props.isActive && `border-bottom: 1px solid ${props.theme.colors.tabs.hover}`}
  }
`

const isDisabled = props =>
  props.disabled &&
  css`
    cursor: not-allowed;
    opacity: 0.4;
  `

const TabsList = styled(Flex)`
  justify-content: flex-start;
  flex-direction: row;
  font-size: ${props => props.theme.fontSizes[1] + 'px'};
`

const Tab = styled(Flex)`
  display: inline-flex;
  align-items: center;
  font-size: ${props => props.theme.fontSizes[1] + 'px'};
  padding-right: ${themeGet('space[3]', '16px')};
  padding-left: ${themeGet('space[3]', '16px')};
  height: ${themeGet('heights.medium', '48px')};
  cursor: pointer;
  /* Чтобы не "прыгали" при hover/active */
  border-bottom: 1px solid ${props => props.theme.colors.semiLightGrey};
  ${borderBottom}
  ${isDisabled}
`

/** Используется, если необходимо сгруппировать или разграничить содержимое страницы. */
class Tabs extends React.Component {
  constructor(props) {
    super(props)
    props.children.forEach(child => {
      if (typeof child.props.tabKey === 'undefined') {
        console.error('<TabPane /> components must have an unique "tabKey" prop. Check <Tabs/> component children.')
      }
    })
    const { children = [] } = props
    const firstChildKey = children[0].props && children[0].props.tabKey
    this.state = {
      activeKey: this.props.activeKey || this.props.defaultActiveKey || firstChildKey,
    }
  }

  static getDerivedStateFromProps(nextProps) {
    if ('activeKey' in nextProps) {
      return {
        activeKey: nextProps.activeKey,
      }
    }
    return null
  }

  handleChange = newActiveKey => {
    this.setState({
      activeKey: newActiveKey,
    })
    this.props.onChange && this.props.onChange(newActiveKey)
  }

  onTabClick = tabKey => {
    const { activeKey } = this.state
    if (tabKey !== activeKey) {
      this.handleChange(tabKey)
    }
  }

  getTabsItems = () => {
    const { children } = this.props
    const { activeKey } = this.state
    return children.map(child => {
      const { tabKey, tab, disabled } = child.props
      return (
        <Tab
          isActive={activeKey === tabKey}
          onClick={disabled ? noop : () => this.onTabClick(tabKey)}
          disabled={disabled}
        >
          {tab}
        </Tab>
      )
    })
  }

  getChildren = () => {
    const { children } = this.props
    const { activeKey } = this.state
    return children.map(child => {
      const tabKey = child.props.tabKey
      const props = {
        isActive: activeKey === tabKey,
      }
      return React.cloneElement(child, props)
    })
  }

  render() {
    return (
      <Box>
        <TabsList>{this.getTabsItems()}</TabsList>
        {this.getChildren()}
      </Box>
    )
  }
}

Tabs.TabPane = TabPane
Tabs.propTypes = {
  /** Активная вкладка */
  activeKey: propTypes.string,
  /** Активная вкладка по умолчанию */
  defaultActiveKey: propTypes.string,
  /** Функция-хендлер */
  onChange: propTypes.func,
}
/** @component */
export default Tabs
