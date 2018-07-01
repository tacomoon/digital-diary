'use strict'

const sequelize = require('../utils/sequelize')

const User = require('./user')
const Subject = require('./subject')
const Class = require('./class')

const schema = {}

const Teacher = sequelize.define('Teacher', schema)

Teacher.belongsTo(User, { onDelete: 'CASCADE' })
Teacher.belongsTo(Subject, { foreignKey: 'fk_teacher' })
Teacher.belongsToMany(Class, { through: 'TeacherToSubjects', foreignKey: 'fk_teacher', otherKey: 'fk_class' })

module.exports = Teacher
