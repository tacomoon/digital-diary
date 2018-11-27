'use strict'

const { Sequelize } = require('sequelize')
const sequelize = require('../utils/sequelize')
const Subject = require('./subject')
const Student = require('./student')
const Teacher = require('./teacher')

const schema = {
  value: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  date: {
    allowNull: false,
    type: Sequelize.DATE,
  }
}

const options = {
  index: [
    {
      name: 'i_marks__date',
      fields: ['date']
    },
    {
      name: 'i_marks__student_id',
      fields: ['student_id']
    },
    {
      name: 'i_marks__teacher_id',
      fields: ['teacher_id']
    },
  ]
}

const Mark = sequelize.define('mark', schema, options)

Mark.belongsTo(Subject, {
  foreignKey: 'subject_id',
  onUpdate: 'cascade',
  onDelete: 'restrict'
})
Mark.belongsTo(Student, {
  foreignKey: 'student_id',
  onUpdate: 'cascade',
  onDelete: 'restrict'
})
Mark.belongsTo(Teacher, {
  foreignKey: 'teacher_id',
  onUpdate: 'cascade',
  onDelete: 'restrict'
})

module.exports = Mark
