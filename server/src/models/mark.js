'use strict'

const { DataTypes } = require('sequelize')
const sequelize = require('../utils/sequelize')

const Student = require('./student')
const Teacher = require('./teacher')
const Subject = require('./subject')

const schema = {
  value: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  }
}

const options = {
  index: [
    { fields: ['date'] }
  ]
}

const Mark = sequelize.define('Mark', schema, options)

Mark.belongsTo(Student, { foreignKey: 'fk_student', targetKey: 'id' })
Mark.belongsTo(Teacher, { foreignKey: 'fk_teacher' })
Mark.belongsTo(Subject, { foreignKey: 'fk_subject' })

module.exports = Mark
