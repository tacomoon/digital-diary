'use strict'

const mapUserExtended = ({ name, address, phone }) => ({ name, address, phone })

const mapStudentExtended = ({ id, user }) => ({ id, ...mapUserExtended(user) })

const mapClassCore = ({ id, name }) => ({ id, name })
const mapClassExtended = ({ id, name }, students) => ({
  id, name, students: students.map(mapStudentExtended)
})

const mapMarkCore = ({ id, teacher_id, subject_id, student_id, date, value }) => ({
  id,
  teacher: teacher_id,
  subject: subject_id,
  student: student_id,
  date: date.toUTCString(),
  value
})
const mapMarkExtended = ({ id, date, value, subject, teacher, student }) => ({
  id,
  teacher: teacher.user.name,
  student: student.user.name,
  subject: subject.name,
  date: date.toUTCString(),
  value
})

module.exports = {
  mapClassCore,
  mapClassExtended,
  mapMarkCore,
  mapMarkExtended,
}
