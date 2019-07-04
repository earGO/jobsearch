import React from 'react'
import { useSelector } from 'react-redux'
import { Select } from '@ursip/design-system'

import * as selectors from './module/selectors'

function LinkField({ nick, value, onChange, multiple }) {
  const data = useSelector(selectors.byNick(nick))

  const elements = (data && data.elements) || []
  const attributes = (data && data.attributes) || []

  const handleSelect = row => {
    if (multiple) {
      onChange(row && row.map(item => item.value))
    } else {
      onChange(row && row.value)
    }
  }

  const first = attributes[0] || {}
  const second = attributes[1] || {}

  const options = elements.reduce((acc, { elementId, values }) => {
    const firstValue = values[first.nick] || {}
    const secondValue = values[second.nick] || {}

    acc[elementId] = {
      label: `${firstValue.value} ${secondValue.value || ''}`,
      value: elementId,
    }

    return acc
  }, {})

  return (
    <Select
      isClearable
      isMulti={multiple}
      placeholder="Выберите элемент"
      value={multiple ? (value || []).map(id => options[id]) : options[value]}
      onChange={handleSelect}
      options={Object.values(options)}
    />
  )
}

LinkField.defaultProps = {
  data: {},
  multiple: false,
}

export default LinkField
