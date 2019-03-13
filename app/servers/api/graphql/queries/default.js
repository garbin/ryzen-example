import { graphql } from 'ryzen'
const { types } = graphql

export const test = types.type(types.JSON, {
  args: { input: types.json() },
  resolve (root, { input }) {
    return { field: 'field', input }
  }
})
