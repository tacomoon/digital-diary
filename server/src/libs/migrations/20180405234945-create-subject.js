'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Subjects', {
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
            }
        }).then(queryInterface.addIndex('Subjects', ['name']));
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Subjects', null);
    }
};