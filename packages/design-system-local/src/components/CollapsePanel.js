import React from 'react'
import propTypes from 'prop-types'
import styled, { css } from 'styled-components'
import Box from './Box'
import Flex from './Flex'
import Icon from './Icon'
import { themeGet } from 'styled-system'

const noop = () => {}

const disabled = props => {
  return (
    props.disabled &&
    css`
      opacity: 0.4;
      cursor: not-allowed;
    `
  )
}

const PanelContent = styled(Box)`
  ${props => `transition: height ${props.theme.duration.normal};`}
  overflow: hidden;
`

// To fix warning because of passing isOpen prop to <svg />
const AnimatedScaledIcon = styled(({ isOpen, ...rest }) => <Icon {...rest} />)`
  font-size: 10px;
  color: ${themeGet('color.black', '#080808')};
  transition: transform ${themeGet('duration.normal', '300ms')};
  ${props => props.isOpen && `transform: rotate(180deg);`}
`

const PanelHeaderWrapper = styled(Flex)`
  height: 32px;
  align-items: center;
  border-bottom: 1px solid ${themeGet('colors.border', '#ecebeb')};
  ${props => (props.disabled ? 'cursor: not-allowed;' : 'cursor: pointer;')}
`

const PanelWrapper = styled(Flex)`
  overflow: hidden;
  font-size: ${props => props.theme.fontSizes[1] + 'px'};
  color: ${props => props.theme.colors.black};
  ${disabled}
`

const PanelHeader = ({ title, togglePanel, isOpen, panelKey, disabled }) => (
  <PanelHeaderWrapper disabled={disabled} onClick={disabled ? noop : () => togglePanel(panelKey)}>
    <Flex justifyContent="center" alignItems="center" width={16} height={16}>
      {isOpen ? (
        <AnimatedScaledIcon isOpen={isOpen} name="keyboard_arrow_up" size={1} />
      ) : (
        <AnimatedScaledIcon isOpen={isOpen} name="keyboard_arrow_down" size={1} />
      )}
    </Flex>
    <Box ml={2}>{title}</Box>
  </PanelHeaderWrapper>
)

/** Отвечает за вывод содержимого */
class CollapsePanel extends React.Component {
  state = {
    contentHeight: 0,
  }

  componentDidMount() {
    this.setState({
      contentHeight: this.measure && this.measure.clientHeight,
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.measure) {
      if (prevState.contentHeight !== this.measure.clientHeight)
        this.setState({
          contentHeight: this.measure.clientHeight,
        })
    }
  }

  render() {
    const mergedStyle = { ...this.props.style, height: this.props.isOpen ? this.state.contentHeight : 0 }
    return (
      <PanelWrapper flexDirection="column" disabled={this.props.disabled}>
        <PanelHeader {...this.props} />
        <PanelContent {...this.props} style={mergedStyle}>
          <Box ref={measure => (this.measure = measure)}>{this.props.children}</Box>
        </PanelContent>
      </PanelWrapper>
    )
  }
}

CollapsePanel.propTypes = {
  /** Возможность скрыть-раскрыть панель */
  disabled: propTypes.bool,
  /** Заголовок панели. */
  title: propTypes.oneOfType([propTypes.string, propTypes.element]),
}

CollapsePanel.defaultProps = {
  disabled: false,
  title: '',
}

CollapsePanel.displayName = 'Collapse.Panel'

/** @component */
export default CollapsePanel
