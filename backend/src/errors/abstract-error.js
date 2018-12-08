'use strict'

class AbstractError extends Error {
  constructor(status, message) {
    super()

    this.name = this.constructor.name
    this.message = message
    this.status = status

    Error.captureStackTrace(this, this.constructor)
  }

  toString() {
    return `${this.name} (status: ${this.status}, message: ${this.message})`
  }
}

module.exports = AbstractError
