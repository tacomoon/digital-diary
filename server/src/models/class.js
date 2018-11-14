'use strict'

const { DataTypes } = require('sequelize')
const sequelize = require('../utils/sequelize')

const Teacher = require('./teacher')
const Student = require('./student')

const schema = {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}

const options = {
  indexes: [
    { fields: ['name'] }
  ]
}

const Class = sequelize.define('Class', schema, options)

Class.hasMany(Student, { foreignKey: 'fk_class' })
Class.belongsToMany(Teacher, { through: 'TeacherToSubjects', foreignKey: 'fk_class' })

module.exports = Class
