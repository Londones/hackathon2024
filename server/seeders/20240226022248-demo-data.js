"use strict";

const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */

        await queryInterface.bulkInsert(
            "Users",
            [
                {
                    firstName: "user1",
                    name: "Doe",
                    username: "username1",
                    email: "user1@gmail.com",
                    password: bcrypt.hashSync("password", 10),
                    role: "user",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    firstName: "user2",
                    name: "Doe",
                    username: "username2",
                    email: "user2@gmail.com",
                    password: bcrypt.hashSync("password", 10),
                    role: "user",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    firstName: "admin",
                    name: "admin",
                    username: "admin",
                    email: "admin@gmail.com",
                    password: bcrypt.hashSync("password", 10),
                    role: "admin",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete("Users", null, {});
    },
};
