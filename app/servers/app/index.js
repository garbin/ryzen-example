import { Application, middlewares } from 'ryzen'
import * as routers from './routers'
import mounts from './mounts'

let server
const app = new Application()
app.use(middlewares.router(Object.values(routers)))
mounts(app)

export { routers, app }
export function start (...args) {
  server = app.listen(...args)
  return server
}
export function stop () {
  server.close()
}
