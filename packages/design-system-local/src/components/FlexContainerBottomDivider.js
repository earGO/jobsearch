import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Flex from './Flex'

/** Стандартный Flex, дополненный нижним разделителем для более точной верстки
 * Используется в модулях навигации и просто между крупными блоками*/

const FlexContainer = styled(Flex)`
  margin: 0;
  align-self: center;
  width: 100%;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-color: ${props => props.theme.colors[props.dividercolor]};
`

function FlexContainerBottomDivider({children, dividercolor, ...props}) {
  return <FlexContainer dividercolor={dividercolor}>{children}</FlexContainer>
}

FlexContainerBottomDivider.propTypes = {
  dividercolor: PropTypes.string
}

FlexContainerBottomDivider.defaultProps = {
  dividercolor: 'border'
}

export default FlexContainerBottomDivider
