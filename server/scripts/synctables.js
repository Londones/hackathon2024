const { Sequelize, DataTypes } = require("sequelize");

require("dotenv").config();

const sequelize = new Sequelize(process.env.DATABASE_URL);

// Import model definition functions
const defineUser = require("../models/User");
const defineHypertension = require("../models/Hypertension");
const defineDiabete = require("../models/Diabete");
const defineRappel = require("../models/Rappel");
const defineMessage = require("../models/Message");
const defineAlert = require("../models/Alert");

// Instantiate models by calling the definition functions
const User = defineUser(sequelize, DataTypes);
const Hypertension = defineHypertension(sequelize, DataTypes);
const Diabete = defineDiabete(sequelize, DataTypes);
const Rappel = defineRappel(sequelize, DataTypes);
const Message = defineMessage(sequelize, DataTypes);
const Alert = defineAlert(sequelize, DataTypes);

async function syncTables() {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");

        // Now you can sync the models
        await User.sync({ force: true });
        await Hypertension.sync({ force: true });
        await Diabete.sync({ force: true });
        await Message.sync({ force: true });
        await Rappel.sync({ force: true });
        await Alert.sync({ force: true });

        console.log("All models were synchronized successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    } finally {
        await sequelize.close();
    }
}

syncTables();
