'use strict'

const sequelize = require('../utils/sequelize')
const { console: logger } = require('../utils/logger')

module.exports = async () => {
  logger.info("Database authenticate started")
  await sequelize.authenticate()
    .then(() => {
      logger.info('Database connection has been established successfully')
    })
    .catch(err => {
      logger.error('Unable to connect to the database', err)
    })

}
