'use strict'

const { DataTypes } = require('sequelize')
const sequelize = require('../utils/sequelize')

const Student = require('./student')
const Teacher = require('./teacher')

const schema = {
  name: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.STRING },
  phone: { type: DataTypes.STRING }
}

const options = {
  indexes: [
    { fields: ['name'] },
    { fields: ['phone'] }
  ]
}

const User = sequelize.define('User', schema, options)
User.hasOne(Student)
User.hasOne(Teacher)

module.exports = User
