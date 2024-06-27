const { retrieveSMSMessages } = require("../api/smsfactor");
const { patterns } = require("../models/patterns");
const { User, Message } = require("../models");
const DiseaseController = require("./DiseaseController");

const {analyseMedicale} = require('../utils/maladie_regex');
const {genererPrompt, generateIaResponse} = require('../utils/ia_prompts_manager');
const {processIaResponse} = require('../utils/ia_response_processor'); 
 
const SMSController = {
    async processSMSMessages() {
        try {
            const data = await retrieveSMSMessages();
            const messages = data.messages;
            if (data.totalRecords > 0) {
                for (const message of messages) {
                    console.log("SMS  : ", message.message);
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

    async processLastSMS() {
        try {
            const data = await retrieveSMSMessages();
            const lastMessage = data.messages[data.messages.length - 1];
            console.log("last message : ", lastMessage.message);
            
            const diseaseAndMesureFromMessage = await analyseMedicale(lastMessage.message);
            console.log("Medical analysis for message result : ", diseaseAndMesureFromMessage);

            const phoneNumbeWithPlus = "+"+lastMessage.destination;
            console.log("Message issued by : ", phoneNumbeWithPlus);
            const user = await User.findOne({
                where: { phone: phoneNumbeWithPlus },
            });

            console.log(" user issuing the message : ", user);

            const diseaseData = {
                userID: user.id,
                date: new Date(), // Today's date
                confirmUpsert: true,
            };
            //console.log("User in DB : ",user);

            //generate appropriate prompt (depending on the on the sms)
        
            const messagesInitial = genererPrompt(diseaseAndMesureFromMessage , user);
            console.log("message initial : ", messagesInitial);

            //generate IA reponse depending on prompt (system and user's)

            const iaResponse = await generateIaResponse(messagesInitial);
            console.log("IA RESPONSE : ", iaResponse);

            

            //process IA response 

            await processIaResponse(iaResponse , user , diseaseAndMesureFromMessage );


            // let matched = false;
            // for (const pattern of patterns) {
            //     const match = message.message.match(pattern.regex);
            //     if (match) {
            //         matched = true;
            //         const phoneNumberWithPlus = "+" + message.sender;
            //         console.log(phoneNumberWithPlus);
            //         const user = await User.findOne({
            //             where: { phone: phoneNumberWithPlus },
            //         });
            //         if (!user) {
            //             console.log("User not found for phone number:", phoneNumberWithPlus);
            //             continue;
            //         }

            //         const diseaseData = {
            //             userID: user.id,
            //             date: new Date(), // Today's date
            //             confirmUpsert: true,
            //         };

            //         // Customize based on the pattern matched
            //         if (pattern.name === "diabete") {
            //             diseaseData.glycemie = parseFloat(match[1]);
            //         } else if (pattern.name === "hypertension") {
            //             diseaseData.systolic = parseInt(match[1], 10);
            //             diseaseData.diastolic = parseInt(match[2], 10);
            //         }

            //         await DiseaseController.saveDisease({
            //             params: { diseaseName: pattern.name },
            //             body: diseaseData,
            //         });
            //         console.log("Data saved successfully for:", pattern.name);
            //         break;
            //     }
            // }
            // if (!matched) {
            //     console.log("Message format not recognized:", message.message);
            // }
                
            
        } catch (error) {
            console.error("Error processing SMS messages:", error);
        }
    },


    async addNewSMS() {
        try {


               
        } catch (error) {
            console.error("Error while adding new SMS:", error);
        }
    },
};

module.exports = SMSController;
