'use strict'

const sequelize = require('../utils/sequelize')
const { console: logger } = require('../utils/loggers')

module.exports = async () => {
  logger.info("Database authenticate started")
  await sequelize.authenticate()
    .then(() => {
      logger.info('Database connection has been established successfully')
    })
    .catch(err => {
      throw new Error('Unable to connect to the database')
    })

}
