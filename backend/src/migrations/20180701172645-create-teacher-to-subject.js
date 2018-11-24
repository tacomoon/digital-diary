'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('TeacherToSubjects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fk_class: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      fk_teacher: {
        allowNull: false,
        type: Sequelize.INTEGER
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
      .then(() => queryInterface.addIndex('TeacherToSubjects', ['fk_class', 'fk_teacher']))
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeIndex('TeacherToSubjects', ['fk_class', 'fk_teacher'])
      .then(() => queryInterface.dropTable('TeacherToSubjects'))
  }
}
