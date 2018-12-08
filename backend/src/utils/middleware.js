'use strict'

const errorHandler = require('errorhandler')
const { console: logger } = require('./loggers')
const { INTERNAL_SERVER_ERROR } = require('http-status')

const env = process.env.NODE_ENV || 'development'

function logError(err, { headers, method, url, body }, res, next) {
  logger.error(`Failed to handle ${method} request to ${url}\nHeader: %j\nBody: %j\n${err.stack}`, headers, body)
  next(err)
}

function handleError(err, req, res, next) {
  res.status(err.status || INTERNAL_SERVER_ERROR)

  if (env === 'development') {
    errorHandler({ log: false })(err, req, res, next)
  } else {
    res.send(err.message)
  }
}

module.exports = {
  logError,
  handleError,
}
