'use strict'

const sequelizeInitializer = require('./sequelize')
const seedInitializer = require('./seed')
const routesInitializer = require('./routes')
const middlewareInitializer = require('./middleware')
const errorHandlers = require('./errorhandlers')

module.exports = {
  sequelizeInitializer,
  seedInitializer,
  routesInitializer,
  middlewareInitializer,
  errorHandlers,
}
