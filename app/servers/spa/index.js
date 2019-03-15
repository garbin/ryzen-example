import { Application, middlewares } from 'ryzen'
import historyApiFallback from 'koa2-connect-history-api-fallback'
import * as routers from './routers'
import mounts from './mounts'

let server
const app = new Application()
app.use(historyApiFallback({ whiteList: ['/api'] }))
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
