'use strict'

const config = require('config')
const bodyParser = require('body-parser')

const { console: logger } = require('../utils/logger')
const { errorLogger, errorHandler } = require('../utils/middleware')

module.exports = (application) => {
  logger.info('Middleware initialization started')
  const limit = config.get('express.body.limit')

  application.use(bodyParser.json({ limit }))
  application.use(errorLogger)
  application.use(errorHandler)

  logger.info('Middleware initialization done')
}
