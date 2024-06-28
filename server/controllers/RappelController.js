const { Rappel } = require("../models");

const RappelController = {
    async getUserRappels(req, res) {
        try {
            const { userId } = req.params;
            const rappel = await Rappel.findAll({
                where: { userID: userId },
            });

            res.status(200).send(rappel);
        } catch (error) {
            res.status(500).send({
                error: "An error occurred while fetching the rappel data",
            });
        }
    },

    async updateUserRappel(req, res) {
        try {
            const { userId } = req.params;
            const { maladie, frequence, heure } = req.body;
    
            await Rappel.update(
                { frequence: frequence, heure: heure },
                { where: { userID: userId, maladie: maladie } }
            );
    
            res.status(200).send({ message: "Rappel updated successfully" });
        } catch (error) {
            res.status(500).send({
                error: "An error occurred while updating the rappel",
            });
        }
    },

    async saveUserRappel(req, res) {
        try {
            const { userId } = req.params;
            const { maladie, frequence, heure } = req.body;
    
            const existingRappel = await Rappel.findOne({
                where: {
                    userID: userId,
                    maladie: maladie
                }
            });
    
            if (existingRappel) {
                res.status(400).send({ message: "Rappel for this maladie already exists for this user" });
            } else {
                await Rappel.create({
                    userID: userId,
                    maladie: maladie,
                    frequence: frequence,
                    heure: heure,
                });
    
                res.status(201).send({ message: "Rappel created successfully" });
            }
        } catch (error) {
            res.status(500).send({
                error: "An error occurred while creating the rappel",
            });
        }
    }

};

module.exports = RappelController;
