'use strict'

const controllersV1 = require('../controllers/v1')

const config = require('config')
const { server: logger } = require('../utils/logger')

const initializerRoutes = (app) => {
  const apiConfig = config.get('api')
  const apiUrl = `/${apiConfig.base}/${apiConfig.version}`

  logger.info('Routes initialization -> started', apiConfig)

  Object.entries(controllersV1)
    .forEach(([name, routeHandler]) => {
      app.use(`${apiUrl}/${name}`, routeHandler)
      logger.info(`Routes initialization -> route added: ${apiUrl}/${name}`)
    })

  logger.info('Routes initialization -> done', apiConfig)
}

module.exports = initializerRoutes
