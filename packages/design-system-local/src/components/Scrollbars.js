import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import ReactCustomScrollbars from 'react-custom-scrollbars'
import { flex, order, alignSelf } from 'styled-system'

const EnhancedScrollbars = styled(ReactCustomScrollbars)`
 ${flex}
 ${order}
 ${alignSelf};
`

/**
 * Добавляет вертикальный и горизинтальный скроллбар для блока.
 * Обеспечивает единое отоборажение скорллбара во всех баузерах и операционных системах.
 */
function Scrollbars(props) {
  return <EnhancedScrollbars {...props} />
}

Scrollbars.propTypes = {
  onScroll: PropTypes.func,
  onScrollFrame: PropTypes.func,
  onScrollStart: PropTypes.func,
  onScrollStop: PropTypes.func,
  onUpdate: PropTypes.func,
  renderView: PropTypes.func,
  renderTrackHorizontal: PropTypes.func,
  renderTrackVertical: PropTypes.func,
  renderThumbHorizontal: PropTypes.func,
  renderThumbVertical: PropTypes.func,
  tagName: PropTypes.string,
  thumbSize: PropTypes.number,
  thumbMinSize: PropTypes.number,
  hideTracksWhenNotNeeded: PropTypes.bool,
  autoHide: PropTypes.bool,
  autoHideTimeout: PropTypes.number,
  autoHideDuration: PropTypes.number,
  autoHeight: PropTypes.bool,
  autoHeightMin: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  autoHeightMax: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  universal: PropTypes.bool,
  style: PropTypes.object,
  children: PropTypes.node,
}

Scrollbars.defaultProps = {
  tagName: 'div',
  thumbMinSize: 30,
  hideTracksWhenNotNeeded: false,
  autoHide: false,
  autoHideTimeout: 1000,
  autoHideDuration: 200,
  autoHeight: false,
  autoHeightMin: 0,
  autoHeightMax: 200,
  universal: false,
}

Scrollbars.displayName = 'Scrollbars'

/** @component */
export default Scrollbars
