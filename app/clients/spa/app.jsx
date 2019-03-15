import React from 'react'
import { Provider } from 'react-redux'
import { IntlProvider } from 'react-intl'
import ReduxToastr from 'react-redux-toastr'
import { hot } from 'react-hot-loader'
import { Helmet } from 'react-helmet'
import { ApolloProvider } from 'react-apollo'
import { startsWith } from 'lodash'
import createStore from './redux'
import { messages, getUserLocale } from './locales'
import { createClient } from './graphql'
import Routes from './routes'
import './style'

function intlError (e) {
  if (!startsWith(e, '[React Intl] Missing message:')) console.error(e)
}

const locale = getUserLocale()
const store = createStore()
const apolloClient = createClient()

export default hot(module)(props => (
  <Provider store={store}>
    <ApolloProvider client={apolloClient}>
      <IntlProvider locale={locale} messages={messages[locale]} onError={intlError}>
        <div>
          <Helmet>
            <title>Ryzen SPA Example</title>
          </Helmet>
          <ReduxToastr
            timeOut={4000}
            newestOnTop={false}
            preventDuplicates
            position='top-center'
            transitionIn='bounceIn'
            transitionOut='bounceOut'
            progressBar
            closeOnToastrClick />
          <Routes />
        </div>
      </IntlProvider>
    </ApolloProvider>
  </Provider>
))
