const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require("bcrypt");
const sequelize = require('../database/index');

const User = sequelize.define('user', {
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING,
        validate: {
          isEmail: {
            args: true,
            msg: 'E-mail inválido'
          }
        },
    },
    image: {
        type: Sequelize.INTEGER
    },
    password: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: {
            msg: "Esse campo não pode ser vazio"
          },
          len: {
            args: [6]
          }
        }
    },
    password_reset_token: {
        type: Sequelize.STRING
    },
    score: {
        type: Sequelize.INTEGER
    },
}, {
    hooks:{
        beforeCreate: async (user) => {
            user.password = await bcrypt.hash(user.password, bcrypt.genSaltSync(8));
            return user.password; 
        },
        beforeBulkUpdate: async (user) => {
            if(user.attributes.password){
                user.attributes.password = await bcrypt.hash(user.attributes.password, bcrypt.genSaltSync(8));
                return user.attributes.password; 
            }
        },
    },
    defaultScope: {
      attributes: { exclude: ['password', 'password_reset_token'] }
    }
});

module.exports = User;