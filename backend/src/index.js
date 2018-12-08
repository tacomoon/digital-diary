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

function handleError(error) {
  logger.error(`${error.name}: ${error.message}\n${error.stack}`)
}

async function main() {
  const application = express()

  await sequelizeInitializer()
    .then(() => seedInitializer())
    .then(() => middlewareInitializer(application))
    .then(() => routesInitializer(application))

  application
    .listen(port, () => logger.info(`Sever started: http://localhost:${port}`))
    .on('error', handleError)
}

main()
  .catch(error => {
    handleError(error)
    logger.error(`Failed to start server on port ${port}`)
    process.exit(1)
  })
