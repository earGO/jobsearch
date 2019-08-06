import React from 'react'
import ReactTinyPopover, {ArrowContainer} from 'react-tiny-popover'

/*
 * Всплывающий блок с контентом возле элемента.
 * Используется для всплывающих подсказок, выпадающих меню и т.д.
 */
function Popover(props) {
  return <ReactTinyPopover {...props} />
}

Popover.propTypes = {}

Popover.defaultProps = {
  disableReposition: true
}

Popover.displayName = 'Popover'

Popover.ArrowContainer = ArrowContainer

/** @component */
export default Popover
