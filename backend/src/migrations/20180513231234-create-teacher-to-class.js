'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface
    .createTable('teachers_to_classes', {
        teacher_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'teachers',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'restrict',
        },
        class_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'classes',
            key: 'id'
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
      }
    )
    .then(() => queryInterface
      .addConstraint('teachers_to_classes', ['teacher_id', 'class_id'], {
        name: 'teachers_to_classes__constrain_pk',
        type: 'primary key'
      })
    ),

  down: (queryInterface) => queryInterface
    .removeConstraint('teachers_to_classes', 'teachers_to_classes__constrain_pk')
    .then(() => queryInterface.dropTable('teachers_to_classes', {}))
}
