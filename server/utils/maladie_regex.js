const dotenv = require('dotenv');
dotenv.config();
const apiKey = process.env.MISTRAL_API_KEY;

function analyseRegex( texte) {
    // Normalisation du texte pour simplifier la reconnaissance avec regex
  texte = texte.toLowerCase();

  // Expressions régulières pour identifier les données médicales
    const regexGlycemieAjeun = /glyc[eé]mie\s+[aà]\s+jeun\s+(\d+)/i;
    const regexGlycemieApresRepas = /glyc[eé]mie\s+apr[eé]s\s+repas\s+(\d+)/i;
    const regexTension = /tension\s+(\d+)\s+(\d+)/i;
    const regexTSH = /tsh\s+([\d.]+)/i;
    const regexInterference = /interférence\s+([^]+)/i;

    // Tentative d'analyse avec regex
    if (regexGlycemieAjeun.test(texte)) {
        const match = texte.match(regexGlycemieAjeun);
        return { maladie: "Diabète", valeur: match[1], aJeun: true };
    } else if (regexGlycemieApresRepas.test(texte)) {
        const match = texte.match(regexGlycemieApresRepas);
        return { maladie: "Diabète", valeur: match[1], aJeun: false };
    } else if (regexTension.test(texte)) {
        const match = texte.match(regexTension);
        return { maladie: "Hypertension", valeur: `${match[1]}/${match[2]}` , aJeun: false };
    } else if (regexTSH.test(texte)) {
        const match = texte.match(regexTSH);
        return { maladie: "Hypothyroïdie", valeur: match[1] , aJeun: false };
    }
    else if (regexInterference.test(texte)) {
        const match = texte.match(regexInterference);
        const items = match[1].split(',').map(item => item.trim());  // Divise la chaîne capturée et supprime les espaces inutiles
        return { maladie: "Interférence", valeur: items, aJeun: false };
    }
  
}

async function analyseMedicale(texte) {

    texte = texte.toLowerCase();

    // Expressions régulières pour identifier les données médicales
    const regexGlycemieAjeun = /glyc[eé]mie\s+[aà]\s+jeun\s+(\d+)/i;
    const regexGlycemieApresRepas = /glyc[eé]mie\s+apr[eé]s\s+repas\s+(\d+)/i;
    const regexTension = /tension\s+(\d+)\s+(\d+)/i;
    const regexTSH = /tsh\s+([\d.]+)/i;
    const regexInterference = /interférence\s+([^]+)/i;
    const regexFrequence = /fréquence\s+([^\s]+)/i;


    // Tentative d'analyse avec regex
    if (regexGlycemieAjeun.test(texte)) {
        const match = texte.match(regexGlycemieAjeun);
        return { maladie: "Diabète", valeur: match[1], aJeun: true };
    } else if (regexGlycemieApresRepas.test(texte)) {
        const match = texte.match(regexGlycemieApresRepas);
        return { maladie: "Diabète", valeur: match[1], aJeun: false };
    } else if (regexTension.test(texte)) {
        const match = texte.match(regexTension);
        return { maladie: "Hypertension", valeur: `${match[1]}/${match[2]}` , aJeun: false };
    } else if (regexTSH.test(texte)) {
        const match = texte.match(regexTSH);
        return { maladie: "Hypothyroïdie", valeur: match[1] , aJeun: false };
    }
    else if (regexInterference.test(texte)) {
        const match = texte.match(regexInterference);
        const items = match[1].split(',').map(item => item.trim());  // Divise la chaîne capturée et supprime les espaces inutiles
        return { maladie: "Interférence", valeur: items, aJeun: false };
    }

    else if (regexFrequence.test(texte)) {
        const match = texte.match(regexFrequence);
        return { maladie: "Fréquence", valeur: match[1], aJeun: false };
    }

    // Si aucune regex ne correspond, appel à l'IA pour analyse
    const response = await appelerMistralAI(texte);
    return analyseRegex(response.reponseAI);
}

async function appelerMistralAI(texte) {
    // Importation du client MistralAI
    const MistralClient = await import('@mistralai/mistralai');
    const client = new MistralClient.default(apiKey );

    console.log("ai analysis for :", texte);

    const messagesInitial = [
        { role: 'system', content: `Tu vas analyser le texte suivant et tenter d'en déduire la catégorie qui correspond le plus parmis ces 5 là, le texte peut éventuellement contentir 
        quelques fautes d'orthographe :

        -Diabète, glycémie
        -Hypertension , tension 
        -Hypothyroïdie, thyroïde
        -Interférence nefaste entre médicaments ou entre médicaments et aliments
        -Fréquence de prise de médicaments sans ordonance

        Voici comment tu dois répondre :

        - Si tu détéctes la première catégorie j'ai envie que ta réponse soit le mot Glycémie suivi de "à jeun" ou "après repas" selon le cas suivi du taux de glycémie que tu auras détécté dans le message, exemple "Glycémie 150" et rien d'autre. Réponds "none" si il manque des informations.
        - Si tu détéctes la deuxième catégorie j'ai envie que ta réponse soit le mot Tension suivi des deux valeurs de systolic/diastolic que tu auras détécté dans le message, exemple "Tension 130/80" et rien d'autre. Réponds "0" si il manque des informations.
        - Si tu détéctes la troisième catégorie j'ai envie que ta réponse soit le mot TSH suivi du taux de TSH que tu auras détécté dans le message, exemple "TSH 3.5" et rien d'autre. Réponds "0" si il manque des informations.

        - Pour 'Interférence néfaste entre médicaments ou entre médicaments et aliments' : si détectée, réponds 'Interférence: liste des éléments en interaction' où tu énumères clairement les médicaments et/ou aliments concernés.
        - Pour 'Fréquence de prise de médicaments sans ordonnance' : si détectée, réponds 'Fréquence: nom du médicament', en précisant le nom du médicament discuté.


        Si tu n'arrives pas à comprendre le sens du message tu répondras avec le mot "none". Ne cherche pas à générer aucune autre réponse à part celles que j'ai mentionné.
        ` },
        { role: 'user', content: texte }
    ];

    const chatResponseInitial = await client.chat({
        model: 'mistral-large-latest',
        messages: messagesInitial,
    });

  // Tentative d'interprétation de la réponse de l'IA
    const reponseAI = chatResponseInitial.choices[0].message.content;;
    return { reponseAI: reponseAI, info: "Réponse IA" };
}

// Liste des phrases de test
const phrasesDeTest = [
    "Glycémie 130", // Cas regex
    "Tension 140 90", // Cas regex
    "TSH 3.5", // Cas regex
    "Glicemie a 110 ce matin", // Cas IA pour faute d'orthographe
    "Mon docteur dit que ma thyroïde est basse, quoi faire ?", // Cas IA pour contexte vague
    "Glycémie de cent vingt", // Cas IA pour numérotation en lettres
    "Hier ma glycémie était de 150, aussi j'ai eu un mal de tête.", // Cas regex avec distraction
    "Sensation bizarre, pression peut-être élevée ou faible.", // Cas IA pour ambiguïté
    "Tension arterielle haute à 130 pour 80, est-ce normal ?" // Cas IA pour terminologie incorrecte
  ];
  
  // Fonction pour tester chaque phrase
  async function testerPhrases() {
    for (const phrase of phrasesDeTest) {
      try {
        const resultat = await analyseMedicale(phrase);
        console.log(`Test pour la phrase: '${phrase}'\nRésultat:`, resultat, '\n');
      } catch (error) {
        console.error(`Erreur lors du traitement de la phrase: '${phrase}'\n`, error);
      }
    }
  }
  
  // ----------------------------------Exécuter les tests-------------------
  //testerPhrases();

module.exports = {
    analyseMedicale

}