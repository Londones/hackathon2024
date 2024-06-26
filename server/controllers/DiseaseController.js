const moment = require("moment"); // For handling dates and times
const { Rappel, User, Hypertension, Diabete } = require("../models");

const DiseaseController = {
    async findUsersToNotify() {
        // check the users table to find users with rappel column to true and return both the user and rappel data
        const usersWithRappel = await User.findAll({
            where: { rappel: true },
            include: Rappel,
        });

        let usersToNotify = [];

        for (const user of usersWithRappel) {
            const userId = user.id;
            for (const rappel of user.Rappels) {
                const frequency = rappel.frequence; // Frequency in days
                const rappelTime = rappel.heure; // Rappel time in hours (e.g., 14 for 2 PM)
                const diseaseName = rappel.maladie; // Disease name from the rappel
                const DiseaseModel = getDiseaseModel(diseaseName); // Assuming a function that maps disease names to their respective models
                const message = `Avez-vous oublié de saisir vos données de santé aujourd'hui pour ${diseaseName} ?`;

                // Find the most recent data entry for this user in the specific disease table
                const lastEntry = await DiseaseModel.findOne({
                    where: { userID: userId },
                    order: [["date", "DESC"]],
                });

                const currentTime = moment();
                const rappelTimeParts = rappelTime.split(":"); // Split the heure string into parts
                const rappelTimeToday = moment()
                    .hours(rappelTimeParts[0])
                    .minutes(rappelTimeParts[1])
                    .seconds(rappelTimeParts[2]);
                const isPastRappelTime = currentTime.isAfter(rappelTimeToday);

                if (lastEntry) {
                    console.log("last entry: ", lastEntry.date);
                    // change lastEnty to two days ago for testing
                    const lastEntryDate = moment().subtract(2, "days");
                    //const lastEntryDate = moment(lastEntry.date);
                    const daysSinceLastEntry = currentTime.diff(lastEntryDate, "days");

                    const phoneNumberWithoutPlus = user.phone.replace("+", ""); // Remove the plus sign

                    if (daysSinceLastEntry >= frequency && isPastRappelTime) {
                        usersToNotify.push({
                            userId: userId,
                            firstame: user.firstName,
                            lastname: user.name,
                            phone: phoneNumberWithoutPlus,
                            message: message,
                        });
                    }
                } else if (isPastRappelTime) {
                    usersToNotify.push({
                        userId: userId,
                        firstname: user.firstName,
                        lastname: user.name,
                        phone: phoneNumberWithoutPlus,
                        message: message,
                    });
                }
            }
        }

        return usersToNotify;
    },

    async saveDisease(req, res) {
        try {
            const { diseaseName } = req.params;
            const DiseaseModel = getDiseaseModel(diseaseName);

            if (!DiseaseModel) {
                return res.status(404).send({
                    error: "Disease not found",
                });
            }

            const { userID, date, confirmUpsert, ...data } = req.body;

            // Check for existing data for the given date
            const existingEntry = await DiseaseModel.findOne({
                where: { userID: userID, date: date },
            });

            if (existingEntry && !confirmUpsert) {
                // If data exists and there's no confirmation to upsert, warn the user
                if (res) {
                    return res.status(409).send({
                        warning: "Data for this date already exists. Do you want to overwrite it?",
                    });
                } else {
                    return;
                }
            }

            // Upsert data
            const newOrUpdatedEntry = await DiseaseModel.upsert(
                {
                    userID: userID,
                    date: date,
                    ...data,
                },
                {
                    returning: true, // This option is necessary to get the updated/created entry back
                }
            );
            if (res) res.status(200).send(newOrUpdatedEntry);
        } catch (error) {
            if (res) {
                res.status(500).send({
                    error: "An error occurred while saving the disease data",
                });
            } else {
                throw error;
            }
        }
    },
};

// Placeholder for a function that maps disease names to their respective models
function getDiseaseModel(diseaseName) {
    switch (diseaseName.toLowerCase()) {
        case "diabete":
            return Diabete;
        case "hypertension":
            return Hypertension;
        default:
            return null;
    }
}

module.exports = DiseaseController;
