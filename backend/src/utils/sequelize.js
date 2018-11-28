'use strict'

const Sequelize = require('sequelize')
const config = require('config')

const databaseConfig = config.get('database.config')

module.exports = new Sequelize(databaseConfig)
