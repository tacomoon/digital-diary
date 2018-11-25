'use strict'

const { Sequelize } = require('sequelize')
const sequelize = require('../utils/sequelize')

const schema = {
  name: {
    allowNull: false,
    type: Sequelize.INTEGER,
  },
  address: {
    allowNull: true,
    type: Sequelize.STRING,
  },
  phone: {
    allowNull: true,
    type: Sequelize.STRING,
  }
}

const options = {
  indexes: [
    {
      name: 'i_user__name',
      fields: ['name']
    },
    {
      name: 'i_user__name',
      fields: ['phone']
    }
  ]
}

module.exports = sequelize
  .define('user', schema, options)
