'use strict'

const Express = require('express')

const {
  initializerSequelize,
  initializerModels,
  initializerSeed
} = require('./initializers')

const { server: logger } = require('./utils/logger')
const config = require('config')

const main = async () => {
  const { port } = config.get('express')

  const app = new Express()

  await initializerSequelize(app)
  await initializerModels(app)
  await initializerSeed(app)

  await new Promise((resolve, reject) => app
    .listen(port, resolve)
    .on('error', reject)
  )
}

main().catch((err) => {
  logger.info('Uncaught exception %j', err)
})
