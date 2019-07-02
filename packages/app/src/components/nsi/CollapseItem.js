import styled, { css } from 'styled-components'
import { withRouter } from 'react-router-dom'
import { Flex } from '@ursip/design-system'

const isActive = ({ nick, match, theme }) =>
  nick &&
  match.params.nick &&
  nick === match.params.nick &&
  css`
    background: ${theme.colors.lightGrey};
  `

const CollapseItem = styled(Flex)`
  min-height: 32px;
  align-items: center;
  ${isActive};

  &:hover {
    opacity: 0.7;
  }
`

export default withRouter(CollapseItem)
