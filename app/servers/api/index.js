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
export function start (args = {}) {
  const { port } = args
  server = app.listen(port, function () {
    console.log(`API Server has started on port ${this.address().port}`)
  })
  return server
}
export function stop () {
  server.close()
}
