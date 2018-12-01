'use strict'

const mapUserExtended = ({ name, address, phone }) => ({ name, address, phone })

const mapStudentExtended = ({ id, user }) => ({ id, ...mapUserExtended(user) })

const mapClassCore = ({ id, name }) => ({ id, name })
const mapClassExtended = ({ name }, students) => ({
  name, students: students.map(mapStudentExtended)
})

const mapMarkExtended = ({ date, value, subject, teacher, student }) => ({
  teacher: teacher.user.name, student: student.user.name, subject: subject.name, date, value
})

module.exports = {
  mapClassCore,
  mapClassExtended,
  mapMarkExtended
}
