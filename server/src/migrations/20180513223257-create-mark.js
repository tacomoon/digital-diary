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
      fk_subject: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Subjects',
          key: 'id',
          as: 'fk_subject'
        }
      },
      fk_student: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Students',
          key: 'id',
          as: 'fk_student'
        }
      },
      fk_teacher: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Teachers',
          key: 'id',
          as: 'fk_teacher'
        }
      }
    })
      .then(() => queryInterface.addIndex('Marks', ['date']))
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeIndex('Marks', ['date'])
      .then(() => queryInterface.dropTable('Marks'))
  }
}
