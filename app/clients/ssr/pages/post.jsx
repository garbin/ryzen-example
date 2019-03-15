import React, { Component } from 'react'
import { withIntl, compose, withRouter } from '../lib/compose'
import { Container, Navbar } from 'reactstrap'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { apolloResult } from '../lib/helper'
import { Link } from '../routes'
import { Page } from '../lib/components/page'
import { Post } from '../lib/components/post'

export const query = gql`
  query post($id: ID!){
    post: fetch(type: POST, id: $id) {
      ... on Post {
        id
        title
        contents
        comments {
          comment
          created_at
        }
        created_at
      }
    }
  }
`

export class PostPage extends Component {
  render () {
    const { t, router, post = {} } = this.props
    return (
      <Page title={t('hello')}>
        <Navbar dark color='primary' expand='lg'>
          <Container>
            <Link href='/'>
              <a className='navbar-brand'>{t('hello')}</a>
            </Link>
          </Container>
        </Navbar>
        <Container className='mt-4 position-relative'>
          <Query query={query} variables={{ id: router.query.id }}>
            {apolloResult((data, { refetch }) => <div />)}
          </Query>
        </Container>
      </Page>
    )
  }
}

export default compose(
  withIntl,
  withRouter
)(PostPage)
