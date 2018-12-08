'use strict'

const { BAD_REQUEST } = require('http-status')
const AbstractError = require('./abstract-error')

class BadRequestError extends AbstractError {
  constructor (message) {
    super(BAD_REQUEST, message)
  }
}

module.exports = BadRequestError