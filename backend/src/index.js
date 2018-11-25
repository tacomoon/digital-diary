'use strict'

const Express = require('express')

const {
  sequelizeInitializer,
  modelsInitializer,
  seedInitializer,
  routesInitializer,
  middlewareInitializer
} = require('./initializers')

const { console: logger } = require('./utils/logger')
const config = require('config')

(async () => {
  const { port } = config.get('express')

  const application = new Express()

  await sequelizeInitializer()
// await modelsInitializer()
// await seedInitializer()
// await routesInitializer(application)
  await middlewareInitializer(application)

  application
    .listen(port, () => logger.info(`Sever started: http://localhost:${port}/`))
    .on('error', err => logger.error(err))
})()
