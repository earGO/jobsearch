import {Table} from '@ursip/design-system'
import styled from 'styled-components'

const TableWithoutOutline = styled(Table)`
	cursor: pointer;
	.rs-table-cell-expand-wrapper {
		outline-style: none;
	}

	&:hover {
		.rs-table-scrollbar {
			display: block;
		}
	}

	.rs-table-scrollbar {
		display: none;
	}

	/* .rs-table-cell {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .rs-table-cell-content {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    } */

	/* .rs-table-cell-group-right-shadow {
    box-shadow: none;
  } */
	.activeClass {
		.rs-table-cell-content {
			background-color: #b1b1b1;
			color: white;
		}
	}
`
export default TableWithoutOutline
