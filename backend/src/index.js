'use strict'

const express = require('express')
const {
  sequelizeInitializer,
  seedInitializer,
  routesInitializer,
  middlewareInitializer,
  errorHandlers,
} = require('./initializers')

const { port } = require('config').get('express')
const { console: logger } = require('./utils/loggers')

async function main() {
  const app = express()

  await sequelizeInitializer()
    .then(() => seedInitializer())
    .then(() => middlewareInitializer(app))
    .then(() => routesInitializer(app))
    .then(() => errorHandlers(app))

  app.listen(port, () => logger.info(`Sever started: http://localhost:${port}`))
    .on('error', error => logger.error(error.stack))
}

// To see more information from errors in async promises
// To enable tracing use 'export BLUEBIRD_LONG_STACK_TRACES=1'
global.Promise = require('bluebird')

main()
  .catch(error => {
    logger.error(`Failed to start server on port ${port}, reason:\n${error.stack}`)
    process.exit(1)
  })
