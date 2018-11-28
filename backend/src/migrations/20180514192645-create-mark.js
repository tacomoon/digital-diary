'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface
    .createTable('marks', {
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
      subject_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'subjects',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'restrict',
      },
      student_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'students',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'restrict',
      },
      teacher_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'teachers',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'restrict',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    })
    .then(() => queryInterface
      .addIndex('marks', { name: 'i_marks__date', fields: ['date'] })
    )
    .then(() => queryInterface
      .addIndex('marks', { name: 'i_marks__student_id', fields: ['student_id'] })
    )
    .then(() => queryInterface
      .addIndex('marks', { name: 'i_marks__teacher_id', fields: ['teacher_id'] })
    ),
  down: (queryInterface) => queryInterface
    .removeIndex('marks', 'i_marks__teacher_id')
    .then(() => queryInterface.removeIndex('marks', 'i_marks__student_id'))
    .then(() => queryInterface.removeIndex('marks', 'i_marks__date'))
    .then(() => queryInterface.dropTable('marks', {}))
}
