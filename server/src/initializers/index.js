'use strict'

const sequelizeInitializer = require('./sequelize')
const modelsInitializer = require('./models')
const seedInitializer = require('./seed')
const routesInitializer = require('./routes')
const middlewareInitializer = require('./middleware')

module.exports = {
  sequelizeInitializer,
  modelsInitializer,
  seedInitializer,
  routesInitializer,
  middlewareInitializer
}
