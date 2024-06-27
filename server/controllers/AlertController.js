const { Alert } = require('../models');
const { Op } = require('sequelize');

const AlertController = {
    async getUserAlerts(req, res) {
        try {
            const { userId, diseaseName } = req.params;
            const date = new Date();
            date.setDate(date.getDate() - 10);

            const alerts = await Alert.findAll({
                where: { 
                    userID: userId, 
                    maladie: diseaseName,
                    createdAt: {
                        [Op.gte]: date
                    }
                },
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