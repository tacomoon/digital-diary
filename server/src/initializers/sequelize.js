'use strict'

const sequelize = require('../utils/sequelize')

const initializerSequelize = async () => {
  console.log('Sequelize initialization -> started')

  await sequelize.authenticate()

  console.log('Sequelize initialization -> done')
}

module.exports = initializerSequelize
