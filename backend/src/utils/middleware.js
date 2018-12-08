'use strict'

const { console: logger } = require('./loggers')
const { INTERNAL_SERVER_ERROR } = require('http-status')

const env = process.env.NODE_ENV || 'development'

function errorLogger(err, { headers, method, url, body }, res, next) {
  logger.error(`Failed to handle ${method} request to ${url}\nHeader: %j\nBody: %j\n${err.stack}`, headers, body)
  next(err)
}

function errorHandler(err, req, res, next) {
  // TODO [EG]: depends on env
  res.send('Oops, internal error')

}

module.exports = {
  errorLogger,
  errorHandler,
}
