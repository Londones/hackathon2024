const { Model } = require("sequelize");

module.exports = function (sequelize, DataTypes) {
    class Alert extends Model {
        static associate(models) {
            Alert.belongsTo(models.User, {
                foreignKey: "userID",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
            models.User.hasMany(Alert, {
                foreignKey: "userID",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
        }
    }

    Alert.init(
        {
            userID: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "Users",
                    key: "id",
                },
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            message: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            maladie: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "Alerts",
        }
    );

    return Alert;
};
