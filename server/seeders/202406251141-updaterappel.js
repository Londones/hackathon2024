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
        const rappelData = [];

        rappelData.push({
            userID: 1,
            frequence: 30, // Monthly
            heure: "08:00:00+02", // 8 AM
            maladie: "Hypertension", // Assuming reminders are for Diabete
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        rappelData.push({
            userID: 2,
            frequence: 1, // Daily
            heure: "14:00:00+02", //
            maladie: "Hypertension", // Assuming reminders are for Hypertension
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        // Insert data into tables
        await queryInterface.bulkInsert("Rappels", rappelData, {});
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete("Rappels", null, {});
    },
};
