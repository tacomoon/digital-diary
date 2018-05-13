'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Teachers', {
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
      SubjectId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Subjects',
          key: 'id',
          as: 'SubjectId'
        }
      }
    })
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('Teachers', {})
  }
}
