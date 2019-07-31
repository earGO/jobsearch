import React from 'react'
// import PropTypes from 'prop-types'
import ReactTinyPopover from 'react-tiny-popover'

/**
 * Всплывающий блок с контентом возле элемента.
 * Используется для всплывающих подсказок, выпадающих меню и т.д.
 */
function Popover(props) {
  return <ReactTinyPopover {...props} />
}

Popover.propTypes = {}

Popover.defaultProps = {
  disableReposition: true,
}

Popover.displayName = 'Popover'

Popover.ArrowContainer = ReactTinyPopover.ArrowContainer

/** @component */
export default Popover
