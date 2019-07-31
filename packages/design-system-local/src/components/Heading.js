import React from 'react'
import PropTypes from 'prop-types'
import Text from './Text'

function Heading({ tag, ...props }) {
  const headings = {
    h1: {
      fontSize: 6,
      caps: false,
      bold: true,
    },
    h2: {
      fontSize: 5,
      caps: false,
      bold: true,
    },
    h3: {
      fontSize: 4,
      caps: false,
      bold: false,
    },
    h4: {
      fontSize: 3,
      caps: false,
      bold: false,
    },
    h5: {
      fontSize: 2,
      caps: false,
      bold: true,
    },
    h6: {
      fontSize: 1,
      caps: true,
      bold: false,
    },
  }

  return <Text {...props} {...headings[tag]} />
}

Heading.propTypes = {
  tag: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
}

Heading.defaultProps = {
  tag: 'h3',
  m: 0,
}

Heading.displayName = 'Heading'

/** @component */
export default Heading
