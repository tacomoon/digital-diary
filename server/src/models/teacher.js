'use strict'

const sequelize = require('../utils/sequelize')

const User = require('./user')
const Subject = require('./subject')
const Mark = require('./mark')
const Class = require('./class')

const schema = {}

const Teacher = sequelize.define('Teacher', schema)
Teacher.belongsTo(User, { onDelete: 'CASCADE' })
Teacher.belongsTo(Subject)
Teacher.hasMany(Mark)
Teacher.hasMany(Class)

module.exports = Teacher
