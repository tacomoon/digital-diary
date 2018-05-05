'use strict'

const { raw } = require('config/raw')
const { format, transports } = require('winston')

const configDefault = {
  express: {
    port: 4000
  },
  db: {
    seed: {
      teacherSeedCount: 10
    },
    config: {
      database: 'digital-diary',
      username: 'development',
      password: 'development',
      host: 'localhost',
      port: 5432,
      dialect: 'postgres'
    }
  },
  logger: {
    server: raw({
      format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.label({ label: 'server' }),
        format.printf(({ message, timestamp, label, level }) => `${timestamp} [${label}] ${level}: ${message}`)
      ),
      transports: [
        new transports.Console()
      ]
    }),
    postgres: raw({
      format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.label({ label: 'postgres' }),
        format.printf(({ message, timestamp, label, level }) => `${timestamp} [${label}] ${level}: ${message}`)
      ),
      transports: [
        new transports.Console()
      ]
    })
  }
}

module.exports = configDefault
