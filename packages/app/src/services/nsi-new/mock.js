/* eslint-disable no-console */
import { actions } from '.'

export default Object.values(actions).reduce((acc, action) => {
  const { type, meta } = action()

  if (meta && meta.mock && typeof meta.mock === 'function') {
    acc[type] = requestConfig => ({
      data: meta.mock(requestConfig),
    })
  }

  return acc
}, {})
