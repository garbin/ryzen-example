import React from 'react'
import getConfig from 'next/config'
import axios from 'axios'
import qs from 'query-string'
import { has, get, isFunction } from 'lodash'
import { Router } from '../routes'
import { Loading } from './loading'

export const user = {
  required ({ store, req, res }) {
    const { oauth } = store.getState()
    if (!oauth.user.profile) {
      if (!process.browser) {
        const signinLocaiton = `/session/signin?${qs.stringify({
          prev: `${req.origin}${req.url}`
        })}`
        res.writeHead(301, { Location: signinLocaiton })
        return res.end()
      } else {
        const signinLocation = `/session/signin?${qs.stringify({
          prev: window.location.href
        })}`
        Router.push(signinLocation)
      }
    }
  }
}

export function createAxiosClient (token = f => f) {
  const client = axios.create({ baseURL: config().api, timeout: 10000 })
  client.interceptors.request.use(config => {
    if (token()) config.headers.Authorization = `Bearer ${token()}`
    return config
  }, Promise.reject)
  return client
}

export function handleRequestError (e, { req, res, isServer, store }) {
  const status = has(e, 'response.status') ? get(e, 'response.status') : has(e, 'networkError.response.status') ? get(e, 'networkError.response.status') : null
  if (status === 401 || e.message === 'Unauthorized') {
    if (isServer) {
      res.writeHead(302, { Location: '/session/signin' })
      res.end()
    } else {
      store.dispatch.session.signout()
      Router.push('/session/signin')
    }
  } else {
    console.error('[SSR_ERROR]', e.message)
  }
}

export function config (scope = 'publicRuntimeConfig') {
  return getConfig()[scope]
}
export function apolloResult (props) {
  props = isFunction(props) ? { success: props } : props
  const {
    error = e => (<div>Error: {e.message}</div>),
    success = d => <div>{JSON.stringify(d)}</div>,
    loading = d => <Loading />
  } = props
  return (result) => {
    const { data, loading: l, error: e } = result
    if (l) return loading(result)
    if (e) return error(e, result)
    if (data) return success(data, result)
  }
}
