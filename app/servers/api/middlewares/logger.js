import winston from 'winston'
import path from 'path'
const { format } = winston

export const logger = winston.loggers.add('api', {
  format: format.combine(
    format.errors({ stack: true }),
    format.timestamp(),
    format.json()
  ),
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new winston.transports.File({
      filename: path.resolve(__dirname, '../../../../data/logs/api.log')
    }),
    new winston.transports.Console({
      format: format.combine(
        format.timestamp(),
        format.printf(info => `${info.timestamp} ${info.level.toUpperCase()}: ${info.message}`)
      )
    })
  ]
})
export default async function (ctx, next) {
  try {
    await next()
  } catch (e) {
    logger.error(e)
  }
}
