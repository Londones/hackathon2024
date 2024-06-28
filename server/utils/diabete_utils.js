function getGlucoseThresholds(age, weight, fasting) {
    let dangerousThreshold = 1.26;
    const extremelyDangerousThreshold = 2.40; 
  
    // Ajustement du seuil basé sur l'âge et le poids
    if (fasting) {
      if (age > 30) {
        dangerousThreshold += (age - 30) * 0.01;
      }
      if (weight > 70) {
        dangerousThreshold += (weight - 70) * 0.01;
      }
    } else {
      dangerousThreshold = 1.80; // 180 mg/dL non à jeun pour tous
    }
  
    return {
      dangerous: dangerousThreshold,
      extremelyDangerous: extremelyDangerousThreshold
    };
  }


  function generateHighGlucoseLevelWarningMessage(userInfos, glucoseValue){
    const thresholds = getGlucoseThresholds(userInfos.age, userInfos.weight, userInfos.aJeun);
    const dangerousThreshold = thresholds.dangerous;
    const extremelyDangerousThreshold = thresholds.extremelyDangerous;
    const lowGlucoseLevel = 0.7; 

    let warningMessage = "";


    if(glucoseValue < lowGlucoseLevel ) {
      console.log(`Avertissement : Votre taux de glycémie est trés bas ${ userInfos.aJeun ? 'à jeun' : 'non à jeun'}.`);
      warningMessage =  "Votre taux de glycémie est trés bas. Veuillez consulter un professionnel de santé."
    }

    if(glucoseValue > dangerousThreshold && glucoseValue < extremelyDangerousThreshold ) {
      console.log(`Avertissement : Votre taux de glycémie est élevé ${ userInfos.aJeun ? 'à jeun' : 'non à jeun'}.`);
      warningMessage =  "Votre taux de glycémie est élevé. Veuillez consulter un professionnel de santé."
    }

    if(glucoseValue >= extremelyDangerousThreshold) {
      console.log('Avertissement : Votre taux de glycémie est dangereusement élevé. Veuillez consulter un médecin immédiatement.');
      warningMessage = "Votre taux de glycémie est dangereusement élevé. Veuillez consulter un professionnel de santé." 
    } 

    return warningMessage;
  }


module.exports = {
    getGlucoseThresholds,
    generateHighGlucoseLevelWarningMessage
}