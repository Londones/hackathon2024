const dotenv = require('dotenv');
dotenv.config();

const {Message, Alert} = require('../models');

const {sendMessageToUser} = require('../utils/sms_manager');
const {getGlucoseThresholds,generateHighGlucoseLevelWarningMessage} = require('../utils/diabete_utils');




async function processIaResponse(iaResponse , userProfile , diseaseAndMesureFromMessage ) 
{
    switch (diseaseAndMesureFromMessage.maladie) {
        case 'Diabète':
        
            const userInfos = {
                age : userProfile.age, 
                weight : userProfile.weight,
                aJeun : diseaseAndMesureFromMessage.aJeun
            }
            const warningMessage = generateHighGlucoseLevelWarningMessage(userInfos , diseaseAndMesureFromMessage.valeur/100);

            const finalContent = iaResponse + "\n\n" + warningMessage;
            sendMessageToUser(userProfile.phone, );

            //create a new message and link it to the sender
            //console.log("send sms to user with id", userProfile);
            const newSMS = await Message.create({
                userID : userProfile.id ,
                content : finalContent,
                date : new Date(),
                messageType : warningMessage.length === 0 ? "info" : "warning"
            }); 


            //add a new alert entry 
            console.log("Check if user glucose is too high : " , warningMessage.length != 0 );
            if(warningMessage.length != 0)
                {
                    console.log("send sms to user with id", userProfile);
                    const newAlert = await Alert.create({
                        userID: userProfile.id,
                        date: new Date(),
                        message: warningMessage,
                        maladie: 'Diabete',
                    });
                }
            
            
            break;
        case 'Hypertension':
            sendMessageToUser("+33766837685", iaResponse);
            break;

        case 'Hypothyroïdie':
            sendMessageToUser("+33766837685", iaResponse); 
            break;

        case 'Interférence':
            sendMessageToUser("+33766837685", iaResponse); 
            break;

        case 'Fréquence':
            sendMessageToUser("+33766837685", iaResponse); 
            break;

        default:
            return 
    }
}



module.exports = {
    processIaResponse
}