import React, { Component } from 'react'
import { Container, Navbar, NavbarBrand } from 'reactstrap'
import { withIntl, compose, Page, Post } from '../components'

class Index extends Component {
  static async getInitialProps ({ store }) {
    const res = await store.dispatch.api.get(['/posts'])
    return { posts: res.data }
  }
  render () {
    const { t, posts = [] } = this.props
    return (
      <Page title={t('hello')}>
        <Navbar dark color='primary' expand='lg'>
          <Container>
            <NavbarBrand href='#'>{t('hello')}</NavbarBrand>
          </Container>
        </Navbar>
        <Container className='mt-4 position-relative'>
          <Post.List posts={posts} />
        </Container>
      </Page>
    )
  }
}

export default compose(withIntl)(Index)
