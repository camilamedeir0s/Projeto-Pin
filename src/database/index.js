const Sequelize = require('sequelize');
const db = require('../config/database');

const connection = new Sequelize(db);

module.exports = connection;
