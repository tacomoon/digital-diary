'use strict'

const express = require('express')
const {
  sequelizeInitializer,
  seedInitializer,
  routesInitializer,
  middlewareInitializer
} = require('./initializers')

const config = require('config')
const { console: logger } = require('./utils/logger')

const { port } = config.get('express')

const main = async () => {
  const application = express()

  await sequelizeInitializer()
  await seedInitializer()
  await middlewareInitializer(application)
  await routesInitializer(application)

  application
    .listen(port, () => logger.info(`Sever started: http://localhost:${port}`))
    .on('error', err => logger.error(err))
}

main()
  .catch(reason => {
    logger.error(`Failed to start server on port ${port}: ${reason}`)
    process.exit(1)
  })
