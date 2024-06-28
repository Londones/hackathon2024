const { Model } = require("sequelize");

module.exports = function (sequelize, DataTypes) {
    class Message extends Model {
        static associate(models) {
            Message.belongsTo(models.User, {
                foreignKey: "userID",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
            models.User.hasMany(Message, {
                foreignKey: "userID",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
        }
    }

    Message.init(
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
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },

            messageType: {
                type: DataTypes.ENUM("info", "warning"),
                defaultValue: "info",
            },

        },
        {
            sequelize,
            modelName: "Message",
        }
    );

    return Message;
};
