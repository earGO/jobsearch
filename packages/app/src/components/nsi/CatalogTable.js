import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Table, Flex, Box, Text, Card, Icon, Button } from '@ursip/design-system'

import SortableColumn from './SortableColumn'
import Loading from '../common/Loading'
import * as nsiService from '../../services/nsi'
import arrayToTree from '../../utils/arrayToTree'
import * as selectors from './module/selectors'
import * as actions from './module/actions'

const StyledTable = styled(Table)`
  .rs-table-header-row-wrapper {
    z-index: 0;
  }
  .rs-table-column-resize-spanner {
    background-color: ${props => props.theme.colors.border};
    width: 2px;
    &:hover {
      background-color: ${props => props.theme.colors.primary};
    }
  }
  .rs-table-body-row-wrapper .rs-table-row {
    cursor: pointer;
  }
  .rs-table-cell-expand-wrapper {
    outline: none;
    margin-right: 0;
  }
  .selected-row {
    background-color: ${props => props.theme.colors.lightGrey};
  }
  .selected-row .rs-table-cell {
    background-color: ${props => props.theme.colors.lightGrey};
  }
`

const StyledCard = styled(Card)`
  height: 100%;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-bottom: 0;
  overflow: hidden;
`

const StyledIcon = styled(Icon)`
  opacity: 0.5;
`

function CatalogTable() {
  const wrapperRef = React.useRef(null)
  const [selectedElement, setSelectedElement] = React.useState(null)

  const dispatch = useDispatch()
  const catalogName = useSelector(selectors.currentCatalogName)
  const catalog = useSelector(selectors.currentCatalog)
  const data = useSelector(selectors.filteredElements)
  const columns = useSelector(selectors.filteredAttributes)
  const loadingElements = useSelector(selectors.loadingElements)
  const columnsWidths = useSelector(selectors.getColumnWidths)
  const searchQuery = useSelector(selectors.elementsSearchQuery)

  const [expandedRowKeys, setExpandedRowKeys] = React.useState([])
  const [bounds, setBounds] = React.useState({})

  React.useEffect(() => {
    let resize
    setBounds(wrapperRef.current.getBoundingClientRect())

    function onResize() {
      clearTimeout(resize)
      resize = setTimeout(() => {
        setBounds(wrapperRef.current.getBoundingClientRect())
      }, 250)
    }

    window.addEventListener('resize', onResize)

    return () => window.removeEventListener('resize', onResize)
  }, [wrapperRef])

  const extractLinkValue = value => {
    if (value && value.dict && value.dict.elements) {
      const column = (value.dict.metaAttributes.sort((a, b) => a.orders - b.orders)[1] || {}).nick

      const values = value.dict.elements.reduce((acc, elem) => {
        const value = elem.values.find(e => e.nick === column) || {}
        return acc.concat(value.valueAttr)
      }, [])

      return <Text>{values.join(', ')}</Text>
    }

    return null
  }

  const renderValue = (value, type) => {
    switch (true) {
      case Array.isArray(value):
        const data = value.map(v => Object.values(v)).join(', ')

        return (
          <Text title={data} truncated>
            {data}
          </Text>
        )
      case type === 'boolean':
        return (
          <Text bold color={value ? 'success' : 'error'}>
            {value ? 'Да' : 'Нет'}
          </Text>
        )
      case typeof value === 'object':
        return <Text truncated>{extractLinkValue(value)}</Text>

      case !value:
        return <Text color="grey">&mdash;</Text>

      default:
        return <Text truncated>{value}</Text>
    }
  }

  const handleEdit = row => {
    setSelectedElement(row.elementId)
    dispatch(actions.showElementsForm(row))
  }

  const handleDelete = row => e => {
    e.stopPropagation()
    const { _parent, children, ...rest } = row
    if (global.confirm(`Удалить строку?`)) {
      dispatch(
        nsiService.actions.saveDictRow(
          {
            ...rest,
            deleted: true,
          },
          catalogName,
        ),
      )
    }
  }

  const handleAddChild = row => e => {
    e.stopPropagation()

    dispatch(actions.showElementsForm({ parentId: row.elementId }))
  }

  const storeSize = (columnWidth, dataKey) => {
    dispatch(
      actions.setUserSettings({
        catalogName,
        attributeName: dataKey,
        width: columnWidth,
      }),
    )

    dispatch(actions.presistUserSettings())
  }

  const renderLoading = () => (
    <Loading overlay>
      Загрузка справочника <span>&laquo;{catalogName}&raquo;</span>
    </Loading>
  )

  const renderColumns = ({ name, nick, type, array }) => {
    return (
      <Table.Column key={nick} resizable width={columnsWidths[nick] || 200} onResize={storeSize}>
        <Table.HeaderCell>
          <Flex width="100%" alignItems="center" justifyContent="space-between" ml={2}>
            <Text truncated title={name}>
              {name}
            </Text>
            {!['link', 'array'].includes(type) && !array && (
              <Box mx={2}>
                <SortableColumn catalog={catalog} nick={nick} />
              </Box>
            )}
          </Flex>
        </Table.HeaderCell>
        <Table.Cell dataKey={nick}>
          {row => {
            const { value } = row.values[nick] || {}
            return (
              <Box mx={2} style={{ overflow: 'hidden' }}>
                {renderValue(value, type)}
              </Box>
            )
          }}
        </Table.Cell>
      </Table.Column>
    )
  }

  const handleExpand = row => e => {
    e.stopPropagation()

    if (expandedRowKeys.includes(row.elementId)) {
      setExpandedRowKeys(expandedRowKeys.filter(key => key !== row.elementId))
    } else {
      setExpandedRowKeys(expandedRowKeys.concat(row.elementId))
    }
  }

  const handleRowClassName = row => {
    if (row && row.elementId === selectedElement) {
      return 'selected-row'
    }
  }
  const tree = arrayToTree(data, { id: 'elementId', parentId: 'parentId' })

  return (
    <StyledCard ref={wrapperRef}>
      <StyledTable
        data={Boolean(searchQuery) ? data : tree.rootItems}
        isTree={!Boolean(searchQuery)}
        rowKey="elementId"
        loading={loadingElements}
        renderLoading={renderLoading}
        height={bounds.height - 82}
        headerHeight={50}
        rowHeight={50}
        onRowClick={handleEdit}
        rowClassName={handleRowClassName}
        expandedRowKeys={expandedRowKeys}
        renderTreeToggle={(_, row) => {
          const iconName = expandedRowKeys.includes(row.elementId) ? 'chevron-up' : 'chevron-down'
          return <Icon name={iconName} onClick={handleExpand(row)} />
        }}
      >
        {columns.map(renderColumns)}
        <Table.Column key="fill-empty-table-space" flexGrow={1}>
          <Table.HeaderCell />
          <Table.Cell />
        </Table.Column>
        <Table.Column key="actions" fixed="right" width={catalog.hierarchy ? 115 : 70}>
          <Table.HeaderCell />
          <Table.Cell>
            {row => {
              return (
                <Flex width="100%">
                  <Button
                    disabled={row.children}
                    circle
                    type="dashed"
                    size="small"
                    title="Удалить элемент"
                    onClick={handleDelete(row)}
                  >
                    <StyledIcon name="trash-alt" top={1} />
                  </Button>
                  {catalog.hierarchy && (
                    <Button
                      circle
                      ml={2}
                      type="dashed"
                      size="small"
                      title="Добавить дочерний элемент"
                      onClick={handleAddChild(row)}
                    >
                      <StyledIcon name="plus" top={1} />
                    </Button>
                  )}
                </Flex>
              )
            }}
          </Table.Cell>
        </Table.Column>
      </StyledTable>
    </StyledCard>
  )
}

CatalogTable.defaultProps = {
  hierarchy: false,
}

export default CatalogTable
