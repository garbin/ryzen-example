import { router } from 'ryzen'

export const index = router.create(router => {
  router.get('/server', ctx => {
    ctx.body = 'Server'
  })
})
