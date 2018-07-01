'use strict'

const sequelize = require('../utils/sequelize')

const User = require('./user')
const Class = require('./class')
const Mark = require('./mark')

const schema = {}

const Student = sequelize.define('Class', schema)

Student.belongsTo(User, { onDelete: 'CASCADE' })
Student.belongsTo(Class, { foreignKey: 'fk_class' })
Student.hasMany(Mark, { foreignKey: 'fk_student' })

module.exports = Student
