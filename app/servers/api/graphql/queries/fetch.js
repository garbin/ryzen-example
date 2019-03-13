import { graphql } from 'ryzen'
import { Post as PostType } from '../types'
import { Post } from '../../../../models'
const { presets, types } = graphql

export const fetch = presets.fetch({ POST: types.type(PostType, { model: Post }) })
