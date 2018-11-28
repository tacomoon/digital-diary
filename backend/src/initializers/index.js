'use strict'

const sequelizeInitializer = require('./sequelize')
const seedInitializer = require('./seed')
const routesInitializer = require('./routes')
const middlewareInitializer = require('./middleware')

module.exports = {
  sequelizeInitializer,
  seedInitializer,
  routesInitializer,
  middlewareInitializer
}
