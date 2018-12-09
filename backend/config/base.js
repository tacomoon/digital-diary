'use strict'

const { raw } = require('config/raw')
const { format, transports } = require('winston')
const { combine, simple, splat, timestamp, printf } = format

const colorizer = format.colorize()
const timestampFormat = timestamp({ format: 'YYYY-MM-DD HH:mm:ss' })
const messageFormat = printf(({ message, timestamp, level }) => {
  switch (level) {
    case 'error':
      return colorizer.colorize(level, `${timestamp} ${level}: ${message}`)
    default:
      return `${timestamp} ` + colorizer.colorize(level, `${level}: `) + message

  }
})

module.exports = {
  express: {
    port: process.env.DIGITAL_DIARY_PORT || 3000,
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
    }
  },
  logger: {
    console: raw({
      level: 'info',
      format: combine(simple(), splat(), timestampFormat, messageFormat),
      transports: [
        new transports.Console()
      ]
    })
  }
}