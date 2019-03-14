import React, { Component } from 'react'
import { withIntl, compose, connect } from '../lib/compose'
import { Container, Navbar, NavbarBrand } from 'reactstrap'
import { Page } from '../lib/components/page'
import { List } from '../lib/components/post'

class Index extends Component {
  async componentWillMount () {
    // api.get can be found in models/api.jsx line #41
    this.props.dispatch.api.get(['/posts'])
  }
  render () {
    const { t, posts = [] } = this.props
    return (
      <Page title={t('hello')}>
        <Navbar dark color='primary' expand='lg'>
          <Container>
            <NavbarBrand href='#'>Ryzen Example</NavbarBrand>
          </Container>
        </Navbar>
        <Container className='mt-4 position-relative'>
          <List posts={posts} />
          <p>{t('hello')}</p>
        </Container>
      </Page>
    )
  }
}

export default compose(
  connect(state => ({ posts: state.api.posts })),
  withIntl
)(Index)
