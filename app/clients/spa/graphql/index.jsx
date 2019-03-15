import cookies from 'js-cookie'
import ApolloClient, { InMemoryCache } from 'apollo-boost'

export function createClient (initialState = {}) {
  return new ApolloClient({
    uri: process.env.API_ROOT_PATH + '/graphql',
    fetchOptions: { credentials: 'same-origin' },
    request: async operation => {
      const token = cookies.get('access_token')
      if (token) {
        operation.setContext({ headers: { Authorization: `Bearer ${token}` } })
      }
    },
    cache: new InMemoryCache().restore(initialState)
  })
}
