import axios from 'axios'
import { config } from '../../lib/helper'
function getFullPath (path) {
  return config().api + path
}
function getResourceName (path) {
  return path.split('/').reverse()[0]
}

function createCall (method, dispatch) {
  return async (payload, rootState, mapName) => {
    if (['post', 'patch', 'put'].includes(method)) {
      const [path, data, options = {}] = payload
      const result = await axios[method](getFullPath(path), data, options)
      dispatch.api.response({
        name: mapName || getResourceName(path),
        response: result.data
      })
      return result
    } else {
      const [path, options = {}] = payload
      const result = await axios[method](getFullPath(path), options)
      dispatch.api.response({
        name: mapName || getResourceName(path),
        response: result.data
      })
      return result
    }
  }
}

export const api = {
  state: {},
  reducers: {
    response: (state, payload) => {
      const { name, response } = payload
      return { ...state, [name]: response }
    }
  },
  effects: (dispatch) => ({
    post: createCall('post', dispatch),
    get: createCall('get', dispatch),
    put: createCall('put', dispatch),
    patch: createCall('patch', dispatch),
    delete: createCall('delete', dispatch)
  })
}
