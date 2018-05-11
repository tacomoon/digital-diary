'use strict'

const Express = require('express')

const {
  sequelizeInitializer,
  modelsInitializer,
  seedInitializer,
  routesInitializer,
  middlewareInitializer
} = require('./initializers')

const { server: logger } = require('./utils/logger')
const config = require('config')

const main = async () => {
  const { port } = config.get('express')

  const app = new Express()

  await sequelizeInitializer()
  await modelsInitializer()
  await seedInitializer()
  await middlewareInitializer(app)
  await routesInitializer(app)

  await new Promise((resolve, reject) => app
    .listen(port, resolve)
    .on('error', reject)
  )

  logger.info(`Sever started: http://localhost:${port}/`)
}

main().catch((err) => logger.error(err))
