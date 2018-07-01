'use strict'

const { raw } = require('config/raw')
const { format, transports } = require('winston')

const configDefault = {
  express: {
    port: 8001,
    limit: '10mb'
  },
  api: {
    base: 'api',
    version: 'v1'
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
      dialect: 'postgres',
      operatorsAliases: false
    }
  },
  logger: {
    server: raw({
      format: format.combine(
        format.simple(),
        format.colorize(),
        format.timestamp(),
        format.label({ label: 'server' }),
        format.printf(({ message, timestamp, label, level }) => `${timestamp} [${label}] ${level}: ${message}`)
      ),
      transports: [
        new transports.Console()
      ]
    })
  }
}

module.exports = configDefault
