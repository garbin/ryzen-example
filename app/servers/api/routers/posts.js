import { router } from 'ryzen'
import { Post, Comment } from '../../../models'

export const posts = router.restful(Post, router => {
  router.create()
  router.read({
    join: 'categories',
    sortable: ['created_at'],
    searchable: ['title'],
    filterable: ({ filter }) => {
      filter('status')
      filter('category_id')
    }
  })
  router.update()
  router.destroy()
}).child(Comment)
