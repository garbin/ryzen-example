import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import ReduxToastr from 'react-redux-toastr'
import { Loading } from './loading'

export class Page extends React.Component {
  static contextTypes = {
    settings: PropTypes.object
  }
  render () {
    const { title, children, _public = false, loading } = this.props
    const { settings } = this.context
    const pageTitle = _public ? title : `${title ? title + ' - ' : ''}${_public ? settings.epress_name : 'ePress'}`
    return (
      <div>
        <Helmet>
          <title>{pageTitle}</title>
          <link rel='icon' href='/static/favicon.ico' type='image/x-icon' />
        </Helmet>
        <ReduxToastr
          timeOut={4000}
          newestOnTop={false}
          preventDuplicates
          position='top-right'
          transitionIn='bounceIn'
          transitionOut='bounceOut'
          progressBar
          closeOnToastrClick />
        {loading && <Loading />}
        {children}
      </div>
    )
  }
}
