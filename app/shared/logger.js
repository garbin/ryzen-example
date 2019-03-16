import winston from 'winston'
import path from 'path'

export default function (name, filename) {
  const { format } = winston
  filename = filename || path.resolve(__dirname, `../../data/logs/${name}.log`)
  return winston.loggers.get(name, {
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
      new winston.transports.File({ filename }),
      new winston.transports.Console({
        format: format.combine(
          format.timestamp(),
          format.printf(info => `${info.timestamp} ${info.level.toUpperCase()}: ${info.message}`)
        )
      })
    ]
  })
}
