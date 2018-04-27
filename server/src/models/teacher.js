'use strict';

const sequelize = require('../utils/sequelize');

const User = require('./user');
const Subject = require('./subject');

const schema = {};

const Teacher = sequelize.define('Teacher', schema);
Teacher.belongsTo(User, {
    onDelete: 'CASCADE'
});
Teacher.belongsTo(Subject);

module.exports = Teacher;