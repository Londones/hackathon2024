const dotenv = require('dotenv');
dotenv.config();

const {Message, Alert, Diabete , Hypertension} = require('../models');

const {sendMessageToUser} = require('../utils/sms_manager');
const {generateHighGlucoseLevelWarningMessage} = require('../utils/diabete_utils');

const {evaluerTension} = require('../utils/tension_utils');




async function processIaResponse(iaResponse , userProfile , diseaseAndMesureFromMessage ) 
{   
    let finalContent = "";
    switch (diseaseAndMesureFromMessage.maladie) {
        case 'Diabète':
        
            const userInfos = {
                age : userProfile.age, 
                weight : userProfile.weight,
                aJeun : diseaseAndMesureFromMessage.aJeun
            }
            const warningMessage = generateHighGlucoseLevelWarningMessage(userInfos , diseaseAndMesureFromMessage.valeur/100);

            finalContent = iaResponse + "\n\n" + warningMessage;
            sendMessageToUser(userProfile.phone,finalContent );

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
            
            // add glucose mesure to db (check later if you overwrite it the existing one or simply add it)
            const newGlucoseEntry = await Diabete.create({
                userID: userProfile.id,
                date: new Date(),
                glycemie : diseaseAndMesureFromMessage.valeur,
                isAjeun : diseaseAndMesureFromMessage.aJeun
            });

            
            break;
        case 'Hypertension':
            //checker si la tension est inquétente 
            
            const tensionALertObject = evaluerTension(diseaseAndMesureFromMessage);

            const isTensionAlert = tensionALertObject.niveauAlerte != 0;
            finalContent = iaResponse + "\n" + isTensionAlert ? tensionALertObject.message : "";

            //enregistrer le message en base 
            const newTensionSMS = await Message.create({
                userID : userProfile.id ,
                content : finalContent,
                date : new Date(),
                messageType : isTensionAlert ? "info" : "warning"
            }); 
                
            
            // envoyer une alerte au cas ou 

            if( isTensionAlert)
                {
                    console.log("send sms to user with this id for tension request ", userProfile.id);
                    const newAlert = await Alert.create({
                        userID: userProfile.id,
                        date: new Date(),
                        message: tensionALertObject.message,
                        maladie: 'Hypertension',
                    });
                }

            
            // add glucose mesure to db (check later if you overwrite it the existing one or simply add it)
            const [systolic, diastolic] = diseaseAndMesureFromMessage.valeur.split('/').map(Number);
            const newTensionEntry = await Hypertension.create({
                userID: userProfile.id,
                date: new Date(),
                systolic : systolic,
                diastolic : diastolic
            });

            sendMessageToUser(userProfile.phone,finalContent );
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