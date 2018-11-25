'use strict'

const sequelize = require('../utils/sequelize')

const User = require('./user')

const Teacher = sequelize
  .define('teacher', {})


Teacher.belongsTo(
  User,
  {
    as: 'user',
    foreignKey: 'user_id',
    onUpdate: 'cascade',
    onDelete: 'cascade'
  }
)

module.exports = Teacher
