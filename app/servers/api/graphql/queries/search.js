import { graphql } from 'ryzen'
import { Post as PostType } from '../types'
import { Post } from '../../../../models'
const { presets, types } = graphql

export const search = presets.search({
  POST: types.type(PostType, {
    model: Post,
    compose: resolver => async (root, args, ctx, info) => {
      ctx.composed = true
      const result = await resolver(root, args, ctx, info)
      return result
    },
    resolveOptions: {
      sortable: ['created_at', 'updated_at'],
      searchable: ['title', 'content'],
      filterable: ['status']
    }
  })
})
