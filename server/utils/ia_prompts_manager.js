
const apiKey = process.env.MISTRAL_API_KEY;

function genererPrompt(mesure, userProfile) {
    // Structure de base pour un utilisateur fictif (les valeurs doivent être adaptées selon le contexte réel)
    

    // Choix du message et du prompt basé sur le type de maladie
    switch (mesure.maladie) {
        case 'Diabète':
            const glucoseValue = parseFloat(mesure.valeur)/100; 

            const sexe = userProfile.sexe == "Male" ? "un homme" : "une femme"
            const glucoseMessage = `Ma glycémie est de ${glucoseValue.toFixed(2)} g/L et je suis ${mesure.aJeun ? 'à jeun' : 'pas à jeun'}.`;
            return [
                {role: 'system',content: 'les utilisateurs vont te poser des questions sur leurs taux de glycémie si elle est elevé ou pas. ou vont te donner directement des valeurs. il faudra leurs répondre sans trop parler (max 140 caractères). par des réponses simple et explicite sans desclaimer sur si leurs taux de glycémie est elevé ou pas.'},
                { role : 'user' , content: `Bonjour, je suis ${sexe} et j'ai ${userProfile.age} ans pour ${userProfile.weight} kg et ${userProfile.height} cm. Je voudrais savoir mon état de glucose ? ${glucoseMessage} et proposez-moi des solutions immédiates.`}
            ];
        case 'Hypertension':
            const bpMessage = `Ma tension artérielle est de ${mesure.valeur} mmHg.`;
            return [
                {role: 'system',content: 'Les utilisateurs vont te poser des questions sur leur tension artérielle, si elle est élevée ou non, ou vont te donner directement des valeurs. Il faudra leur répondre simplement et explicitement (max 140 caractères), sans disclaimers sur si leur tension est élevée ou non.'},
                { role : 'user' , content: `Bonjour, j'ai ${userProfile.age} ans pour ${userProfile.weight} kg et ${userProfile.height} cm. Je voudrais connaître mon état de tension artérielle ? ${bpMessage} et proposez-moi des solutions immédiates.`}
            ];
        case 'Hypothyroïdie':
            const tshMessage = `Mon taux de TSH est de ${mesure.valeur} mUI/L. Je ressens également de la fatigue, une perte de poids, et une augmentation du rythme cardiaque.`;
            return [
                {role: 'system',content: 'Les utilisateurs vont te poser des questions sur leur condition d\'hyperthyroïdie basées sur leur taux de TSH, symptômes, et autres facteurs de santé. Tu devras leur fournir des réponses précises et concises (max 140 caractères), en te basant sur les données fournies.'},
                {role : 'user' ,  content: `Bonjour, j'ai ${userProfile.age} ans et je pèse ${userProfile.weight} kg. ${tshMessage} Quelles pourraient être les implications de ces symptômes et ce niveau de TSH ?`}
            ];

        case 'Interférence':
            const interMessage = `Est-ce qu'il y'a des intéractions néfastes entre ces méddicaments ou aliments ${mesure.valeur}. Est-ce que peux les prendre en parallèle sans risque`;
            return [
                {role: 'system', content: 'Le patient peut poser des questions sur les interactions entre les médicaments et autres substances. Tu fourniras une réponse courte (max 140 caractères) et claire' },
                {role : 'user' ,  content: `Bonjour, j'ai ${userProfile.age} ans et je pèse ${userProfile.weight} kg. ${interMessage}`}
            ];
        case 'Fréquence':
            const freqMessage = `A quelle fréquence maximale je peux prendre cd médicament : ${mesure.valeur} `;
            return [
                {role: 'system', content: 'Le patient peut poser des questions sur la fréquence de prise de médicaments sans ordonnance. Réponds en un seul SMS de 140 caractères max.' },
                {role : 'user' ,  content: `Bonjour, j'ai ${userProfile.age} ans et je pèse ${userProfile.weight} kg. ${freqMessage}`}
            ];
        default:
            return { error: "Maladie non reconnue." };
    }
}

// ------------------------------Exemple d'utilisation---------------------------
// console.log(genererPrompt({ maladie: 'Diabète', valeur: '150' }));
// console.log(genererPrompt({ maladie: 'Hypertension', valeur: '120/80' }));
// console.log(genererPrompt({ maladie: 'Hypothyroïdie', valeur: '3.5' }));




async function generateIaResponse(messagesInitial){

    const MistralClient = await import('@mistralai/mistralai');
    const client = new MistralClient.default(apiKey);

    const chatResponseInitial = await client.chat({
        model: 'mistral-large-latest',
        messages: messagesInitial,
    });

    const responseContentInitial = chatResponseInitial.choices[0].message.content;


    return responseContentInitial;

}


module.exports = {
    genererPrompt,
    generateIaResponse
}