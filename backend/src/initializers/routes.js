'use strict'

const controllersV1 = require('../controllers/v1')

const config = require('config')
const { console: logger } = require('../utils/logger')

const initializerRoutes = (app) => {
  // TODO [EG]: destructor
  const apiConfig = config.get('api')
  const apiUrl = `/${apiConfig.base}/${apiConfig.version}`

  logger.info('Routes initialization -> started', apiConfig)

  Object.entries(controllersV1)
    .forEach(([name, routeHandler]) => {
      app.use(`${apiUrl}/${name}`, routeHandler)
      logger.info(`Routes initialization -> route added: ${apiUrl}/${name}`)
    })

  logger.info('Routes initialized', apiConfig)
}

module.exports = initializerRoutes
