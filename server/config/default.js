'use strict'

const configDefault = {
  express: {
    port: 4000
  },
  db: {
    seed: {
      teacherSeedCount: 10
    },
    config: {
      database: 'digital-diary',
      username: 'eugene.home',
      password: null,
      host: 'localhost',
      port: 5432,
      dialect: 'postgres'
    }
  }
}

module.exports = configDefault