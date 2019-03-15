import { Application, middlewares } from 'ryzen'
import * as routers from './routers'
import mounts from './mounts'

let server
const app = new Application()
process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at:', p, 'reason:', reason)
  // Application specific logging, throwing an error, or other logic here
})
process.on('uncaughtException', (reason, p) => {
  console.log('Unhandled Rejection at:', p, 'reason:', reason)
  // Application specific logging, throwing an error, or other logic here
})
app.use(middlewares.router(Object.values(routers)))
mounts(app)

export { routers, app }
export function start ({ port }) {
  server = app.listen(port, function () {
    console.log(`Server has started on port ${this.address().port}`)
  })
  return server
}
export function stop () {
  server.close()
}
