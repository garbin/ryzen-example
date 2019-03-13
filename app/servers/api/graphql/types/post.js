import { graphql } from 'ryzen'
import { Comment as CommentType } from './comment'
import { Comment } from '../../../../models'
const { presets, types } = graphql

export const Post = new types.Object({
  name: 'Post',
  fields: presets.model({
    id: types.nonNull(types.ID),
    title: types.string(),
    contents: types.string(),
    comments: types.list(CommentType, {
      resolve: presets.batch.hasMany(Comment)
    }),
    created_at: types.datetime(),
    updated_at: types.datetime()
  })
})
