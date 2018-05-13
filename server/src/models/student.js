'use strict'

const sequelize = require('../utils/sequelize')

const User = require('./user')
const Class = require('./class')
const Mark = require('./mark')

const schema = {}

const Student = sequelize.define('Class', schema)
Student.belongsTo(User, { onDelete: 'CASCADE' })
Student.hasOne(Class)
Student.hasMany(Mark)

module.exports = Student
