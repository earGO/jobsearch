import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Text } from '@ursip/design-system'
import CollapseItem from './CollapseItem'

import { baseRoute } from './module'

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  :visited {
    color: inherit;
  }
`

function CatalogListItem({ nick, name }) {
  return (
    <StyledLink key={nick} title={nick} to={`${baseRoute}/${nick}`}>
      <CollapseItem nick={nick}>
        <Text truncated pl={24}>
          {name}
        </Text>
      </CollapseItem>
    </StyledLink>
  )
}

export default CatalogListItem
