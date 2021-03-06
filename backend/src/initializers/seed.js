'use strict'

const Chance = require('chance')
const { Users, Teachers, Students, Subjects, Classes, Marks } = require('../models')

const config = require('config')
const sequelize = require('../utils/sequelize')
const { console: logger } = require('../utils/loggers')

const chance = new Chance()
const { subjectNames, teacherCount, studentCount, classCount, markCount } = config.get('database.seed')

// Seed functions
async function seedSubjects() {
  const { rows: existing, count } = await Subjects.findAndCountAll()
  if (count) {
    logger.info('Subjects already exists, skip seed')
    return existing
  }

  const models = []
  logger.info(`Seeding ${subjectNames.length} subjects`)

  for (let i = 0; i < subjectNames.length; i++) {
    models.push({ name: subjectNames[i] })
  }

  const subjects = await Subjects.bulkCreate(models, { returning: true })
    .catch(reason => logger.error(`Failed to create subjects: ${reason}`))

  logger.info(`${subjects.length} subjects seed`)
  return subjects
}

async function seedClasses(seedCount) {
  const { rows: existing, count } = await Classes.findAndCountAll()
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

  const classes = await Classes.bulkCreate(models, { returning: true })
    .catch(reason => logger.error(`Failed to create classes: ${reason}`))

  logger.info(`${classes.length} classes seed`)
  return classes
}

async function seedTeachers(seedCount, subjects) {
  const { rows: existing, count } = await Teachers.findAndCountAll()
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

  const teachers = await Teachers.bulkCreate(models, { returning: true })
    .catch(reason => logger.error(`Failed to create teacher: ${reason}`))

  logger.info(`${teachers.length} teachers seed`)
  return teachers
}

async function seedStudents(seedCount, classes) {
  const { rows: existing, count } = await Students.findAndCountAll()
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

  const students = await Students.bulkCreate(models, { returning: true })
    .catch(reason => logger.error(`Failed to create a student: ${reason}`))

  logger.info(`${students.length} students seed`)
  return students
}

async function seedMarks(seedCount, subjects, classes, students, teachers) {
  const { rows: existing, count } = await Marks.findAndCountAll()
  if (count) {
    logger.info('Marks already exists, skip seed')
    return existing
  }

  const models = []
  logger.info(`Seeding ${seedCount} marks`)

  // language=SQL
  const [teacher_to_class] = await sequelize.query('SELECT teacher_id, class_id FROM teachers_to_classes')

  for (let i = 0; i < seedCount; i++) {
    const student = randomElement(students)
    const clazz = classes.find(it => it.id === student.class_id)
    const filtered = teacher_to_class.filter(it => it.class_id === clazz.id).map(it => it.teacher_id)
    const teacher = randomElement(teachers.filter(it => filtered.includes(it.id)))
    const subject = subjects.find(it => it.id === teacher.subject_id)

    models.push({
      value: Math.random() * 5,
      date: chance.date({ year: 2018 }),
      subject_id: subject.id,
      student_id: student.id,
      teacher_id: teacher.id
    })
  }

  const marks = await Marks.bulkCreate(models, { returning: true })
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

  const users = await Users.bulkCreate(models, { returning: true })
    .catch(reason => logger.error(`Failed to create a user: ${reason}`))

  logger.info(`${users.length} users seed`)
  return users
}

async function seedTeachersToClasses(teachers, classes) {
  // language=SQL
  const [[{ count }]] = await sequelize.query('SELECT count(*) FROM teachers_to_classes')
  if (count > 0) {
    logger.info('Teacher to class already exists, skip seed')
    return
  }

  logger.info(`Seeding teacher to class`)

  let sql = 'INSERT INTO teachers_to_classes VALUES'
  const subjectToTeachers = groupBy(teachers, 'subject_id')

  let counter = 0
  for (let clazz of classes) {
    for (let subject of Object.keys(subjectToTeachers)) {
      if (counter !== 0) {
        sql += ','
      }
      sql += ` (${randomElement(subjectToTeachers[subject]).id}, ${clazz.id}, now(), now())`
      counter++
    }
  }

  await sequelize.query(sql)
  logger.info(`${counter} teachers to classes seed`)
  return counter
}

// Utils
function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)]
}

function groupBy(collection, field) {
  const transformer = (map, teacher) => {
    (map[teacher[field]] = map[teacher[field]] || []).push(teacher)
    return map
  }
  return collection.reduce(transformer, {})
}

module.exports = async () => {
  logger.info("Database initialization started")

  const subjects = await seedSubjects()
  if (subjects.length <= 0) {
    throw new Error('Unable to seed subjects')
  }
  const classes = await seedClasses(classCount)
  if (classes.length <= 0) {
    throw new Error('Unable to seed classes')
  }
  const teachers = await seedTeachers(teacherCount, subjects, classes)
  if (teachers.length <= 0) {
    throw new Error('Unable to seed teachers')
  }
  const students = await seedStudents(studentCount, classes)
  if (students.length <= 0) {
    throw new Error('Unable to seed teachers')
  }
  const teachersToClasses = await seedTeachersToClasses(teachers, classes)
  if (teachersToClasses <= 0) {
    throw new Error('Unable to seed teachers to classes')
  }
  const marks = await seedMarks(markCount, subjects, classes, students, teachers)
  if (marks.length <= 0) {
    throw new Error('Unable to seed marks')
  }

  logger.info("Database initialization done")
}
