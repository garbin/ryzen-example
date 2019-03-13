import httpErrors from 'http-errors'
import { router } from 'ryzen'

export const index = router.create(index => {
  index.get('/error', async ctx => {
    ctx.body = 'haha'
    throw new httpErrors.Forbidden('You don\'t have permission for this resource')
  })
})
export * from './posts'
export * from './categories'
