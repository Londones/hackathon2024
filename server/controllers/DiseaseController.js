const moment = require("moment"); // For handling dates and times
const { Rappel, User, Hypertension, Diabete } = require("../models");
const { Op } = require('sequelize');

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

            const utcDate = moment(date).utc().format();

            // Check for existing data for the given date
            const existingEntry = await DiseaseModel.findOne({
                where: { userID: userID, date: utcDate },
            });

            if (existingEntry && !confirmUpsert) {
                // If data exists and there's no confirmation to upsert, warn the user
                if (res) {
                    return res.status(409).send({
                        warning: "Des données pour cette date existent déjà. Voulez-vous les remplacer ?",
                    });
                } else {
                    return;
                }
            }

            let returnPhrase = "";
            // Upsert data
            if (existingEntry) {
                // Update existing entry
                await DiseaseModel.update(
                    {
                        date: utcDate,
                        ...data,
                    },
                    {
                        where: { id: existingEntry.id },
                    }
                );
                returnPhrase = "Données mises à jour avec succès";
            } else {
                // Create new entry
                await DiseaseModel.create({
                    userID: userID,
                    date: utcDate,
                    ...data,
                });
                returnPhrase = "Données enregistrées avec succès";
            }

            if (res) res.status(201).send({ message: returnPhrase });
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

    async getUserDiseaseData(req, res) {
        try {
            const { userId, diseaseName } = req.params;
    
            if (diseaseName == 'diabete') {
                return this.getUserDiabeteDataLast10Days(req, res);
            }
    
            if (diseaseName == 'hypertension') {
                return this.getUserHyperTensionDataThisYear(req, res);
            }
    
            const DiseaseModel = getDiseaseModel(diseaseName);
    
            if (!DiseaseModel) {
                return res.status(404).send({
                    error: "Disease not found",
                });
            }
    
            const data = await DiseaseModel.findAll({
                where: { userID: userId },
                order: [["date", "ASC"]],
            });
    
            res.status(200).send(data);
        }
        catch (error) {
            res.status(500).send({
                error: "An error occurred while fetching the disease data",
            });
        }
    },

    async getUserDiabeteDataLast10Days(req, res) {
        try {
            const { userId } = req.params;
            const DiseaseModel = getDiseaseModel('diabete');

            const date = moment().subtract(10, 'days').toDate();

            const data = await DiseaseModel.findAll({
                where: { 
                    userID: userId,
                    date: {
                        [Op.gte]: date
                    }
                },
                order: [["date", "ASC"]],
            });

            res.status(200).send(data);
        } catch (error) {
            res.status(500).send({
                error: "An error occurred while fetching the disease data",
            });
        }
    },
    
    async getUserHyperTensionDataThisYear(req, res) {
        try {
            const { userId } = req.params;
            const DiseaseModel = getDiseaseModel('hypertension');
    
            const date = moment().startOf('year').toDate();
    
            const data = await DiseaseModel.findAll({
                where: {
                    userID: userId,
                    date: {
                        [Op.gte]: date,
                    },
                },
            });
    
            res.status(200).send(data);
        } catch (error) {
            res.status(500).send({
                error: "An error occurred while fetching the disease data",
            });
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
