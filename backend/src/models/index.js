'use strict'

const Users = require('./users')
const Teachers = require('./teachers')
const Students = require('./students')
const Subjects = require('./subjects')
const Classes = require('./classes')
const Marks = require('./marks')

const CASCADE_POLITIC = 'CASCADE'
const RESTRICT_POLITIC = 'RESTRICT'

Teachers.belongsTo(Users, {
  foreignKey: 'user_id',
  onUpdate: CASCADE_POLITIC,
  onDelete: CASCADE_POLITIC
})
Teachers.belongsTo(Subjects, {
  foreignKey: 'subject_id',
  onUpdate: CASCADE_POLITIC,
  onDelete: RESTRICT_POLITIC
})
Teachers.belongsToMany(Classes, {
  through: 'teachers_to_classes',
  foreignKey: 'teacher_id'
})
Teachers.hasMany(Marks, {
  foreignKey: 'teacher_id',
  onUpdate: CASCADE_POLITIC,
  onDelete: RESTRICT_POLITIC
})

Students.belongsTo(Users, {
  foreignKey: 'user_id',
  onUpdate: CASCADE_POLITIC,
  onDelete: CASCADE_POLITIC,
})
Students.belongsTo(Classes, {
  foreignKey: 'class_id',
  onUpdate: CASCADE_POLITIC,
  onDelete: RESTRICT_POLITIC
})
Students.hasMany(Marks, {
  foreignKey: 'student_id',
  onUpdate: CASCADE_POLITIC,
  onDelete: RESTRICT_POLITIC
})

Subjects.hasMany(Teachers, {
  foreignKey: 'subject_id',
  onUpdate: CASCADE_POLITIC,
  onDelete: RESTRICT_POLITIC
})
Subjects.hasMany(Marks, {
  foreignKey: 'subject_id',
  onUpdate: CASCADE_POLITIC,
  onDelete: RESTRICT_POLITIC
})

Classes.hasMany(Students, {
  foreignKey: 'class_id',
  onUpdate: CASCADE_POLITIC,
  onDelete: RESTRICT_POLITIC
})
Classes.belongsToMany(Teachers, {
  through: 'teachers_to_classes',
  foreignKey: 'class_id'
})

Marks.belongsTo(Teachers, {
  foreignKey: 'teacher_id',
  onUpdate: CASCADE_POLITIC,
  onDelete: RESTRICT_POLITIC
})
Marks.belongsTo(Students, {
  foreignKey: 'student_id',
  onUpdate: CASCADE_POLITIC,
  onDelete: RESTRICT_POLITIC
})
Marks.belongsTo(Subjects, {
  foreignKey: 'subject_id',
  onUpdate: CASCADE_POLITIC,
  onDelete: RESTRICT_POLITIC
})

module.exports = {
  Users,
  Teachers,
  Students,
  Subjects,
  Classes,
  Marks,
}
