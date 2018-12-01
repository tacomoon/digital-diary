'use strict'

const mapClass = ({ id, name }) => ({ id, name })

const mapStudent = ({ id, user: { name, address, phone } }) => ({
  id, name, address, phone
})

const mapMark = ({ date, value, subject, teacher, student }) => ({
  teacher: teacher.user.name,
  student: student.user.name,
  subject: subject.name,
  date,
  value
})

module.exports = {
  mapClass,
  mapStudent,
  mapMark
}
