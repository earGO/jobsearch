import React from 'react'
import styled from 'styled-components'
// import PropTypes from 'prop-types'
import { Resizable } from 're-resizable'

const StyledResizable = styled(Resizable)`
  position: relative;

  & > span > div {
    &::before {
      content: '';
      position: absolute;
      width: 2px;
      top: 0;
      left: 50%;
      margin-left: -1px;
      bottom: 0;
      transition: background-color 0.3s;
      background-color: ${props => props.theme.colors.border};
    }
    &:active,
    &:hover {
      &::before {
        background-color: ${props => props.theme.colors.primary};
      }
    }
  }
`

function ResizableSide({ children, ...props }) {
  const enable = {
    top: false,
    right: true,
    bottom: false,
    left: false,
    topRight: false,
    bottomRight: false,
    bottomLeft: false,
    topLeft: false,
  }

  return (
    <StyledResizable {...props} enable={enable}>
      {children}
    </StyledResizable>
  )
}

ResizableSide.propTypes = {}

ResizableSide.defaultProps = {}

export default ResizableSide
