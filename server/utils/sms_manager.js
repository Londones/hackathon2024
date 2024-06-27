const dotenv = require('dotenv');
const https = require('https');

dotenv.config();


function sendMessageToUser(recipient, content) {

    const postData = JSON.stringify({
      "sms": {
        "message": {
          "text": content,
          "sender": "",
        },
        "recipients": {
          "gsm": [
            { "value": recipient }
          ]
        }
      }
    });
  
    const postOptions = {
      hostname: 'api.smsfactor.com',
      port: 443,
      path: '/send/simulate', 
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + process.env.SMS_FACTOR_TOKEN ,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };
  
    const req = https.request(postOptions, (res) => {
      console.log(`POST statusCode: ${res.statusCode}`);
  
      res.on('data', (d) => {
        process.stdout.write(d);
      });
  
      res.on('end', () => {
        console.log("\nMessage sent successfully!");
      });
    });
  
    req.on('error', (error) => {
      console.error(error);
    });
  
    req.write(postData);
    req.end();
  }



  // Fonction pour récupérer les messages SMS depuis SMS Factor
function retrieveSMSMessages() {
    return new Promise((resolve, reject) => {
      const getOptions = {
        hostname: 'api.smsfactor.com',
        port: 443,
        path: '/messages',
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + process.env.SMS_FACTOR_TOKEN
        }
      };
  
      const req = https.request(getOptions, (res) => {
        let data = '';
  
        res.on('data', (chunk) => {
          data += chunk;
        });
  
        res.on('end', () => {
          const messages = JSON.parse(data);
          resolve(messages);
        });
      });
  
      req.on('error', (error) => {
        reject(error);
      });
  
      req.end();
    });
  }


module.exports = {
    retrieveSMSMessages,
    sendMessageToUser
}