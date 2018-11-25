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
    {
      name: 'i_subject__name',
      fields: ['name']
    }
  ]
}

const Subject = sequelize
  .define('subject', schema, options)

module.exports = Subject
