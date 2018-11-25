'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface
    .createTable('subjects', {
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
      .addIndex('subjects', { name: 'i_subject__name', fields: ['name'] })
    )
    .then(() => queryInterface
      .addColumn('teachers', 'subject_id', {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'subjects',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'restrict',
        }
      )
    ),
  down: (queryInterface) => queryInterface
    .removeColumn('teachers', 'subject_id')
    .then(() => queryInterface.removeIndex('subjects', 'i_subject__name'))
    .then(() => queryInterface.dropTable('subjects', {}))
}
