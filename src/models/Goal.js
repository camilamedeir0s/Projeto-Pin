const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require("bcrypt");
const sequelize = require('../database/index');

const Goal = sequelize.define('goal', {
    user_id: {type: Sequelize.INTEGER},
    title: {type: Sequelize.STRING},
    description: {type: Sequelize.TEXT},
    value: {type: Sequelize.INTEGER},
    is_complete: {type: Sequelize.BOOLEAN}
});

module.exports = Goal;