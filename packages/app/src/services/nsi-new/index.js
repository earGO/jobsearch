import { success, error } from 'redux-saga-requests'
import capitlizeObjectKeys from '../../utils/capitlizeObjectKeys'
import dataToEntities from '../../utils/dataToEntinies'

import timetable from './timetable.json'
import dict from './dict.json'
import multi from './multi.json'
import unitMeasure from './unitMeasure.json'

const elementsMock = {
  MultipleDataTestCatalog: multi,
  Timetable: timetable,
  unitMeasure: unitMeasure,
}

export const name = 'ursip-nsi-service'
export const api =
  process.env.NODE_ENV === 'development' ? 'http://bim-dev.ursip.local/ws-nsi-new/api/v1' : '/ws-nsi-new/api/v1'

/* Types */
const LOAD_DICTS = `${name}/LOAD_DICTS`
const LOAD_DICT_ELEMENTS = `${name}/LOAD_DICT_ELEMENTS`
const SAVE_DICT = `${name}/SAVE_DICT`
const SAVE_DICT_ROW = `${name}/SAVE_DICT_ROW`
const MAKE_REPORT = `${name}/MAKE_REPORT`

export const types = {
  LOAD_DICTS,
  LOAD_DICT_ELEMENTS,
  SAVE_DICT_ROW,
  SAVE_DICT,
  MAKE_REPORT,
}

function shittylize(data) {
  const { attributes, hierarchy, deleted, transfer, ...rest } = data || {}

  return {
    ...rest,
    transfer: Number(transfer) || 0,
    context: rest.context === true || rest.context === 'SYSTEM' ? 'SYSTEM' : 'COMMON',
    deleted: Number(deleted) || 0,
    hierarchyDict: Number(hierarchy) || 0,
    metaAttrs: (attributes || []).map(({ link, array, deleted, required, unique, type, ...attr }) => ({
      ...attr,
      typeAttr: type,
      nickDictLink: link || null,
      arrayAttr: Number(array) || 0,
      deleted: Number(deleted) || 0,
      required: Number(required) || 0,
      unique: Number(unique) || 0,
    })),
  }
}

function shittylizeElement(data) {
  const { deleted, values, ...rest } = data || {}

  return {
    ...rest,
    deleted: Number(deleted),
    values: Object.values(values || {}).reduce((acc, { deleted, value, linkValue, nick, ...rest }) => {
      if (linkValue) {
        if (Array.isArray(linkValue)) {
          return acc.concat(
            linkValue.map((item, index) => {
              return {
                ...rest,
                deleted: Number(deleted),
                NickAttr: nick,
                linkValue: { id: item[nick] },
                orders: index,
              }
            }),
          )
        }

        return acc.concat({
          ...rest,
          deleted: Number(deleted),
          nickAttr: nick,
          linkValue,
        })
      }

      if (Array.isArray(value)) {
        return acc.concat(
          value.map((item, index) => {
            return {
              ...rest,
              deleted: Number(deleted),
              NickAttr: nick,
              value: item[nick],
              orders: index,
            }
          }),
        )
      }

      return acc.concat({
        ...rest,
        nickAttr: nick,
        deleted: Number(deleted),
        value: value || null,
      })
    }, []),
  }
}

/* Action creators */
export const actions = {
  loadAllCatalogs() {
    return {
      type: LOAD_DICTS,
      payload: {
        request: {
          url: `${api}/nsi/meta/dict`,
        },
      },
      meta: {
        mock: requestConfig => {
          return dict
        },
      },
    }
  },
  loadElements(nick) {
    const nicks = Array.isArray(nick) ? nick : [nick]

    return {
      type: LOAD_DICT_ELEMENTS,
      payload: {
        request: nicks.map(name => ({
          url: `${api}/nsi/dict/${name}`,
        })),
      },
      meta: {
        mock: requestConfig => {
          const arr = requestConfig.url.split('/')
          const name = arr[arr.length - 1]
          return elementsMock[name]
        },
      },
    }
  },
  metaDictSave(dict) {
    return {
      type: SAVE_DICT,
      payload: {
        request: {
          url: `${api}/nsi/meta/dict/save`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            capitlizeObjectKeys({
              metaDict: {
                transfer: 0,
                ...shittylize(dict),
              },
            }),
          ),
        },
      },
    }
  },
  saveDictRow(data, nickDict) {
    return {
      type: SAVE_DICT_ROW,
      payload: {
        request: {
          url: `${api}/nsi/dict/save`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            capitlizeObjectKeys({
              valueDict: {
                nickDict,
                element: [shittylizeElement(data)],
              },
            }),
          ),
        },
      },
    }
  },
  makeReport(nick) {
    return {
      type: MAKE_REPORT,
      payload: { nick },
    }
  },
}

function normalize(response) {
  return (Array.isArray(response) ? response : [response])
    .filter(catalog => !catalog.deleted)
    .map(({ metaAttributes, metaAttrs, nsiMetaAttrs, deleted, hierarchyDict, transfer, ...rest }) => ({
      ...rest,
      deleted: Boolean(deleted),
      hierarchy: Boolean(hierarchyDict),
      transfer: Boolean(transfer),
    }))
}

function normalizeValues(values) {
  const params = [...new Set(values.map(v => v.nick))]

  return params.reduce((acc, p) => {
    const val = (values || []).filter(v => v.nick === p)

    if (val.length > 1) {
      const { deleted, valueAttr, value, ...rest } = val[0] || {}
      return acc.concat({
        ...rest,
        deleted: Boolean(deleted),
        value: val.map(v => ({
          [v.nick]: v.valueAttr || v.value,
        })),
      })
    } else {
      const { deleted, valueAttr, value, ...rest } = val[0] || {}
      return acc.concat({
        ...rest,
        deleted: Boolean(deleted),
        value: value || valueAttr,
      })
    }
  }, [])
}

function normalizeElements(elements) {
  return (elements || [])
    .filter(element => !element.deleted)
    .map(({ deleted, values, id, ...rest }) => ({
      ...rest,
      elementId: id,
      deleted: Boolean(deleted),
      values: dataToEntities('nick', normalizeValues(values)),
    }))
}

function normalizeAttributes(attributes) {
  return attributes
    .filter(attribute => !attribute.deleted)
    .map(({ id, typeAttr, arrayAttr, required, deleted, unique, nickDictLink, ...rest }) => ({
      ...rest,
      nick: id.nick,
      type: typeAttr,
      link: nickDictLink,
      array: Boolean(arrayAttr),
      required: Boolean(required),
      deleted: Boolean(deleted),
      unique: Boolean(unique),
    }))
}

/* reducer */
export const initialState = {
  catalogs: {},
  attributes: {},
  elements: {},
}

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case success(LOAD_DICTS): {
      return {
        ...state,
        catalogs: dataToEntities('nick', normalize(payload.data)),
        attributes: payload.data.reduce((acc, { nick, nsiMetaAttrs }) => {
          acc[nick] = dataToEntities('nick', normalizeAttributes(nsiMetaAttrs).sort((a, b) => a.orders - b.orders))

          return acc
        }, {}),
      }
    }

    case success(SAVE_DICT):
      return {
        ...state,
        catalogs: {
          ...state.catalogs,
          [payload.data.nick]: normalize(payload.data)[0],
        },
        attributes: {
          ...state.attributes,
          [payload.data.nick]: dataToEntities('nick', normalizeAttributes(payload.data.nsiMetaAttrs)),
        },
      }

    case success(LOAD_DICT_ELEMENTS):
      return {
        ...state,
        elements: {
          ...state.elements,
          ...payload.data.reduce((acc, { dict }) => {
            return {
              ...acc,
              [dict.nick]: dataToEntities('elementId', normalizeElements(dict.elements)),
            }
          }, {}),
        },
      }

    case success(SAVE_DICT_ROW):
      return {
        ...state,
        elements: {
          ...state.elements,
          [payload.data.dict.nick]: dataToEntities('elementId', normalizeElements(payload.data.dict.elements)),
        },
      }

    default:
      return state
  }
}
