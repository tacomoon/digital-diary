'use strict'

const controllersV1 = require('../controllers/v1')

const config = require('config')
const { console: logger } = require('../utils/logger')
const { base, version } = config.get('api')

module.exports = (app) => {
  logger.info('Routes initialization started')

  const apiUrl = `/${base}/${version}`

  Object.entries(controllersV1)
    .forEach(([name, routeHandler]) => {
      app.use(`${apiUrl}/${name}`, routeHandler)
      logger.info(`Routes initialization -> route added: ${apiUrl}/${name}`)
    })

  logger.info('Routes initialization done')
}
