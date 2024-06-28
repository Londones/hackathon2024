function evaluerTension(patientInfos) {
    // Extraction des valeurs systolique et diastolique de la tension
    const [systolique, diastolique] = patientInfos.valeur.split('/').map(Number);

    // Vérification des conditions de tension et retour d'un objet avec message et niveau d'alerte
    if (systolique >= 180 || diastolique >= 120) {
        return { message: 'Alerte ! Crise hypertensive. Consultation médicale immédiate nécessaire.', niveauAlerte: 5 };
    } else if (systolique >= 140 || diastolique >= 90) {
        return { message: 'Attention : Hypertension de stade 2. Consultez un médecin.', niveauAlerte: 4 };
    } else if (systolique >= 130 || diastolique >= 80) {
        return { message: 'Risque : Hypertension de stade 1. Surveillance nécessaire.', niveauAlerte: 3 };
    } else if (systolique < 90 || diastolique < 60) {
        return { message: 'Attention : Tension trop basse. Consultez un médecin.', niveauAlerte: 3 };
    } else if (systolique >= 120 && systolique < 130 && diastolique < 80) {
        return { message: 'Préhypertension détectée. Adoptez un mode de vie sain.', niveauAlerte: 2 };
    } else {
        // Si la tension est dans les valeurs normales
        return { message: 'Tension artérielle normale. Continuez vos habitudes saines.', niveauAlerte: 0 };
    }
}

// Exemple d'utilisation
const patient = {
    maladie: 'Hypertension',
    valeur: '140/80',
    aJeun: false
};

//console.log(evaluerTension(patient));


module.exports = {
    evaluerTension
    
}