import api from './api'
import client from './client'
import mountStatic from './static'

export default app => {
  client(app)
  api(app)
  mountStatic(app)
}
