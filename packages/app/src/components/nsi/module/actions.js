import * as types from './types'

export function searchCatalogs(query) {
  return {
    type: types.SEARCH_CATALOGS,
    payload: {
      query,
    },
  }
}

export function searchElements(query) {
  return {
    type: types.SEARCH_ELEMENTS,
    payload: {
      query,
    },
  }
}

export function setSideWidth(width) {
  return {
    type: types.SET_SIDE_WIDTH,
    payload: {
      width,
    },
  }
}

export function setElementsLoading(isLoading) {
  return {
    type: types.SET_ELEMENTS_LOADING,
    payload: {
      isLoading,
    },
  }
}

export function setCurrentCatalog(nick) {
  return {
    type: types.SET_CURRENT_CATALOG,
    payload: {
      nick,
    },
  }
}

export function showElementsForm(row) {
  return {
    type: types.SHOW_ELEMENTS_FORM,
    payload: {
      row,
    },
  }
}

export function hideElementsForm() {
  return {
    type: types.HIDE_ELEMENTS_FORM,
  }
}

export function sort({ column, order }) {
  return {
    type: types.SORT,
    payload: {
      column,
      order,
    },
  }
}

export function setUserSettings({ catalogName, attributeName, width }) {
  return {
    type: types.SET_USER_SETTINGS,
    payload: {
      catalogName,
      attributeName,
      width,
    },
  }
}

export function presistUserSettings() {
  return {
    type: types.PRESIST_USER_SETTINGS_TO_LOCAL_STORAGE,
  }
}

export function getUserSettingsFromLocalStorage() {
  return {
    type: types.GET_USER_SETTINGS_FROM_LOCAL_STORAGE,
  }
}

export function setUserSettingsFromLocalStorage({ userSettings }) {
  return {
    type: types.GET_USER_SETTINGS_FROM_LOCAL_STORAGE,
    payload: {
      userSettings,
    },
  }
}
