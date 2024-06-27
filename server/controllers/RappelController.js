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
    }

};

module.exports = RappelController;
