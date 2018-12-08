'use strict'

const sequelize = require('../utils/sequelize')
const { console: logger } = require('../utils/loggers')

module.exports = async () => {
  logger.info('Database authentication started')

  await sequelize.authenticate()

  logger.info('Database connection has been established successfully')
}
