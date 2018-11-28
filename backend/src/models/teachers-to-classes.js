'use strict'

const sequelize = require('../utils/sequelize')
const Teacher = require('./teachers')
const Class = require('./classes')

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
