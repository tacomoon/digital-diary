'use strict'

const { Sequelize } = require('sequelize')
const sequelize = require('../utils/sequelize')

const schema = {
  name: {
    allowNull: false,
    type: Sequelize.STRING
  }
}
const options = {
  indexes: [
    { name: 'i_class__name', fields: ['name'] }
  ]
}

const Classes = sequelize
  .define('classes', schema, options)
module.exports = Classes
