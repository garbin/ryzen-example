import React from 'react'
import { Provider } from 'react-redux'
import NextApp, { Container } from 'next/app'
import withRedux from 'next-redux-wrapper'
import makeStore from '../redux'
import { oauth } from '../redux/actions'
import { compose } from 'recompose'
import { startsWith } from 'lodash'
import withApollo from '../graphql'
import { handleRequestError, config } from '../lib/helper'
import { ApolloProvider } from 'react-apollo'
import { IntlProvider, addLocaleData } from 'react-intl'

if (typeof window !== 'undefined' && window.ReactIntlLocaleData) {
  Object.keys(window.ReactIntlLocaleData).forEach((lang) => {
    addLocaleData(window.ReactIntlLocaleData[lang])
  })
}
function intlError (e) {
  if (!startsWith(e, '[React Intl] Missing message:')) console.error(e)
}

export class App extends NextApp {
  static async getInitialProps ({ Component, ctx }) {
    const { store } = ctx
    store.dispatch(oauth.config(config().oauth))
    try {
      const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {}
      const { req } = ctx
      const { locale, messages } = req || window.__NEXT_DATA__.props.initialProps
      const initialNow = Date.now()
      return { pageProps, locale, messages, initialNow }
    } catch (e) {
      handleRequestError(e, ctx)
    }
  }

  render () {
    const { Component, pageProps, store, apollo, locale, messages, initialNow } = this.props
    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Provider store={store}>
            <IntlProvider locale={locale} messages={messages} initialNow={initialNow} onError={intlError}>
              <Component {...pageProps} />
            </IntlProvider>
          </Provider>
        </ApolloProvider>
      </Container>
    )
  }
}
export default compose(
  withApollo,
  withRedux(makeStore)
)(App)
