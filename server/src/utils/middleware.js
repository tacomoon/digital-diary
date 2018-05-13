'use strict'

const { server: logger } = require('./logger')
const { AbstractError } = require('../errors')

const errorhandler = require('errorhandler')
const { INTERNAL_SERVER_ERROR } = require('http-status')

function handleError (err, req, res, next) {
  logger.error('Caught error %j', {
    headers: req.headers,
    method: req.method,
    url: req.url,
    body: req.body,
    error: err.toString() ? err.toString() : err
  })

  if (err instanceof AbstractError) {
    handleAbstractError(err, res)
    return
  }

  const environment = process.env.NODE_ENV
  if (!environment || environment === 'development') {
    errorhandler()(err, req, res, next)
  } else {
    handleAbstractError(new AbstractError(INTERNAL_SERVER_ERROR, 'Unexpected error'), res)
  }
}

function handleAbstractError (abstractError, res) {
  res.status(abstractError.status)
  res.json(abstractError.message)
}

module.exports = {
  handleError
}
