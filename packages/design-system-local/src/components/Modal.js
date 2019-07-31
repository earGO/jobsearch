import React from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'

/**
 * Модальное окно
 */
function Modal({visible, nodeId, ...props}) {
	const customModalStyles = {
		overlay: {
			position: 'fixed',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			backgroundColor: 'rgba(0, 0, 0, 0.75)',
			zIndex: 5
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
			overflow: 'clip ',
			WebkitOverflowScrolling: 'touch',
			borderRadius: '0px',
			outline: 'none',
			padding: '0px'
		}
	}

	React.useEffect(() => {
		ReactModal.setAppElement(document.getElementById(nodeId))
	}, [])

	return <ReactModal style={customModalStyles} {...props} />
}

Modal.propTypes = {
	isOpen: PropTypes.bool,
	nodeId: PropTypes.string
}

Modal.defaultProps = {
	isOpen: false,
	nodeId: 'root'
}

Modal.displayName = 'Modal'

/** @component */
export default Modal
