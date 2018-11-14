'use strict'

const { DataTypes } = require('sequelize')
const sequelize = require('../utils/sequelize')

const schema = {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true
  }
}

const options = {
  indexes: [
    { fields: ['name'] },
    { fields: ['phone'] }
  ]
}

const User = sequelize.define('User', schema, options)

module.exports = User
