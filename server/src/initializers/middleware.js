'use strict'

const config = require('config')
const bodyParser = require('body-parser')
const { server: logger } = require('../utils/logger')

module.exports = (app) => {
  const limit = config.get('express.limit')
  logger.info('Middleware initialization -> started')

  app.use(bodyParser.json({ limit }))

  logger.info('Middleware initialization -> done')
}
