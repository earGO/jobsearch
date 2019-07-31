import React from 'react'
import {Box} from '@ursip/design-system'
import {ResizableWrapper} from './styles'
// import { useSelector, useDispatch } from 'react-redux'
import {withTheme} from 'styled-components'
import {Responsive, WidthProvider} from 'react-grid-layout'
import PropTypes from 'prop-types'

const ResponsiveGridLayout = WidthProvider(Responsive)

function DynamicLayout({theme, widgetsList, layout, onLayoutChange}) {
	const margin = 16

	const defaultHeight = Math.max(
		(window.innerHeight - margin * 3 - 56) / 2,
		300
	)

	return (
		<ResizableWrapper>
			<ResponsiveGridLayout
				margin={[margin, margin]}
				measureBeforeMount={true}
				// onLayoutChange={onLayoutChange}
				breakpoints={{
					lg: theme.breakpoints[3],
					md: theme.breakpoints[2],
					sm: theme.breakpoints[1],
					xs: theme.breakpoints[0]
				}}
				cols={{lg: 3, md: 3, sm: 3, xs: 1}}
				rowHeight={defaultHeight}
				draggableHandle=".dragMe"
			>
				{widgetsList.map(e => (
					<Box key={e.id} data-grid={e.dataGrid}>
						{e.component()}
					</Box>
				))}
			</ResponsiveGridLayout>
		</ResizableWrapper>
	)
}

DynamicLayout.propTypes = {
	layout: PropTypes.array,
	onLayoutChange: PropTypes.func,
	theme: PropTypes.object,
	widgetsList: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string,
			component: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
			x: PropTypes.number,
			y: PropTypes.number
		})
	)
}
export default withTheme(DynamicLayout)
