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
    }

};

module.exports = RappelController;
