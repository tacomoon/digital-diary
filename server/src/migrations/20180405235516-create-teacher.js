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
      fk_user: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'fk_user'
        }
      },
      fk_subject: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Subjects',
          key: 'id',
          as: 'fk_subject'
        }
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Teachers', {})
  }
}
