import React, { Component } from 'react'
import { Container, Navbar } from 'reactstrap'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { withIntl, compose } from '../components/compose'
import { Page } from '../components/page'
import { Post } from '../components/post'
import { Link } from '../components/env'
import { apolloResult } from '../components/functions'

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
    const { t, match } = this.props
    return (
      <Page title={t('hello')}>
        <Navbar dark color='primary' expand='lg'>
          <Container>
            <Link href='/' className='navbar-brand'>{t('hello')}</Link>
          </Container>
        </Navbar>
        <Container className='mt-4 position-relative'>
          <Query query={query} variables={{ id: match.params.id }}>
            {apolloResult(data => <Post post={data.post} />)}
          </Query>
        </Container>
      </Page>
    )
  }
}

export default compose(
  withIntl
)(PostPage)
