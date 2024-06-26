const dotenv = require("dotenv");
const fs = require("fs");
const https = require("https");

dotenv.config();

const apiKey = process.env.MISTRAL_API_KEY;
const token = process.env.SMS_FACTOR_TOKEN;
const conversationFile = "conversation.txt";

async function getChatResponse() {
    const MistralClient = await import("@mistralai/mistralai");
    const client = new MistralClient.default(apiKey);

    // Récupérer les messages SMS
    const messages = await retrieveSMSMessages();

    // Récupérer le dernier message utilisateur avec le taux de glucose
    const lastMessage = messages.messages[messages.messages.length - 1];
    const glucoseValue = parseFloat(lastMessage.message);

    // Profil utilisateur pour l'analyse ponctuelle
    const profilUser = {
        age: 25,
        weight: 68,
        height: 168,
        health: "good",
        glucose: glucoseValue / 100,
        fasting: true,
    };

    const glucoseMessage = `Ma glycémie est de ${profilUser.glucose.toFixed(2)} g/L et je suis ${
        profilUser.fasting ? "à jeun" : "pas à jeun"
    }.`;

    const messagesInitial = [
        {
            role: "system",
            content:
                "les utilisateurs vont te poser des questions sur leurs taux de glycémie si elle est elevé ou pas. ou vont te donner directement des valeurs. il faudras leurs répondre sans trop parler. par des réponses simple et explicite sans desclaimer sur si leurs taux de glycémie est elevé ou pas.",
        },
        {
            role: "user",
            content: `Bonjour, j'ai ${profilUser.age} ans pour ${profilUser.weight} kg et ${profilUser.height} cm. Je voudrais savoir mon état de glucose ? ${glucoseMessage} et proposez-moi des solutions immédiates.`,
        },
    ];

    // Enregistrer le message utilisateur dans le fichier de conversation
    appendToConversation(`User: ${messagesInitial[1].content}\n`);

    const chatResponseInitial = await client.chat({
        model: "mistral-large-latest",
        messages: messagesInitial,
    });

    const responseContentInitial = chatResponseInitial.choices[0].message.content;

    console.log("Chat Initial:", responseContentInitial);

    // Enregistrer la réponse de l'IA dans le fichier de conversation
    appendToConversation(`IA: ${responseContentInitial}\n`);

    // Définir des seuils basés sur l'âge et le poids
    const thresholds = getGlucoseThresholds(profilUser.age, profilUser.weight, profilUser.fasting);
    const dangerousThreshold = thresholds.dangerous;
    const extremelyDangerousThreshold = thresholds.extremelyDangerous;

    if (profilUser.glucose > dangerousThreshold) {
        console.log(
            `Avertissement : Votre taux de glycémie est dangereusement élevé ${
                profilUser.fasting ? "à jeun" : "non à jeun"
            }.`
        );
        sendWarningMessage("+33651483976");
    }

    if (profilUser.glucose > extremelyDangerousThreshold) {
        console.log(
            "Avertissement : Votre taux de glycémie est extrêmement dangereux. Veuillez consulter un médecin immédiatement."
        );
        sendWarningMessage("+33651483976");
    }
}

function getGlucoseThresholds(age, weight, fasting) {
    let dangerousThreshold = 1.26;
    const extremelyDangerousThreshold = 2.4;

    // Ajustement du seuil basé sur l'âge et le poids
    if (fasting) {
        if (age > 30) {
            dangerousThreshold += (age - 30) * 0.01;
        }
        if (weight > 70) {
            dangerousThreshold += (weight - 70) * 0.01;
        }
    } else {
        dangerousThreshold = 1.8; // 180 mg/dL non à jeun pour tous
    }

    return {
        dangerous: dangerousThreshold,
        extremelyDangerous: extremelyDangerousThreshold,
    };
}

// Fonction pour envoyer un message d'avertissement
function sendWarningMessage(recipient) {
    const postData = JSON.stringify({
        sms: {
            message: {
                text: "Votre taux de glycémie est dangereusement élevé. Veuillez consulter un professionnel de santé.",
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
        path: "/send/simulate",
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

// Fonction pour ajouter du contenu à la conversation dans le fichier
function appendToConversation(content) {
    fs.appendFile(conversationFile, content, (err) => {
        if (err) {
            console.error("Erreur lors de l'écriture dans le fichier de conversation:", err);
        }
    });
}

// Fonction pour récupérer les messages SMS depuis SMS Factor
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

getChatResponse();
