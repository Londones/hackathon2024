 require("dotenv").config();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        // Assuming user IDs for user1 and user2 are 1 and 2 respectively
        const userIds = [1, 2];
        const startDate = new Date();
        const diabeteData = [];
        const hypertensionData = [];
        const rappelData = [];
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        let isAjeun = true;

        rappelData.push({
            userID: 1,
            frequence: 1, // Daily
            heure: "08:00:00+02", // 8 AM every day
            maladie: "Diabete", // Assuming reminders are for Diabete
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        rappelData.push({
            userID: 2,
            frequence: 30, // Monthly
            heure: "14:00:00+02", //
            maladie: "Diabete", // Assuming reminders are for Diabete
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        startDate.setDate(startDate.getDate() - 14);
        for (let day = 0; day < 14; day++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + day);

            userIds.forEach((userId) => {
                // Generate Diabete data
                diabeteData.push({
                    userID: userId,
                    date: date,
                    glycemie: Math.floor(Math.random() * (120 - 80 + 1) + 80), // Random glycemie between 80 and 120
                    isAjeun : isAjeun,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                });
                // Generate Rappel data (assuming daily reminders for simplicity)
            });
        }

        for (let month = 0; month <= currentMonth; month++) {
            const date = new Date(currentYear, month, 15);
        
            userIds.forEach((userId) => {
                // Generate Hypertension data
                hypertensionData.push({
                    userID: userId,
                    date: date,
                    systolic: Math.floor(Math.random() * (140 - 120 + 1) + 120), // Random systolic between 120 and 140
                    diastolic: Math.floor(Math.random() * (90 - 80 + 1) + 80), // Random diastolic between 80 and 90
                    createdAt: new Date(),
                    updatedAt: new Date(),
                });

                // Generate Rappel data (assuming daily reminders for simplicity)
                
                //juste to alternante beetween isAjeun and !isAjeun
                isAjeun = !isAjeun;
            });
        }    

        // Insert data into tables
        await queryInterface.bulkInsert("Diabetes", diabeteData, {});
        await queryInterface.bulkInsert("Hypertensions", hypertensionData, {});
        await queryInterface.bulkInsert("Rappels", rappelData, {});
    },

    async down(queryInterface, Sequelize) {
        // Remove inserted data (if needed, based on IDs or date range)
        await queryInterface.bulkDelete("Diabetes", null, {});
        await queryInterface.bulkDelete("Hypertensions", null, {});
        await queryInterface.bulkDelete("Rappels", null, {});
    },
};
