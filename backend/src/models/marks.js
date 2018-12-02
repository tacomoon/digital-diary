'use strict'

const { Sequelize } = require('sequelize')
const sequelize = require('../utils/sequelize')

const schema = {
  value: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  date: {
    allowNull: false,
    type: Sequelize.DATE,
    // Sequelize.NOW doesn't work
    defaultValue: Sequelize.fn('now')
  }
}

const options = {
  index: [
    { name: 'i_marks__date', fields: ['date'] },
    { name: 'i_marks__student_id', fields: ['student_id'] },
    { name: 'i_marks__teacher_id', fields: ['teacher_id'] },
  ]
}

const Marks = sequelize
  .define('marks', schema, options)
module.exports = Marks
