'use strict'

const sequelize = require('../utils/sequelize')

const initializerModels = async () => {
  console.log('Models initialization -> started')

  require('../models');
  await sequelize.sync()

  console.log('Sequelize initialization -> done')
}

module.exports = initializerModels