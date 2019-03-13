import api from './api'
import next from './next'
import mountStatic from './static'

export default app => {
  next(app)
  api(app)
  mountStatic(app)
}
