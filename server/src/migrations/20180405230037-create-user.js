'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      address: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
      .then(() => queryInterface.addIndex('Users', ['name']))
      .then(() => queryInterface.addIndex('Users', ['phone']))
  },
  down: (queryInterface) => queryInterface.removeIndex('Users', ['phone'])
    .then(() => queryInterface.removeIndex('Users', ['name']))
    .then(() => queryInterface.dropTable('Users', {}))
}
