import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { connect } from 'react-redux'
import ReduxToastr from 'react-redux-toastr'
import LoadingIndicator from './loading'
import '../../style'

export class Page extends React.Component {
  static contextTypes = {
    settings: PropTypes.object
  }
  render () {
    const { title, children, loading } = this.props
    const pageTitle = 'Ryzen SSR Example'
    return (
      <div>
        <Head>
          <title>{pageTitle}</title>
          <link rel='icon' href='/static/favicon.ico' type='image/x-icon' />
        </Head>
        <ReduxToastr
          timeOut={4000}
          newestOnTop={false}
          preventDuplicates
          position='top-right'
          transitionIn='bounceIn'
          transitionOut='bounceOut'
          progressBar
          closeOnToastrClick />
        {loading && <LoadingIndicator />}
        {children}
      </div>
    )
  }
}
export default connect(state => ({ loading: state.loading.global }))(Page)
