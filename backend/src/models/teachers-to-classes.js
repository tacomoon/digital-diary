'use strict'

const sequelize = require('../utils/sequelize')
const Teacher = require('./teacher')
const Class = require('./class')

const TeachersToClasses = sequelize.define('teachers_to_classes', {})

TeachersToClasses.belongsTo(Teacher, {
    foreignKey: 'teacher_id',
    onUpdate: 'cascade',
    onDelete: 'cascade'
  }
)
TeachersToClasses.belongsTo(Class, {
  foreignKey: 'class_id',
  onUpdate: 'cascade',
  onDelete: 'restrict'
})
TeachersToClasses.removeAttribute('id');

module.exports = TeachersToClasses
