import React from 'react'
import Head from 'next/head'
import { getDataFromTree } from 'react-apollo'
import cookies from 'js-cookie'
import fetch from 'isomorphic-fetch'
import ApolloClient, { InMemoryCache } from 'apollo-boost'
import { config, handleRequestError } from '../lib/helper'

if (!process.browser) global.fetch = fetch

export function create (token, initialState = {}) {
  const initial = process.browser ? window.__NEXT_DATA__.props.apolloState : initialState
  return new ApolloClient({
    uri: config().graphql,
    fetchOptions: {
      credentials: 'same-origin'
    },
    request: async operation => {
      token = token || cookies.get('access_token')
      if (token) {
        operation.setContext({
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      }
    },
    cache: new InMemoryCache().restore(initial)
  })
}

export function initApollo (token, initialState = {}) {
  if (process.browser) {
    if (!window.apollo) window.apollo = create(token, initialState)
    return window.apollo
  } else {
    return create(token, initialState)
  }
}

export default App => {
  return class Apollo extends React.Component {
    static displayName = 'withApollo(App)'
    static async getInitialProps (props) {
      const { Component, router, ctx } = props
      const { req } = ctx

      let appProps = {}
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(props)
      }

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      const apollo = initApollo(!process.browser ? req.cookies.get('access_token') : cookies.get('access_token'))
      if (!process.browser) {
        try {
          // Run all GraphQL queries
          await getDataFromTree(
            <App
              {...appProps}
              Component={Component}
              router={router}
              apollo={apollo}
            />
          )
        } catch (error) {
          handleRequestError(error, ctx)
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
          // console.error('Error while running `getDataFromTree`', error)
        }

        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind()
      }

      // Extract query data from the Apollo store
      const apolloState = apollo.cache.extract()

      return {
        ...appProps,
        apolloState
      }
    }

    constructor (props) {
      super(props)
      this.apollo = initApollo(null, props.apolloState)
    }

    render () {
      return <App {...this.props} apollo={this.apollo} />
    }
  }
}
