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
    { name: 'i_subject__name', fields: ['name'] }
  ]
}

const Subjects = sequelize
  .define('subjects', schema, options)
module.exports = Subjects
