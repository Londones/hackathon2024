const dotenv = require("dotenv");
const https = require("https");

dotenv.config();

const token = process.env.SMS_FACTOR_TOKEN;

// Refactored to send any message to any recipient
function sendMessage(recipient, messageText) {
    const postData = JSON.stringify({
        sms: {
            message: {
                text: messageText,
                sender: "",
            },
            recipients: {
                gsm: [{ value: recipient }],
            },
        },
    });

    const postOptions = {
        hostname: "api.smsfactor.com",
        port: 443,
        path: "/send",
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(postData),
        },
    };

    const req = https.request(postOptions, (res) => {
        console.log(`POST statusCode: ${res.statusCode}`);

        res.on("data", (d) => {
            process.stdout.write(d);
        });

        res.on("end", () => {
            console.log("\nMessage sent successfully!");
        });
    });

    req.on("error", (error) => {
        console.error(error);
    });

    req.write(postData);
    req.end();
}

function retrieveSMSMessages() {
    return new Promise((resolve, reject) => {
        const getOptions = {
            hostname: "api.smsfactor.com",
            port: 443,
            path: "/messages",
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + token,
            },
        };

        const req = https.request(getOptions, (res) => {
            let data = "";

            res.on("data", (chunk) => {
                data += chunk;
            });

            res.on("end", () => {
                const messages = JSON.parse(data);
                resolve(messages);
            });
        });

        req.on("error", (error) => {
            reject(error);
        });

        req.end();
    });
}

// Export the sendMessage function
module.exports = { sendMessage, retrieveSMSMessages };
