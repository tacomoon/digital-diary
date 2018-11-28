'use strict'

const User = require('./user')
const Teacher = require('./teacher')
const Student = require('./student')
const Subject = require('./subject')
const Class = require('./class')
const Mark = require('./mark')
const TeachersToClasses = require('./teachers-to-classes')

Class.belongsToMany(Teacher, {
  through: 'teachers_to_classes',
  foreignKey: 'class_id',
  otherKey: 'teacher_id'
})

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

Student.belongsTo(User, {
  foreignKey: 'user_id',
  onUpdate: 'cascade',
  onDelete: 'cascade',
})
Student.belongsTo(Class, {
  foreignKey: 'class_id',
  onUpdate: 'cascade',
  onDelete: 'restrict'
})

Teacher.belongsTo(User, {
    foreignKey: 'user_id',
    onUpdate: 'cascade',
    onDelete: 'cascade'
  }
)
Teacher.belongsTo(Subject, {
  foreignKey: 'subject_id',
  onUpdate: 'cascade',
  onDelete: 'restrict'
})

module.exports = {
  User,
  Teacher,
  Student,
  Subject,
  Class,
  Mark,
  TeachersToClasses,
}
