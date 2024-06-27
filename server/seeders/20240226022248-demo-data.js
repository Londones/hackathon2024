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
                    age : Math.floor(Math.random() * (70 - 25 + 1) + 25), // age beetwen 25 and 70
                    height : Math.floor(Math.random() * (190 - 150 + 1) + 150), // height beetwen 150 and 190 cm,
                    weight : Math.floor(Math.random() * (90 - 60 + 1) + 60), // weight beetwen 60 and 90 kg,
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
                    age : Math.floor(Math.random() * (70 - 25 + 1) + 25), // age beetwen 25 and 70
                    height : Math.floor(Math.random() * (190 - 150 + 1) + 150), // height beetwen 150 and 190 cm,
                    weight : Math.floor(Math.random() * (90 - 60 + 1) + 60), // weight beetwen 60 and 90 kg,
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
                    age : Math.floor(Math.random() * (70 - 25 + 1) + 25), // age beetwen 25 and 70
                    height : Math.floor(Math.random() * (190 - 150 + 1) + 150), // height beetwen 150 and 190 cm,
                    weight : Math.floor(Math.random() * (90 - 60 + 1) + 60), // weight beetwen 60 and 90 kg,
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
