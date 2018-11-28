'use strict'

class AbstractError extends Error {
  constructor (status, message) {
    super()

    this.name = this.constructor.name
    this.message = message
    this.status = status
  }

  toString () {
    return `${this.name} (code: ${this.status}, message: ${this.message})`
  }
}

module.exports = AbstractError
