'use strict'

const config = require('config')
const bodyParser = require('body-parser')

const limit = config.get('express.body.limit')
const { console: logger } = require('../utils/loggers')

module.exports = (app) => {
  logger.info('Middleware initialization started')

  app.use(bodyParser.json({ limit }))

  logger.info('Middleware initialization done')
}
