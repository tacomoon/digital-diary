'use strict'

const sequelize = require('../utils/sequelize')
const { server: logger } = require('../utils/logger')

const initializerModels = async () => {
  logger.info('Models initialization -> started')

  require('../models');
  await sequelize.sync()

  logger.info('Sequelize initialization -> done')
}

module.exports = initializerModels
