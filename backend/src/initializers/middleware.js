'use strict'

const config = require('config')
const bodyParser = require('body-parser')

const limit = config.get('express.body.limit')
const { console: logger } = require('../utils/loggers')
const { errorLogger, errorHandler } = require('../utils/middleware')

module.exports = (app) => {
  logger.info('Middleware initialization started')

  app.use(bodyParser.json({ limit }))
  app.use(errorLogger)
  app.use(errorHandler)

  logger.info('Middleware initialization done')
}
