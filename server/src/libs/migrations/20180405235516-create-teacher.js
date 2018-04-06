'use strict';
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
            userId: {
                type: Sequelize.INTEGER,
                onDelete: 'CASCADE',
                references: {
                    model: 'Users',
                    key: 'id',
                    as: 'UserId'
                }
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Teachers', {});
    }
};