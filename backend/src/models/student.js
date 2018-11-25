'use strict'

const sequelize = require('../utils/sequelize')

const User = require('./user')

const Student = sequelize.define('student', {})

Student.belongsTo(
  User,
  {
    as: 'user',
    foreignKey: 'user_id',
    onUpdate: 'cascade',
    onDelete: 'cascade',
  }
)

module.exports = Student
