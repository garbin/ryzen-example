import React from 'react'
import { Provider } from 'react-redux'
import { IntlProvider } from 'react-intl'
import ReduxToastr from 'react-redux-toastr'
import { hot } from 'react-hot-loader'
import { Helmet } from 'react-helmet'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import createStore from './redux'
import Index from './pages'
import { messages, getUserLocale } from './locales'
const locale = getUserLocale()

const store = createStore()
export default hot(module)(props => (
  <Provider store={store}>
    <IntlProvider locale={locale} messages={messages[locale]}>
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
        <Router>
          <div>
            <Route exact path='*' component={Index} />
          </div>
        </Router>
      </div>
    </IntlProvider>
  </Provider>
))
