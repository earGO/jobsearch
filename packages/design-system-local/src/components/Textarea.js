import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import propTypes from 'prop-types'
import Relative from './Relative'
import Absolute from './Absolute'
import { space, width, themeGet, fontSize } from 'styled-system'
import omit from 'lodash/omit'

const disabled = props =>
  props.disabled &&
  css`
    background: ${themeGet('colors.input.disabled', '#b5b5b5')};
    cursor: not-allowed;
  `

const HTMLTextarea = styled.textarea`
  font-family: ${themeGet('font.main', "'PT Sans'")};
  font-size:  ${props => props.theme.fontSizes[1]};
  border-width: 1px;
  border-style: solid;
  border-color: transparent;
  border-radius: ${props => props.theme.radii[1] + 'px'};
  transition: all ${props => props.theme.duration.fast};
  :hover {
    border-color: ${themeGet('colors.black', '#3a3a3a')}
  } 
  :focus {
    outline: none;
    background: ${themeGet('colors.white', '#ffffff')};
    border-color: ${themeGet('colors.lightBlue', '#0091ea')};
  }
  background: ${props => props.theme.colors.lightGrey};

  ${fontSize}
  ${width}
  ${space}
  ${disabled}
`

export const InputWrapper = styled(Relative)({
  display: 'flex',
  flexGrow: 1,
  alignItems: 'center',
})

/** Получение данных от пользователя.*/
class Textarea extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: typeof props.value !== 'undefined' ? props.defaultValue : props.value,
    }
  }

  static getDerivedStateFromProps(nextProps) {
    if ('value' in nextProps) {
      return {
        value: nextProps.value,
      }
    }
    return null
  }

  handleChange = event => {
    const newValue = event.target.value
    this.setState({
      value: newValue,
    })
    this.props.onChange && this.props.onChange(newValue, event)
  }

  saveInput = node => {
    this.input = node
  }

  focus = () => {
    this.input.focus()
  }

  blur = () => {
    this.input.blur()
  }

  render() {
    const { width, wrapperStyle, children, ...props } = this.props
    return (
      <InputWrapper width={width} style={wrapperStyle}>
        <HTMLTextarea
          width="100%"
          ref={this.saveRef}
          value={this.state.value}
          onChange={this.handleChange}
          {...props}
        />
      </InputWrapper>
    )
  }
}

Textarea.propTypes = {
  /** Ширина враппера для инпута.*/
  width: propTypes.oneOfType([propTypes.number, propTypes.string, propTypes.array]),
  /** Стили враппера */
  wrapperStyle: propTypes.object,
}

Textarea.defaultProps = {
  py: 2,
  px: 3,
  fontSize: 1,
}

Textarea.displayName = 'Textarea'

/** @component */
export default Textarea
