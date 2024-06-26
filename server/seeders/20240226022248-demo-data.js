"use strict";

const bcrypt = require("bcrypt");
require("dotenv").config();

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
                    email: "user1@gmail.com",
                    password: bcrypt.hashSync("password", 10),
                    role: "user",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    phone: process.env.PHONE,
                    rappel: true,
                },
                {
                    firstName: "user2",
                    name: "Doe",
                    email: "user2@gmail.com",
                    password: bcrypt.hashSync("password", 10),
                    role: "user",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    phone: process.env.PHONE,
                    rappel: true,
                },
                {
                    firstName: "admin",
                    name: "admin",
                    email: "admin@gmail.com",
                    password: bcrypt.hashSync("password", 10),
                    role: "admin",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    phone: process.env.PHONE,
                    rappel: true,
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
