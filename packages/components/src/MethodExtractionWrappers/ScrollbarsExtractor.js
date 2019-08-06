import React from 'react'
import Scrollbars from 'react-custom-scrollbars'

class ScrollbarsExtractor extends React.Component {
	constructor(props) {
		super(props)
		this.getScrollTop = this.getScrollTop.bind(this)
	}

	getScrollTop() {
		if (!this.view) return 0
		this.props.valueExtraction(this.view.scrollTop)
		return this.view.scrollTop
	}

	render() {
		return <Scrollbars getScrollTop={this.getScrollTop} />
	}
}

export default ScrollbarsExtractor
