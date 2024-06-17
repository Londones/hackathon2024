const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("hackathon2024", "postgres", "password", {
    host: "db",
    dialect: "postgres",
    logging: console.log,
});

module.exports = sequelize;
