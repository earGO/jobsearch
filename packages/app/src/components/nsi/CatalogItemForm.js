import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import Scrollbars from 'react-custom-scrollbars'
import { Card, Flex, Form, Input, Button, Heading, Box, Toggle, Select } from '@ursip/design-system'
import * as nsiService from '../../services/nsi'
import FormItem from '../common/FormItem'
import LinkField from './LinkField'

import * as selectors from './module/selectors'
import * as actions from './module/actions'

function CatalogItemForm({ form, width, elements, attributes, catalog, contentHeight }) {
  const dispatch = useDispatch()
  const row = useSelector(selectors.currentElement)

  const closeModal = () => dispatch(actions.hideElementsForm())
  const saveDictRow = (data, nick) => dispatch(nsiService.actions.saveDictRow(data, nick))

  const selectElements = Object.values(elements || {}).reduce((acc, { elementId, values }) => {
    const val = values[Object.keys(attributes)[0]]

    acc[elementId] = {
      label: val && val.value,
      value: elementId,
    }
    return acc
  }, {})

  function prepare({ parentId, ...values }) {
    const removeEmptyData = array => {
      return array.reduce((acc, current) => {
        if (current) {
          return acc.concat(current)
        } else {
          return acc
        }
      }, [])
    }

    return {
      elementId: (row && row.elementId) || null,
      elementParent: (parentId && parentId.value && { parentId: parentId.value }) || null,
      deleted: false,
      values: Object.keys(values)
        .filter(nick => nick[0] !== '_')
        .map(nick => {
          const attr = attributes[nick]
          const { value, ...rest } = (row && row.values && row.values[nick]) || {}
          const output = {
            ...rest,
            nick,
            deleted: false,
          }

          if (attr.link && attr.type === 'link') {
            output.linkValue = Array.isArray(values[nick]) ? removeEmptyData(values[nick]) : values[nick]
          } else {
            output.value = Array.isArray(values[nick]) ? removeEmptyData(values[nick]) : values[nick]
          }
          return output
        }),
    }
  }

  const handleSave = () =>
    form.validateFieldsAndScroll((errors, values) => {
      if (!errors) {
        saveDictRow(prepare(values), catalog.nick).finally(closeModal)
      }
    })

  return (
    <Card id="catalogItemForm" bg="white" p={2} width={width}>
      <Heading>&laquo;{catalog.name}&raquo;</Heading>
      <Scrollbars style={{ height: contentHeight }}>
        <Box py={2} px={3}>
          {catalog.hierarchy && (
            <FormItem key="parentId" mb={2} name="parentId" label="Родительский элемент" form={form}>
              <Select isClearable options={Object.values(selectElements)} />
            </FormItem>
          )}
          {Object.values(attributes)
            .sort((a, b) => a.orders - b.orders)
            .map(attr => {
              switch (true) {
                case attr.type === 'boolean':
                  return (
                    <FormItem
                      required={attr.required}
                      initialValue={0}
                      key={attr.nick}
                      mb={2}
                      name={attr.nick}
                      label={attr.name}
                      form={form}
                    >
                      <Toggle />
                    </FormItem>
                  )

                case attr.type === 'integer':
                  return (
                    <FormItem
                      required={attr.required}
                      multiple={attr.array}
                      initialValue={0}
                      key={attr.nick}
                      mb={2}
                      name={attr.nick}
                      label={attr.name}
                      form={form}
                    >
                      <Input type="number" />
                    </FormItem>
                  )

                case attr.type === 'link':
                  return (
                    <FormItem key={attr.nick} mb={2} name={attr.nick} label={attr.name} form={form}>
                      <LinkField multiple={attr.array} nick={attr.link} />
                    </FormItem>
                  )

                default:
                  return (
                    <FormItem
                      mb={2}
                      required={attr.required}
                      key={attr.nick}
                      multiple={attr.array}
                      name={attr.nick}
                      label={attr.name}
                      form={form}
                    >
                      <Input placeholder={attr.name} />
                    </FormItem>
                  )
              }
            })}
        </Box>
      </Scrollbars>
      <Flex justifyContent="space-between" alignItems="center" mt={2}>
        <Box ml="auto">
          <Button style={{ width: 100 }} size="small" onClick={handleSave}>
            {row ? 'Сохранить' : 'Создать'}
          </Button>
          <Button style={{ width: 100 }} size="small" ml={2} type="bordered" onClick={closeModal}>
            Отмена
          </Button>
        </Box>
      </Flex>
    </Card>
  )
}

CatalogItemForm.defaultProps = {
  closeModal: () => false,
  dict: {},
  width: '40vw',
  contentHeight: '50vh',
}

const withForm = Form.create({
  mapPropsToFields({ row, elements, attributes }) {
    const fields = Object.values(attributes || {})

    const selectElements = Object.values(elements || {}).reduce((acc, { elementId, values }) => {
      const val = values[Object.keys(attributes)[0]]

      acc[elementId] = {
        label: val && val.value,
        value: elementId,
      }
      return acc
    }, {})

    let out = {}
    if (row) {
      out = fields.reduce((acc, field) => {
        const value = ((row.values && row.values[field.nick]) || {}).value
        if (field.array && field.type !== 'link') {
          const values = value || []
          const data = Array.isArray(values) ? values : [values]

          acc['_initial_' + field.nick] = Form.createFormField({ value: Number(data.length) })
          data.forEach((val, i) => {
            acc[field.nick + '[' + i + '].' + field.nick] = Form.createFormField({ value: val[field.nick] })
          })
        } else if (field.type === 'link') {
          const elements = (value && value.dict && value.dict.elements) || []

          if (field.array) {
            acc[field.nick] = Form.createFormField({ value: elements.map(element => element.id) })
          } else {
            acc[field.nick] = Form.createFormField({ value: (elements[0] && elements[0].id) || null })
          }
        } else {
          acc[field.nick] = Form.createFormField({ value })
        }
        return acc
      }, {})
    }

    if (row && row.parentId) {
      out['parentId'] = Form.createFormField({ value: selectElements[row.parentId] })
    }

    return out
  },
})

export default compose(
  withRouter,
  withForm,
)(CatalogItemForm)
