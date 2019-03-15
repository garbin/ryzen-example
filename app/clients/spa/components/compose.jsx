import React from 'react'
import { injectIntl } from 'react-intl'
import { isString } from 'lodash'
import messages from '../locales'

export { compose } from 'recompose'
export { connect } from 'react-redux'
export function withIntl (Component, options = {}) {
  const { withRef = false } = options
  return injectIntl(class extends React.Component {
    render () {
      const t = (id, ...args) => {
        if (isString(id)) {
          const message = messages[id] ? messages[id] : { id }
          return this.props.intl.formatMessage(message, ...args)
        }
        return this.props.intl.formatMessage(id, ...args)
      }
      return <Component ref={withRef ? ref => { this.component = ref } : null} {...this.props} t={t} />
    }
  }, options)
}
