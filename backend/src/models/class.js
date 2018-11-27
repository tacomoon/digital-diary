'use strict'

const { Sequelize } = require('sequelize')
const sequelize = require('../utils/sequelize')
const Teacher = require('./teacher')

const schema = {
  name: {
    allowNull: false,
    type: Sequelize.STRING
  }
}

const options = {
  indexes: [
    {
      name: 'i_class__name',
      fields: ['name']
    }
  ]
}

const Class = sequelize
  .define('class', schema, options)

Class.belongsToMany(Teacher, {
  through: 'teachers_to_classes',
  foreignKey: 'class_id',
  otherKey: 'teacher_id'
})

module.exports = Class
