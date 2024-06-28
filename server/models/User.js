const { Model } = require("sequelize");

module.exports = function (sequelize, DataTypes) {
    class User extends Model {}

    User.init(
        {
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            refreshToken: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            rappel: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: true,
            },
            role: {
                type: DataTypes.ENUM("admin", "user"),
                defaultValue: "user",
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            weight: {
                type: DataTypes.INTEGER,  
                allowNull: true,       
            },
            height: {
                type: DataTypes.INTEGER,  
                allowNull: true,
                
            },
            age: {
                type: DataTypes.INTEGER,  
                allowNull: true,       
            },
            sexe: {
                type: DataTypes.STRING,  
                allowNull: true,       
            },
        },
        {
            sequelize,
            modelName: "User",
        }
    );

    return User;
};
