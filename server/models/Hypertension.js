const { Model } = require("sequelize");

module.exports = function (sequelize, DataTypes) {
    class Hypertension extends Model {
        static associate(models) {
            Hypertension.belongsTo(models.User, {
                foreignKey: "userID",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
            models.User.hasMany(Hypertension, {
                foreignKey: "userID",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
        }
    }

    Hypertension.init(
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
            systolic: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            diastolic: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "Hypertension",
        }
    );

    return Hypertension;
};
