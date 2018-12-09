'use strict'

const base = require('./base')
const sequelize = require('./config')

module.exports = {
  express: base.express,
  api: base.api,
  database: {
    seed: base.database.seed,
    config: { ...sequelize.production }
  },
  logger: base.logger,
}