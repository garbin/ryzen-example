import React from 'react'
import { Provider } from 'react-redux'
import { IntlProvider, addLocaleData } from 'react-intl'
import en from 'react-intl/locale-data/en'
import zh from 'react-intl/locale-data/zh'
import ReduxToastr from 'react-redux-toastr'
import createStore from './redux'
import { hot } from 'react-hot-loader'
import { Helmet } from 'react-helmet'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Index from './pages'
import { locales } from './locales'
const locale = 'zh'

addLocaleData(en, zh)
const store = createStore()
export default hot(module)(props => (
  <Provider store={store}>
    <IntlProvider locale={locale} messages={locales[locale]}>
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
