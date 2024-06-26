const { Model } = require("sequelize");

module.exports = function (sequelize, DataTypes) {
    class Rappel extends Model {
        static associate(models) {
            Rappel.belongsTo(models.User, {
                foreignKey: "userID",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
            models.User.hasMany(Rappel, {
                foreignKey: "userID",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
        }
    }

    Rappel.init(
        {
            userID: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "Users",
                    key: "id",
                },
            },
            frequence: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            heure: {
                type: DataTypes.TIME,
                allowNull: false,
            },
            maladie: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "Rappel",
        }
    );

    return Rappel;
};
