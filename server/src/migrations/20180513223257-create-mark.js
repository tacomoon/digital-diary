'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Marks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      value: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      SubjectId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Subjects',
          key: 'id',
          as: 'SubejctId'
        }
      },
      StudentId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Students',
          key: 'id',
          as: 'StudentId'
        }
      },
      TeacherId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Teachers',
          key: 'id',
          as: 'TeacherId'
        }
      }
    })
      .then(() => queryInterface.addIndex('Marks', ['date']))
  },
  down: (queryInterface) => queryInterface.removeIndex('Marks', ['date'])
    .then(() => queryInterface.dropTable('Marks'))
}
