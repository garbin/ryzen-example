import { graphql } from 'ryzen'
const { presets, types } = graphql

export const Comment = new types.Object({
  name: 'Comment',
  fields: presets.model({
    id: types.nonNull(types.ID),
    comment: types.string()
  })
})
