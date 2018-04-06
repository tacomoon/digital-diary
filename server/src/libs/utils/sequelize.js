'use strict';

const env = 'development';
const config = require('../config/config.json')[env];
const Sequelize = require('sequelize');

module.export = new Sequelize(config.database, config.username, config.password, config);