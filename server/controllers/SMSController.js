const { retrieveSMSMessages } = require("../api/smsfactor");
const { patterns } = require("../models/patterns");
const { User } = require("../models");
const DiseaseController = require("./DiseaseController");

const SMSController = {
    async processSMSMessages() {
        try {
            const data = await retrieveSMSMessages();
            const messages = data.messages;
            if (data.totalRecords > 0) {
                for (const message of messages) {
                    let matched = false;
                    for (const pattern of patterns) {
                        const match = message.message.match(pattern.regex);
                        if (match) {
                            matched = true;
                            const phoneNumberWithPlus = "+" + message.sender;
                            console.log(phoneNumberWithPlus);
                            const user = await User.findOne({
                                where: { phone: phoneNumberWithPlus },
                            });
                            if (!user) {
                                console.log("User not found for phone number:", phoneNumberWithPlus);
                                continue;
                            }

                            const diseaseData = {
                                userID: user.id,
                                date: new Date(), // Today's date
                                confirmUpsert: true,
                            };

                            // Customize based on the pattern matched
                            if (pattern.name === "diabete") {
                                diseaseData.glycemie = parseFloat(match[1]);
                            } else if (pattern.name === "hypertension") {
                                diseaseData.systolic = parseInt(match[1], 10);
                                diseaseData.diastolic = parseInt(match[2], 10);
                            }

                            await DiseaseController.saveDisease({
                                params: { diseaseName: pattern.name },
                                body: diseaseData,
                            });
                            console.log("Data saved successfully for:", pattern.name);
                            break;
                        }
                    }
                    if (!matched) {
                        console.log("Message format not recognized:", message.message);
                    }
                }
            } else {
                console.log("No SMS messages to process.");
            }
        } catch (error) {
            console.error("Error processing SMS messages:", error);
        }
    },
};

module.exports = SMSController;
