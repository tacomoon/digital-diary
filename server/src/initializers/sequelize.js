'use strict'

const sequelize = require('../utils/sequelize')
const { server: logger } = require('../utils/logger')

const initializerSequelize = async () => {
  logger.info('Sequelize initialization -> started')

  await sequelize.authenticate()

  logger.info('Sequelize initialization -> done')
}

module.exports = initializerSequelize
