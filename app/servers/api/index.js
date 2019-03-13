import { Application, graphql, middlewares } from 'ryzen'
import * as routers from './routers'
import schema from './graphql'
import enabledMiddlewares from './middlewares'

let server
const app = new Application()
enabledMiddlewares.forEach(middleware => app.use(middleware))
app.use(middlewares.router(Object.values(routers)))
graphql.server(schema).applyMiddleware({ app })

export { routers, app }
export function start (...args) {
  server = app.listen(...args)
  return server
}
export function stop () {
  server.close()
}
