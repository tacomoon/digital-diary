'use strict'

const sequelize = require('../utils/sequelize')
const { server: logger } = require('../utils/logger')

module.exports = async () => {
  logger.info('Sequelize initialization -> started')

  await sequelize.authenticate()

  logger.info('Sequelize initialization -> done')
}
