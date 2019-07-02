import React from 'react'
import { useSelector } from 'react-redux'
import { Select } from '@ursip/design-system'

import * as selectors from './module/selectors'

const getElementId = value => {
  if (!value) return null
  if (typeof value === 'string') {
    return value
  }

  return value.dict && value.dict.elements && value.dict.elements[0] && value.dict.elements[0].id
}

function LinkField({ nick, value, onChange }) {
  const data = useSelector(selectors.byNick(nick))

  const elements = (data && data.elements) || []
  const attributes = (data && data.attributes) || []

  const handleSelect = row => onChange(row.value)

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
      placeholder="Выберите элемент"
      value={options[getElementId(value)]}
      onChange={handleSelect}
      options={Object.values(options)}
    />
  )
}

LinkField.defaultProps = {
  data: {},
}

export default LinkField