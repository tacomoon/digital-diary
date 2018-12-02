'use strict'

const { raw } = require('config/raw')
const { format, transports } = require('winston')
const { combine, simple, timestamp, colorize, printf } = format

const timestampFormat = timestamp({ format: 'YYYY-MM-DD HH:mm:ss' })
const messageFormat = printf(({ message, timestamp, level }) => `${timestamp} ${level}: ${message}`)

module.exports = {
  express: {
    port: process.env.DIGITAL_DIARY_PORT || 8080,
    body: {
      limit: '10mb'
    }
  },
  api: {
    base: 'api',
    version: 'v1'
  },
  database: {
    seed: {
      subjectNames: ['Maths', 'Science', 'Information Technology',
        'Physical Education', 'History', 'Music', 'Art', 'English', 'Geography'],
      teacherCount: 15,
      studentCount: 200,
      classCount: 10,
      markCount: 1000
    },
    config: {
      username: 'postgres',
      password: 'mysecretpassword',
      database: 'digital_diary',
      host: 'localhost',
      port: '5432',
      dialect: 'postgres',
      operatorsAliases: false // disables bugged warning in sequelize
    }
  },
  logger: {
    console: raw({
      level: 'info',
      format: combine(simple(), colorize(), timestampFormat, messageFormat),
      transports: [
        new transports.Console()
      ]
    })
  }
}