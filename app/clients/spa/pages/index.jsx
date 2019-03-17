import React, { Component } from 'react'
import { withIntl, compose, connect } from '../components/compose'
import { Container, Navbar, NavbarBrand } from 'reactstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Page } from '../components/page'
import { List } from '../components/post'
import Post from './post'

const Index = compose(
  connect(state => ({ posts: state.api.posts })),
  withIntl
)(class Index extends Component {
  componentWillMount () {
    this.props.dispatch.api.get(['/posts'])
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
          <List posts={posts} />
        </Container>
      </Page>
    )
  }
})

export default props => (
  <Router>
    <div>
      <Route exact path='/' component={Index} />
      <Route exact path='/posts/:id' component={Post} />
    </div>
  </Router>
)
