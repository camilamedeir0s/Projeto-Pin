require("dotenv").config();

module.exports = {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    username: 'postgres',
    password: process.env.DB_PASS,
    database: process.env.DB,
    define:{
        timestamps: true,
        underscored: true,
    },
}
