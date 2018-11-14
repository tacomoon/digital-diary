'use strict'

const { DataTypes } = require('sequelize')
const sequelize = require('../utils/sequelize')

const Teacher = require('./teacher')
const Mark = require('./mark')

const schema = {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}

const options = {
  indexes: [{ fields: ['name'] }]
}

const Subject = sequelize.define('Subject', schema, options)

Subject.hasMany(Teacher, { foreignKey: 'fk_teacher' })
Subject.hasMany(Mark, { foreignKey: 'fk_subject' })

module.exports = Subject
