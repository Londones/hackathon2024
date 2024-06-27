const dotenv = require('dotenv');
dotenv.config();

const {sendMessageToUser} = require('../utils/sms_manager');
const {getGlucoseThresholds,generateHighGlucoseLevelWarningMessage} = require('../utils/diabete_utils');




function processIaResponse(iaResponse , userProfile , diseaseAndMesureFromMessage )
{
    switch (diseaseAndMesureFromMessage.maladie) {
        case 'Diabète':
        
            const userInfos = {
                age : userProfile.age, 
                weight : userProfile.weight,
                aJeun : diseaseAndMesureFromMessage.aJeun
            }
            const warningMessage = generateHighGlucoseLevelWarningMessage(userInfos , diseaseAndMesureFromMessage.valeur);

            sendMessageToUser(userProfile.phone, warningMessage + "\n" +iaResponse);

            
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