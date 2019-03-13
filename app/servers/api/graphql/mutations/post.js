import { graphql } from 'ryzen'
import { Post as PostType } from '../types'
import { Post } from '../../../../models'
const { presets } = graphql
export default presets.mutation(PostType, {
  model: Post
})
