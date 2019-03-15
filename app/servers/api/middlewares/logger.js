import getLogger from '../../../shared/logger'

const logger = getLogger('api')
export default async function (ctx, next) {
  try {
    await next()
  } catch (e) {
    logger.error(e)
  }
}
