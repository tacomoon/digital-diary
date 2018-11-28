'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface
    .createTable('classes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
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
    .then(() => queryInterface
      .addIndex('classes', { name: 'i_class__name', fields: ['name'] })
    )
    .then(() => queryInterface
      .addColumn('students', 'class_id', {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'classes',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'restrict',
      })
    ),

  down: (queryInterface) => queryInterface
    .removeColumn('students', 'class_id')
    .then(() => queryInterface.removeIndex('classes', 'i_class__name'))
    .then(() => queryInterface.dropTable('classes', {}))
}
