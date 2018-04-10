'use strict';

const path = require('path');

module.exports = {
    "config": path.resolve('./config', 'config.json'),
    "models-path": path.resolve('./models'),
    "seeders-path": path.resolve('./seeders'),
    "migrations-path": path.resolve('./migrations')
};

// const env = 'development';
// const config = require('../config/config.json')[env];
// const Sequelize = require('sequelize');
//
// module.export = new Sequelize(config.database, config.username, config.password, config);