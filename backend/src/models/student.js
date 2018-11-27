'use strict'

const sequelize = require('../utils/sequelize')
const User = require('./user')
const Class = require('./class')

const Student = sequelize.define('student', {})

Student.belongsTo(User, {
  foreignKey: 'user_id',
  onUpdate: 'cascade',
  onDelete: 'cascade',
})
Student.belongsTo(Class, {
  foreignKey: 'class_id',
  onUpdate: 'cascade',
  onDelete: 'restrict'
})

module.exports = Student
