"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "Alerts",
            [
                {
                    userID: 1,
                    date: new Date("2024-06-15T11:23:00.000Z"),
                    message: 'Votre glycémie est trop élevée, veuillez prendre vos médicaments.',
                    maladie: 'Diabete',
                    createdAt: new Date("2024-06-15T11:23:00.000Z"),
                    updatedAt: new Date("2024-06-15T11:23:00.000Z"),
                },
                {
                    userID: 1,
                    date: new Date("2024-01-01T11:23:00.000Z"),
                    message: 'Votre tension est trop élevée, veuillez prendre vos médicaments.',
                    maladie: 'Hypertension',
                    createdAt: new Date("2024-01-01T11:23:00.000Z"),
                    updatedAt: new Date("2024-01-01T11:23:00.000Z"),
                },
                {
                    userID: 1,
                    date: new Date("2024-06-16T11:23:00.000Z"),
                    message: 'Votre glycémie est trop élevée, veuillez prendre vos médicaments.',
                    maladie: 'Diabete',
                    createdAt: new Date("2024-06-16T11:23:00.000Z"),
                    updatedAt: new Date("2024-06-16T11:23:00.000Z"),
                },
                {
                    userID: 1,
                    date: new Date("2024-03-01T11:23:00.000Z"),
                    message: 'Votre tension est trop élevée, veuillez prendre vos médicaments.',
                    maladie: 'Hypertension',
                    createdAt: new Date("2024-03-01T11:23:00.000Z"),
                    updatedAt: new Date("2024-03-01T11:23:00.000Z"),
                },
                {
                    userID: 1,
                    date: new Date("2024-06-18T11:23:00.000Z"),
                    message: 'Votre glycémie est trop élevée, veuillez prendre vos médicaments.',
                    maladie: 'Diabete',
                    createdAt: new Date("2024-06-18T11:23:00.000Z"),
                    updatedAt: new Date("2024-06-18T11:23:00.000Z"),
                },
                {
                    userID: 1,
                    date: new Date("2024-04-30T11:23:00.000Z"),
                    message: 'Votre tension est trop élevée, veuillez prendre vos médicaments.',
                    maladie: 'Hypertension',
                    createdAt: new Date("2024-04-30T11:23:00.000Z"),
                    updatedAt: new Date("2024-04-30T11:23:00.000Z"),
                },
                {
                    userID: 1,
                    date: new Date("2024-06-21T11:23:00.000Z"),
                    message: 'Votre glycémie est trop élevée, veuillez prendre vos médicaments.',
                    maladie: 'Diabete',
                    createdAt: new Date("2024-06-21T11:23:00.000Z"),
                    updatedAt: new Date("2024-06-21T11:23:00.000Z"),
                },
                {
                    userID: 1,
                    date: new Date("2024-05-30T11:23:00.000Z"),
                    message: 'Votre tension est trop élevée, veuillez prendre vos médicaments.',
                    maladie: 'Hypertension',
                    createdAt: new Date("2024-05-30T11:23:00.000Z"),
                    updatedAt: new Date("2024-05-30T11:23:00.000Z"),
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Alerts", null, {});
    },
};