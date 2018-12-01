'use strict'

const controllers = require('../controllers/v1')

const config = require('config')
const { console: logger } = require('../utils/logger')
const { base, version } = config.get('api')

module.exports = (app) => {
  logger.info('Routes initialization started')

  const apiUrl = `/${base}/${version}`

  Object.entries(controllers)
    .forEach(([name, router]) => {
      app.use(`${apiUrl}/${name}`, router)
      logger.info(`Route added: ${apiUrl}/${name}`)
    })

  logger.info('Routes initialization done')
}
