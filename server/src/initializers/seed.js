'use strict'

const Chance = require('chance')
const {User, Teacher, Subject} = require('./models')

const config = require('config')
const sequelize = require('../utils/sequelize')
const chance = new Chance()

const subjectNames = ['Maths', 'Science', 'Information Technology',
  'Physical Education', 'History', 'Music', 'Art', 'English', 'Geography']

const initializerSeed = async () => {
  const {teacherSeedCount} = config.get('db.seed')

  console.log('Seed -> started')

  // //TODO async/await
  // await sequelize.transaction(async (transaction) => {
  //   const subjects = seedSubjects(transaction)
  //   const teachers = seedTeachers(teacherSeedCount, subjects, transaction)
  // })
  //
  // console.log('Seed -> done')
  //
  // function seedSubjects (transaction) {
  //   const allSubjects = Subject.findAndCountAll()
  //
  //   if (allSubjects) {
  //     console.log('Subjects already exists -> skip seed')
  //     return allSubjects
  //   }
  //
  //   const subjects = []
  //   subjectNames.forEach((subjectName) => {
  //     const subject = Subject.create({
  //       name: subjectName
  //     }, {transaction})
  //
  //     subject.save({transaction})
  //     subjects.put(subject)
  //   })
  //   return subjects
  // }
  //
  // function seedUsers (seedCount, transaction) {
  //   const allUsers = User.findAndCountAll()
  //
  //   if (allUsers) {
  //     console.log('Users already exists -> skip seed')
  //     return allUsers
  //   }
  //
  //   const users = []
  //   for (let i = 0; i < seedCount; i++) {
  //     const user = User.create({
  //       name: chance.name(),
  //       address: chance.address(),
  //       phone: chance.phone({country: 'ru', mobile: true})
  //     }, {transaction})
  //
  //     user.save({transaction})
  //     users.put(user)
  //   }
  //   return users
  // }
  //
  // function seedTeachers (seedCount, subjects, transaction) {
  //   const {allTeachers, count} = Teacher.findAndCountAll()
  //
  //   if (count) {
  //     console.log('Teachers already exists -> skip seed')
  //     return allTeachers
  //   }
  //
  //   const users = seedUsers(teacherSeedCount, transaction)
  //   const teachersCount = Math.max(seedCount, users.length)
  //
  //   const teachers = []
  //   for (let i = 0; i < teachersCount; i++) {
  //     const teacher = Teacher.build({})
  //     teacher.setUser(users[i])
  //     teacher.setSubject(Math.floor(Math.random() * subjects.length))
  //
  //     teacher.save({transaction})
  //     teachers.put(teachers)
  //   }
  //   return teachers
  // }

  console.log('Seed -> done')
}

module.exports = initializerSeed
