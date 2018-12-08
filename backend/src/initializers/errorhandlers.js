'use strict'

const { console: logger } = require('../utils/loggers')
const { logError, handleError } = require('../utils/middleware')

module.exports = (app) => {
  logger.info('Error handler initialization started')

  app.use(logError)
  app.use(handleError)

  logger.info('Error handler initialization done')
}