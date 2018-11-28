'use strict'

const config = require('config')
const bodyParser = require('body-parser')

const { console: logger } = require('../utils/logger')
const { handleError } = require('../utils/middleware')

module.exports = (application) => {
  const limit = config.get('express.limit')

  application.use(bodyParser.json({ limit }))
  application.use(handleError)

  logger.info('Middleware initialized')
}
