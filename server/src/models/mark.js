'use strict'

const { DataTypes } = require('sequelize')
const sequelize = require('../utils/sequelize')

const Student = require('./student')
const Teacher = require('./teacher')
const Subject = require('./subject')

const schema = {
  value: { type: DataTypes.STRING, allowNull: false },
  date: { type: DataTypes.DATE, allowNull: false }
}

const options = {
  index: [
    { fields: ['date'] }
  ]
}

const Mark = sequelize.define('Mark', schema, options)
Mark.belongsTo(Student)
Mark.belongsTo(Teacher)
Mark.belongsTo(Subject)

module.exports = Mark
