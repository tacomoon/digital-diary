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

const User = sequelize
  .define('user', schema, options)

module.exports = User
