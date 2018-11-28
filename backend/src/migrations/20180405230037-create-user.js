'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface
    .createTable('users', {
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
      address: {
        allowNull: true,
        type: Sequelize.STRING
      },
      phone: {
        allowNull: true,
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
      .addIndex('users', { name: 'i_user__name', fields: ['name'] })
    )
    .then(() => queryInterface
      .addIndex('users', { name: 'i_user__phone', fields: ['phone'] })
    ),

  down: (queryInterface) => queryInterface
    .removeIndex('users', 'i_user_phone')
    .then(() => queryInterface
      .removeIndex('users', 'i_user__name')
    )
    .then(() => queryInterface
      .dropTable('users', {})
    )
}
