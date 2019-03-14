import { middlewares } from 'ryzen'
import logger from './logger'
import config from '../../../../deploy/config'

export default [
  logger,
  middlewares.basic({
    accessLogger: (config.app.get('servers.api.middlewares.accesslog') && process.env.NODE_ENV !== 'test'),
    error: { emit: false, rethrow: true }
  })
]
