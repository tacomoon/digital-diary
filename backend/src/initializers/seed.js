'use strict'

const Chance = require('chance')
const { User, Teacher } = require('../models')

const config = require('config')
const sequelize = require('../utils/sequelize')
const { console: logger } = require('../utils/logger')

const chance = new Chance()

const subjectNames = ['Maths', 'Science', 'Information Technology',
  'Physical Education', 'History', 'Music', 'Art', 'English', 'Geography']

const { teachers: teachersCount, students: studentsCount } = config.get('database.seed')

module.exports = async () => {
  const { rows: existing, count } = await Teacher.findAndCountAll()

  await sequelize
    .transaction(async transaction => {
      await seedTeachers(teachersCount, transaction)
    })

  async function seedTeachers(seedCount, transaction) {

    if (count) {
      logger.info('Teachers already exists, skip teachers seed')
      return existing
    }

    logger.info(`Seeding ${seedCount} users for teachers`)
    const users = await seedUsers(seedCount, transaction)

    const teachers = []
    for (let i = 0; i < seedCount; i++) {
      const teacher = Teacher.build({})
      teacher.setUser(users[i], { save: false })
      await teacher.save({ transaction }
      )
      teachers.push(teacher)
    }

    return teachers
  }

  async function seedUsers(seedCount, transaction) {
    const users = []
    for (let i = 0; i < seedCount; i++) {
      const user = await User.create(
        {
          name: chance.name(),
          address: chance.address(),
          phone: chance.phone({ country: 'us', mobile: true })
        },
        { transaction }
      )

      users.push(user)
    }

    return users
  }
}
