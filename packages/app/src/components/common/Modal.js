import React from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'

const customModalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: 9999999999,
  },
  content: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    border: 'none',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: 'transparent',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '0px',
    outline: 'none',
    padding: '0px',
  },
}

function Modal({ visible, ...props }) {
  React.useEffect(() => {
    ReactModal.setAppElement(document.getElementById('root'))
  }, [])

  return <ReactModal style={customModalStyles} isOpen={visible} {...props} />
}

Modal.propTypes = {
  visible: PropTypes.bool,
}

Modal.defaultProps = {
  visible: false,
}

export default Modal
