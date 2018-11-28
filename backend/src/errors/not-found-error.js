'use strict'

const { NOT_FOUND } = require('http-status')
const AbstractError = require('./abstract-error')

class NotFoundError extends AbstractError {
  constructor (message) {
    super(NOT_FOUND, message)
  }
}

module.exports = NotFoundError
