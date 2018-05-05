'use strict'

const config = require('config')
const winston = require('winston')

const configuration = config.get('logger')

const loggers = Object
  .entries(configuration)
  .reduce((accumulator, [name, config]) => {
    accumulator[name] = winston.createLogger(config)
    return accumulator
  }, {})

module.exports = loggers
