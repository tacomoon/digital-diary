'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Students', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      UserId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'UserId'
        }
      },
      ClassId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Classes',
          key: 'id',
          as: 'ClassId'
        }
      }
    })
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('Students', {})
  }
}
