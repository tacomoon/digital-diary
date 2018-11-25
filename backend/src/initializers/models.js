'use strict'

const sequelize = require('../utils/sequelize')
const { console: logger } = require('../utils/logger')

module.exports = async () => {
  logger.info('Models initialization -> started')

  require('../models')
  await sequelize.sync()

  logger.info('Models initialization -> done')
}
