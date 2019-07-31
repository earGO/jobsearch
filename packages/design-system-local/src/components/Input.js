import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import propTypes from 'prop-types'
import Relative from './Relative'
import Absolute from './Absolute'
import { space, width } from 'styled-system'
import themeGet from '@styled-system/theme-get'
import omit from 'lodash/omit'

// #TBD: Input.TextArea + allowClear prop. Как будет работать c suffix?

const propsToOmit = ['suffix', 'prefix', 'width', 'value', 'wrapperStyle', 'onChange']

const disabled = props =>
  props.disabled &&
  css`
    background: ${themeGet('colors.input.disabled', '#b5b5b5')};
    cursor: not-allowed;
  `

const size = ({ size = 'medium', theme }) => {
  const sizes = {
    // Same as button heights, but with height, instead of paddings.
    small: {
      fontSize: theme.fontSizes[0],
      height: 32,
    },
    medium: {
      fontSize: theme.fontSizes[1],
      height: 40,
    },
    large: {
      fontSize: theme.fontSizes[2],
      height: 48,
    },
  }
  return sizes[size]
}

const inline = ({ inline }) => Boolean(inline) && { display: 'inline-block' }

const HTMLInput = styled.input`
  font-family: ${themeGet('font.main', "'PT Sans'")};
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

  ${width}
  ${space}
  ${size}
  ${disabled}
  ${inline};
`

export const InputWrapper = styled(Relative)({
  display: 'flex',
  flexGrow: 1,
  alignItems: 'center',
})

const Adornment = styled(Absolute)({
  display: 'flex',
})

/** Получение данных от пользователя.*/
class Input extends Component {
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
    const { prefix, suffix, width, wrapperStyle } = this.props
    return (
      <InputWrapper width={width} style={wrapperStyle}>
        {prefix && (
          <Adornment left={0} pl={2}>
            {prefix}
          </Adornment>
        )}
        <HTMLInput
          {...omit(this.props, propsToOmit)}
          pl={prefix ? 4 : 3}
          pr={suffix ? 4 : 2}
          width="100%"
          ref={this.saveRef}
          value={this.state.value}
          onChange={this.handleChange}
        />
        {suffix && (
          <Adornment right={0} pr={2}>
            {suffix}
          </Adornment>
        )}
      </InputWrapper>
    )
  }
}

Input.propTypes = {
  /** Ширина враппера для инпута.*/
  width: propTypes.oneOfType([propTypes.number, propTypes.string, propTypes.array]),
  /** Иконка в начале инпута. */
  prefix: propTypes.element,
  /** Иконка в конце инпута. */
  suffix: propTypes.element,
  /** Размер инпута: */
  size: propTypes.oneOf(['small', 'medium', 'large']),
  /** Стили враппера */
  wrapperStyle: propTypes.object,
}

Input.defaultProps = {
  size: 'medium',
}

Input.displayName = 'Input'

/** @component */
export default Input
