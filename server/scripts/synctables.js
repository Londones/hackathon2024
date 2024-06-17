const User = require("../models/User");
require("dotenv").config();

const sequelize = require("../config/sequelizeConfig");

async function syncTables() {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
        await User.sync({ force: true });
        console.log("All models were synchronized successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    } finally {
        await sequelize.close();
    }
}

syncTables();
