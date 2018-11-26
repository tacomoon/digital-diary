'use strict'

const sequelize = require('../utils/sequelize')
const User = require('./user')
const Subject = require('./subject')

const Teacher = sequelize
  .define('teacher', {})

Teacher.belongsTo(User, {
    foreignKey: 'user_id',
    onUpdate: 'cascade',
    onDelete: 'cascade'
  }
)
Teacher.belongsTo(Subject, {
  foreignKey: 'subject_id',
  targetKey: 'id',
  onUpdate: 'cascade',
  onDelete: 'restrict'
})

module.exports = Teacher
