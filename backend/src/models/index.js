'use strict'

const User = require('./user')
const Teacher = require('./teacher')
const Student = require('./student')
const Subject = require('./subject')
const Class = require('./class')
const Mark = require('./mark')
const TeachersToClasses = require('./teachers-to-classes')

module.exports = {
  User,
  Teacher,
  Student,
  Subject,
  Class,
  Mark,
  TeachersToClasses,
}
