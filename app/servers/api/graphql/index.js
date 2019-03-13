import { graphql } from 'ryzen'
import * as mutations from './mutations'
import * as queries from './queries'
const { types } = graphql
const { default: defaults, ...otherMutations } = mutations
export default {
  schema: new types.Schema({
    mutation: new types.Object({
      name: 'Mutation',
      fields: {
        ...defaults,
        ...otherMutations
      }
    }),
    query: new types.Object({
      name: 'Query',
      fields: queries
    })
  })
}
