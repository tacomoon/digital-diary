'use strict'

const { DataTypes } = require('sequelize')
const sequelize = require('../utils/sequelize')

const Teacher = require('./teacher')
const Mark = require('./mark')

const schema = {
  name: { type: DataTypes.STRING }
}

const options = {
  indexes: [{ fields: ['name'] }]
}

const Subject = sequelize.define('Subject', schema, options)
Subject.hasMany(Teacher)
Subject.hasMany(Mark)

module.exports = Subject
