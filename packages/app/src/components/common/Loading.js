import React from 'react'
import PropTypes from 'prop-types'
import { Icon, Overlay, Flex, Text } from '@ursip/design-system'

function Spinner(props) {
  return <Icon spin fontSize={4} color="primary" name="spinner" {...props} />
}

function Loading({ overlay, children }) {
  if (overlay) {
    return (
      <Overlay bg="white" style={{ zIndex: 2 }}>
        <Flex>
          <Spinner />
          {children && (
            <Text color="primary" bold ml={2} fomtSize={0}>
              {children}
            </Text>
          )}
        </Flex>
      </Overlay>
    )
  }

  return <Spinner />
}

Loading.propTypes = {
  overlay: PropTypes.bool,
  icon: PropTypes.any,
}

Loading.defaultProps = {
  overlay: false,
}

export default Loading
