import { config } from '../../lib/helper'
import axios from 'axios'
import cookie from 'js-cookie'
import { get } from 'lodash'

function createCall (method, dispatch) {
  return async (payload, rootState) => {
    const token = process.browser ? cookie.get('access_token') : get(rootState.oauth, 'user.token.access_token')
    const headers = {}
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }
    if (['post', 'patch', 'put'].includes(method)) {
      const [path, data, options = {}] = payload
      options.headers = Object.assign({}, options.headers, headers)
      const result = await axios[method](`${config().api}${path}`, data, options)
      dispatch.api.response({
        name: path,
        response: result.data
      })
      return result
    } else {
      const [path, options = {}] = payload
      options.headers = Object.assign({}, options.headers, headers)
      const result = await axios[method](`${config().api}${path}`, options)
      dispatch.api.response({
        name: path,
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
