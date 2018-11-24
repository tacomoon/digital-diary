'use strict'

const sequelize = require('../utils/sequelize')
const { server: logger } = require('../utils/logger')

module.exports = async () => {
  logger.info('Models initialization -> started')

  require('../models')
  await sequelize.sync()

  logger.info('Models initialization -> done')
}
