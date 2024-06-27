const { Alert } = require('../models');

const AlertController = {
    async getUserAlerts(req, res) {
        try {
            const { userId, diseaseName } = req.params;
            const alerts = await Alert.findAll({
                where: { userID: userId, maladie: diseaseName },
            });

            res.status(200).send(alerts);   
        } catch (error) {
            res.status(500).send({
                error: 'An error occurred while fetching the alert data',
            });
        }
    },
};

module.exports = AlertController;