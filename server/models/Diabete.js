const { Model } = require("sequelize");

module.exports = function (sequelize, DataTypes) {
    class Diabete extends Model {
        static associate(models) {
            Diabete.belongsTo(models.User, {
                foreignKey: "userID",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
            models.User.hasMany(Diabete, {
                foreignKey: "userID",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
        }
    }

    Diabete.init(
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
            glycemie: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "Diabete",
        }
    );

    return Diabete;
};
