const User = require("../models/User");
const Hypertension = require("../models/Hypertension");
const Diabete = require("../models/Diabete");
const Rappel = require("../models/Rappel");
const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(`${process.env.DATABASE_URL}`);

async function syncTables() {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
        await User.sync({ force: true });
        await Hypertension.sync({ force: true });
        await Diabete.sync({ force: true });
        await Rappel.sync({ force: true });

        console.log("All models were synchronized successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    } finally {
        await sequelize.close();
    }
}

syncTables();
