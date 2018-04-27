'use strict'

const Chance = require('chance')
const { User, Teacher, Subject } = require('../models')

const config = require('config')
const sequelize = require('../utils/sequelize')
const chance = new Chance()

const subjectNames = ['Maths', 'Science', 'Information Technology',
  'Physical Education', 'History', 'Music', 'Art', 'English', 'Geography']

const initializerSeed = async () => {
  const { teacherSeedCount } = config.get('db.seed')

  console.log('Seed -> started')

  const { rows: allSubjects, count: allSubjectsCount } = await Subject.findAndCountAll()
  const { rows: allUsers, count: allUsersCount } = await User.findAndCountAll()
  const { rows: allTeachers, count: allTeachersCount } = await Teacher.findAndCountAll()

  await sequelize.transaction(async function (transaction) {
    const subjects = await seedSubjects(transaction)
    const teachers = await seedTeachers(teacherSeedCount, subjects, transaction)
  })

  console.log('Seed -> done')

  async function seedSubjects (transaction) {
    if (allSubjectsCount) {
      console.log('Subjects already exists -> skip seed')
      return allSubjects
    }

    const subjects = []
    for (let i = 0; i < subjectNames.length; i++) {
      const subject = await Subject.create({
        name: subjectNames[i]
      }, { transaction })

      subjects.push(subject)
    }
    return subjects
  }

  async function seedUsers (seedCount, transaction) {
    if (allUsersCount) {
      console.log('Users already exists -> skip seed')
      return allUsers
    }

    const users = []
    for (let i = 0; i < seedCount; i++) {
      const user = await User.create({
        name: chance.name(),
        address: chance.address(),
        phone: chance.phone({ country: 'us', mobile: true })
      }, { transaction })

      users.push(user)
    }
    return users
  }

  async function seedTeachers (seedCount, subjects, transaction) {
    if (allTeachersCount) {
      console.log('Teachers already exists -> skip seed')
      return allTeachers
    }

    const users = await seedUsers(teacherSeedCount, transaction)
    const teachersCount = Math.max(seedCount, users.length)

    const teachers = []
    for (let i = 0; i < teachersCount; i++) {
      const randomSubject = subjects[Math.floor(Math.random() * subjects.length)]

      const teacher = Teacher.build({})
      teacher.setUser(users[i], { save: false })
      teacher.setSubject(randomSubject, { save: false })

      await teacher.save({ transaction })
      teachers.push(teacher)
    }
    return teachers
  }
}

module.exports = initializerSeed
