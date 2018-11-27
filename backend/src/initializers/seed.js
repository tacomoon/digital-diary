'use strict'

const Chance = require('chance')
const { User, Teacher, Student, Subject, Class, Mark } = require('../models')

const config = require('config')
const sequelize = require('../utils/sequelize')
const { console: logger } = require('../utils/logger')

const chance = new Chance()
const subjectNames = ['Maths', 'Science', 'Information Technology',
  'Physical Education', 'History', 'Music', 'Art', 'English', 'Geography']
const { teachers: teachersCount, students: studentsCount, classes: classesCount, marks: marksCount } = config.get('database.seed')

// Seed functions
async function seedSubjects() {
  const { rows: existing, count } = await Subject.findAndCountAll()
  if (count) {
    logger.info('Subjects already exists, skip seed')
    return existing
  }

  logger.info(`Seeding ${subjectNames.length} subjects`)
  const subjects = []
  for (let i = 0; i < subjectNames.length; i++) {
    const subject = await createSubject(subjectNames[i])
    subjects.push(subject)
  }

  logger.info(`${subjects.length} subjects seed`)
  return subjects
}

async function seedClasses(seedCount) {
  const { rows: existing, count } = await Class.findAndCountAll()
  if (count) {
    logger.info('Classes already exists, skip seed')
    return existing
  }

  logger.info(`Seeding ${seedCount} classes`)
  const classes = []

  for (let i = 0; i < seedCount; i++) {
    const number = 1 + Math.floor(Math.random() * 10)
    const letter = String.fromCharCode(65 + Math.floor(Math.random() * 5))
    const clazz = await createClass(`${number} ${letter}`)
    classes.push(clazz)
  }

  logger.info(`${classes.length} classes seed`)
  return classes
}

async function seedTeachers(seedCount, subjects) {
  const { rows: existing, count } = await Teacher.findAndCountAll()
  if (count) {
    logger.info('Teachers already exists, skip seed')
    return existing
  }

  const users = await seedUsers(seedCount)

  logger.info(`Seeding ${seedCount} teachers`)
  const teachers = []

  for (let i = 0; i < seedCount; i++) {
    const subject = (i >= subjects.length) ? randomElement(subjects) : subjects[i]
    const teacher = await createTeacher(users[i], subject)
    teachers.push(teacher)
  }

  logger.info(`${users.length} teachers seed`)
  return teachers
}

async function seedStudents(seedCount, classes) {
  const { rows: existing, count } = await Student.findAndCountAll()
  if (count) {
    logger.info('Students already exists, skip seed')
    return existing
  }

  const users = await seedUsers(seedCount)

  logger.info(`Seeding ${seedCount} students`)
  const students = []

  for (let i = 0; i < Math.min(users.length, seedCount); i++) {
    const clazz = randomElement(classes)
    const student = await createStudent(users[i], clazz)
    students.push(student)
  }

  logger.info(`${students.length} students seed`)
  return students
}

async function seedTeachersToClasses(teachers, classes) {
  // language=SQL
  const [[{ count }]] = await sequelize.query('SELECT count(*) FROM teachers_to_classes')
  if (count > 0) {
    logger.info('Teacher to class already exists, skip seed')
    return count
  }

  logger.info(`Seeding teacher to class`)
  const subjectToTeachers = teachers.reduce((map, teacher) => {
    (map[teacher['subject_id']] = map[teacher['subject_id']] || []).push(teacher)
    return map
  }, {})
  const subjects = Object.keys(subjectToTeachers)

  let counter = 0
  for (let clazz of classes) {
    for (let subject of subjects) {
      const subjectTeachers = subjectToTeachers[subject]
      await createTeacherToClass(randomElement(subjectTeachers), clazz)
      counter++
    }
  }
  return counter
}

async function seedMarks(seedCount, students) {
  const { rows: existing, count } = await Mark.findAndCountAll()
  if (count) {
    logger.info('Marks already exists, skip seed')
    return existing
  }

  logger.info(`Seeding ${seedCount} marks`)
  const marks = []

  for (let i = 0; i < seedCount; i++) {
    const student = randomElement(students)
    const clazz = await Class.findByPk(student.class_id)
    const classTeachers = await clazz.getTeachers()
    const teacher = randomElement(classTeachers)
    const subject = await teacher.getSubject()

    marks.push(await createMark(subject, student, teacher))
  }

  logger.info(`${marks.length} marks seed`)
  return marks
}

async function seedUsers(seedCount) {
  logger.info(`Seeding ${seedCount} users`)
  const users = []

  for (let i = 0; i < seedCount; i++) {
    const user = await createUser()
    users.push(user)
  }

  logger.info(`${users.length} users seed`)
  return users
}

// Create model functions
function createSubject(name) {
  const model = {
    name
  }

  return Subject
    .create(model)
    .catch(reason => logger.error(`Failed to create subject: ${reason}`))
}

function createClass(name) {
  const model = {
    name
  }

  return Class
    .create(model)
    .catch(reason => logger.error(`Failed to create class: ${reason}`))
}

function createTeacher(user, subject) {
  const model = {
    user_id: user.id,
    subject_id: subject.id
  }

  return Teacher
    .create(model)
    .catch(reason => logger.error(`Failed to create teacher: ${reason}`))
}

function createStudent(user, clazz) {
  const model = {
    user_id: user.id,
    class_id: clazz.id
  }

  return Student
    .create(model)
    .catch(reason => logger.error(`Failed to create a student: ${reason}`))
}

function createUser() {
  const model = {
    name: chance.name(),
    address: chance.address(),
    phone: chance.phone({ country: 'us', mobile: true })
  }

  return User
    .create(model)
    .catch(reason => logger.error(`Failed to create a user: ${reason}`))
}

function createTeacherToClass(teacher, clazz) {
  // language=SQL
  return sequelize.query(`INSERT INTO teachers_to_classes VALUES (${teacher.id}, ${clazz.id}, now(), now())`)
}

function createMark(subject, student, teacher) {
  const model = {
    value: Math.random() * 5,
    date: chance.date({ year: 2018 }),
    subject_id: subject.id,
    student_id: student.id,
    teacher_id: teacher.id
  }

  return Mark
    .create(model)
    .catch(reason => logger.error(`Failed to create a mark: ${reason}`))
}

// Utils
function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)]
}

module.exports = async () => {
  const subjects = await seedSubjects()
  if (subjects.length === 0) {
    throw new Error('Unable to seed subjects')
  }
  const classes = await seedClasses(classesCount)
  if (classes.length === 0) {
    throw new Error('Unable to seed classes')
  }
  const teachers = await seedTeachers(teachersCount, subjects)
  if (teachers.length === 0) {
    throw new Error('Unable to seed teachers')
  }
  const students = await seedStudents(studentsCount, classes)
  if (students.length === 0) {
    throw new Error('Unable to seed teachers')
  }
  const teachersToClasses = await seedTeachersToClasses(teachers, classes)
  if (teachersToClasses.length === 0) {
    throw new Error('Unable to seed teachers to classes')
  }
  const marks = await seedMarks(marksCount, students)
  if (marks.length === 0) {
    throw new Error('Unable to seed marks')
  }
}
