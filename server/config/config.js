require("dotenv").config();

module.exports = {
  development: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    host: process.env.POSTGRES_HOST,
    dialect: "postgres",
  },
  docker: {
    username: "postgres",
    password: "password",
    database: "hackathon2024",
    host: "db",
    dialect: "postgres",
  },
};
