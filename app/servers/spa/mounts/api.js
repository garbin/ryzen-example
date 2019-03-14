import { app as api } from '../../api'
import mount from 'koa-mount'

export default app => app.use(mount('/api', api))
