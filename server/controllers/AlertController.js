const { Alert } = require('../models');
const { Op } = require('sequelize');
const moment = require("moment"); 

const AlertController = {
    async getUserAlerts(req, res) {
        try {
            const { userId, diseaseName } = req.params;
            let date;
    
            if (diseaseName.toLowerCase() === 'diabete') {
                date = moment().subtract(10, 'days').toDate();
            } else if (diseaseName.toLowerCase() === 'hypertension') {
                date = moment().subtract(6, 'months').toDate();
            }
    
            const alerts = await Alert.findAll({
                where: { 
                    userID: userId, 
                    maladie: diseaseName,
                    date: {
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