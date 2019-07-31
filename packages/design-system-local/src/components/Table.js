import React from 'react'
import styled from 'styled-components'
import propTypes from 'prop-types'
import { Table as RSTable, Column, HeaderCell, Cell } from 'rsuite-table'
import 'rsuite-table/lib/less/index.less'
import { themeGet } from 'styled-system'

const StyledTable = styled(RSTable)`
  & .rs-table-cell-content {
    display: flex;
    align-items: center;
    font-size: ${props => props.theme.fontSizes[1] + 'px'};
    padding-left: ${props => props.theme.space[3] + 'px'};
    /* Expand-collapse icon */
    & > span {
      padding: 0 4px;
    }
  }
  &.rs-table {
    border: none;
  }
  & .rs-table-cell-wrap {
    flex: 1;
  }
  &.rs-table-hover .rs-table-body-row-wrapper {
    .rs-table-row:hover {
      background: ${themeGet('colors.highlightss', '#fbfbfb')};
    }

    .rs-table-row:hover .rs-table-cell-group {
      background: ${themeGet('colors.highlightss', '#fbfbfb')};
    }

    .rs-table-row:hover .rs-table-cell {
      background: ${themeGet('colors.highlightss', '#fbfbfb')};
    }
  }
`

const StyledHeader = styled(HeaderCell)`
  background: ${themeGet('colors.lightGrey', '#f5f5f5')};
  /* font-size: ${props => props.theme.fontSizes[1]}; */
`

const CustomHeaderCell = props => <StyledHeader {...props} />

/** Используется для отображения структурированной информации. */
const Table = props => <StyledTable {...props} />

Table.Column = Column
Table.HeaderCell = CustomHeaderCell
Table.Cell = Cell

Table.propTypes = {
  /** Данные для отображения в таблице. */
  data: propTypes.array.isRequired,
  /** Высота хедера таблицы */
  headerHeight: propTypes.number,
  /** Высота ряда */
  rowHeight: propTypes.number,
  /** Режим "дерева" - таблица с вложенными данными */
  isTree: propTypes.bool,
  /** В режиме дерева, функция-рендерер иконки "раскрыть-закрыть" ряд. Сигнатура: (icon: node, rowData: Object) => React.node */
  renderTreeToggle: propTypes.func,
  /** Указатель на поле ключ. Должно быть уникальным. */
  rowKey: propTypes.string,
  /** Виртуализация */
  virtualized: propTypes.bool,
  /** Ширина таблицы */
  width: propTypes.number,
  /** Высота таблицы */
  height: propTypes.number,
  /** Минимальная высота таблицы */
  minHeight: propTypes.number,
}

Table.defaultProps = {
  headerHeight: 48,
  rowHeight: 48,
  rowKey: 'key',
  locale: {
    emptyMessage: 'Нет данных',
    loading: 'Загрузка...',
  },
}

export default Table
