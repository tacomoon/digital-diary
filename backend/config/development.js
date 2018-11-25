'use strict'

const { raw } = require('config/raw')
const { format, transports } = require('winston')
const { combine, simple, timestamp, colorize, printf } = format

const loggerMessageFormat = printf(({ message, timestamp, level }) => `${timestamp} ${level}: ${message}`)

module.exports = {
  express: {
    port: process.env.DIGITAL_DIARY_PORT || 8080,
    limit: '10mb'
  },
  database: {
    config: {
      username: 'postgres',
      password: 'mysecretpassword',
      database: 'digital_diary',
      host: 'localhost',
      port: '5432',
      dialect: 'postgres',
      operatorsAliases: false // disables bugging warning in sequelize
    }
  },
  logger: {
    console: raw({
      level: 'info',
      format: combine(simple(), colorize(), timestamp(), loggerMessageFormat),
      transports: [
        new transports.Console()
      ]
    })
  }
}