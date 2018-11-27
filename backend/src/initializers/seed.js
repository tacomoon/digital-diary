'use strict'

const Chance = require('chance')
const { User, Teacher, Student, Subject, Class, Mark, TeachersToClasses } = require('../models')

const config = require('config')
const { console: logger } = require('../utils/logger')

const chance = new Chance()
const { subjectNames, teacherCount, studentCount, classCount, markCount } = config.get('database.seed')

// Seed functions
async function seedSubjects() {
  const { rows: existing, count } = await Subject.findAndCountAll()
  if (count) {
    logger.info('Subjects already exists, skip seed')
    return existing
  }

  const models = []
  logger.info(`Seeding ${subjectNames.length} subjects`)

  for (let i = 0; i < subjectNames.length; i++) {
    models.push({ name: subjectNames[i] })
  }

  const subjects = await Subject.bulkCreate(models, {returning: true})
    .catch(reason => logger.error(`Failed to create subjects: ${reason}`))

  logger.info(`${subjects.length} subjects seed`)
  return subjects
}

async function seedClasses(seedCount) {
  const { rows: existing, count } = await Class.findAndCountAll()
  if (count) {
    logger.info('Classes already exists, skip seed')
    return existing
  }

  const models = []
  logger.info(`Seeding ${seedCount} classes`)

  for (let i = 0; i < seedCount; i++) {
    const number = 1 + Math.floor(Math.random() * 10)
    const letter = String.fromCharCode(65 + Math.floor(Math.random() * 5))
    models.push({ name: `${number} ${letter}` })
  }

  const classes = await Class.bulkCreate(models, {returning: true})
    .catch(reason => logger.error(`Failed to create classes: ${reason}`))

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

  const models = []
  logger.info(`Seeding ${seedCount} teachers`)

  for (let i = 0; i < seedCount; i++) {
    const subject = (i >= subjects.length) ? randomElement(subjects) : subjects[i]
    models.push({
      user_id: users[i].id,
      subject_id: subject.id
    })
  }

  const teachers = await Teacher.bulkCreate(models, {returning: true})
    .catch(reason => logger.error(`Failed to create teacher: ${reason}`))

  logger.info(`${teachers.length} teachers seed`)
  return teachers
}

async function seedStudents(seedCount, classes) {
  const { rows: existing, count } = await Student.findAndCountAll()
  if (count) {
    logger.info('Students already exists, skip seed')
    return existing
  }

  const users = await seedUsers(seedCount)

  const models = []
  logger.info(`Seeding ${seedCount} students`)

  for (let i = 0; i < Math.min(users.length, seedCount); i++) {
    const clazz = randomElement(classes)
    models.push({
      user_id: users[i].id,
      class_id: clazz.id
    })
  }

  const students = await Student.bulkCreate(models, {returning: true})
    .catch(reason => logger.error(`Failed to create a student: ${reason}`))

  logger.info(`${students.length} students seed`)
  return students
}

async function seedTeachersToClasses(teachers, classes) {
  const { rows: existing, count } = await TeachersToClasses.findAndCountAll()
  if (count > 0) {
    logger.info('Teacher to class already exists, skip seed')
    return existing
  }

  const models = []
  logger.info(`Seeding teacher to class`)

  const subjectToTeachers = teachers.reduce((map, teacher) => {
    (map[teacher['subject_id']] = map[teacher['subject_id']] || []).push(teacher)
    return map
  }, {})

  for (let clazz of classes) {
    for (let subject of Object.keys(subjectToTeachers)) {
      const subjectTeachers = subjectToTeachers[subject]
      models.push({
        teacher_id: randomElement(subjectTeachers).id,
        class_id: clazz.id
      })
    }
  }

  const teachersToClasses = await TeachersToClasses.bulkCreate(models, {returning: true})
    .catch(reason => logger.error(`Failed to create a teachers to classes: ${reason}`))

  logger.info(`${teachersToClasses.length} teachers to classes seed`)
  return teachersToClasses
}

async function seedMarks(seedCount, subjects, classes, students, teachers) {
  const { rows: existing, count } = await Mark.findAndCountAll()
  if (count) {
    logger.info('Marks already exists, skip seed')
    return existing
  }

  const models = []
  logger.info(`Seeding ${seedCount} marks`)

  for (let i = 0; i < seedCount; i++) {
    const student = randomElement(students)
    const clazz = classes.find(it => it.id === student.class_id)
    const classTeachers = teachers.filter(it => it.class_id === clazz.teacher_id)
    const teacher = randomElement(classTeachers)
    const subject = subjects.find(it => it.id === teacher.subject_id)

    models.push({
      value: Math.random() * 5,
      date: chance.date({ year: 2018 }),
      subject_id: subject.id,
      student_id: student.id,
      teacher_id: teacher.id
    })
  }

  const marks = await Mark.bulkCreate(models, {returning: true})
    .catch(reason => logger.error(`Failed to create a mark: ${reason}`))

  logger.info(`${marks.length} marks seed`)
  return marks
}

async function seedUsers(seedCount) {
  const models = []
  logger.info(`Seeding ${seedCount} users`)

  for (let i = 0; i < seedCount; i++) {
    models.push({
      name: chance.name(),
      address: chance.address(),
      phone: chance.phone({ country: 'us', mobile: true })
    })
  }

  const users = await User.bulkCreate(models, {returning: true})
    .catch(reason => logger.error(`Failed to create a user: ${reason}`))

  logger.info(`${users.length} users seed`)
  return users
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
  const classes = await seedClasses(classCount)
  if (classes.length === 0) {
    throw new Error('Unable to seed classes')
  }
  const teachers = await seedTeachers(teacherCount, subjects)
  if (teachers.length === 0) {
    throw new Error('Unable to seed teachers')
  }
  const students = await seedStudents(studentCount, classes)
  if (students.length === 0) {
    throw new Error('Unable to seed teachers')
  }
  const teachersToClasses = await seedTeachersToClasses(teachers, classes)
  if (teachersToClasses.length === 0) {
    throw new Error('Unable to seed teachers to classes')
  }
  const marks = await seedMarks(markCount, subjects, classes, students, teachers)
  if (marks.length === 0) {
    throw new Error('Unable to seed marks')
  }
}
