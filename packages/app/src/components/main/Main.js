import React from 'react'
import Link from '../common/Link'
import { Box, Heading } from '@ursip/design-system'

function Main() {
  return (
    <Box m={3}>
      <Heading mb={2}>ursip frontend modules</Heading>
      <Link bordered to="/nsi">
        nsi
      </Link>
    </Box>
  )
}

export default Main
