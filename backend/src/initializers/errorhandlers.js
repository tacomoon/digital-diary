'use strict'

const { console: logger } = require('../utils/loggers')
const { errorLogger, errorHandler } = require('../utils/middleware')

module.exports = (app) => {
  logger.info('Error handler initialization started')

  app.use(errorLogger)
  app.use(errorHandler)

  logger.info('Error handler initialization done')
}