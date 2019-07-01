import { namespace } from './types'
import reducers, { initialState } from './reducers'
import sagas from './sagas'

import * as actions from './actions'

import * as nsiService from '../../../services/nsi-new'

export const baseRoute = '/nsi'

export default {
  id: namespace,
  reducerMap: {
    [nsiService.name]: nsiService.default,
    [namespace]: (state = initialState, action) => ({
      ...state,
      ...(reducers[action.type] && reducers[action.type](state, action)),
    }),
  },
  sagas: [sagas],
  initialActions: [nsiService.actions.loadAllCatalogs(), actions.getUserSettingsFromLocalStorage()],
}
